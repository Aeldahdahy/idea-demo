import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import { setSelectedUser, openChatPopup, selectTotalUnreadCount, updateUnreadCount } from '../../redux/chatSlice';
import { toast } from 'react-toastify';
import { useFunctions } from '../../useFunctions';

const SOCKET_URL = 'http://127.0.0.1:7030';

const Notification = ({ isAuthenticated, isFixed, isVisible }) => {
  const dispatch = useDispatch();
  const socketRef = useRef(null);
  const { API_BASE_URL } = useFunctions();

  const auth = useSelector((state) => state.auth || {});
  const clientAuth = useSelector((state) => state.clientAuth || {});
  const totalUnread = useSelector(selectTotalUnreadCount);
  const unreadCounts = useSelector((state) => state.chat.unreadCounts || {});
  const users = useSelector((state) => state.chat.users || []);
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);

  const isEmployee = !!auth.role;
  const isClient = !!clientAuth.clientData;
  const currentUserId = isClient && clientAuth.clientData?._id
    ? clientAuth.clientData._id
    : isEmployee && auth.user?._id
      ? auth.user._id
      : null;

  const fetchNotifications = useCallback(async (page = 1) => {
    if (!currentUserId || !API_BASE_URL) return;

    const token = localStorage.getItem('authToken');
    if (!token) {
      console.warn('No auth token found');
      toast.error('Please log in to view notifications');
      setError('Authentication required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/api/get-notifications`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page }, // Removed limit to fetch all
      });

      console.log('Notifications response:', response.data); // Debug raw response

      if (response.data.success) {
        const backendNotifications = response.data.notifications.map((n) => ({
          id: n._id,
          title: n.title || 'Untitled', // Fallback for missing title
          message: n.body?.length > 50 ? `${n.body.substring(0, 50)}...` : n.body || 'No message',
          type: n.sourceType || 'other',
          timestamp: new Date(n.createdAt) || new Date(),
          seen: n.isRead || false,
          user: {
            _id: n.metadata?.senderId || 'system',
            fullName: n.title || 'System',
          },
        }));

        setNotifications((prev) => {
          const existingIds = new Set(backendNotifications.map((n) => n.id));
          const uniqueSocketNotifications = prev.filter((n) => !existingIds.has(n.id));
          const updatedNotifications = [...backendNotifications, ...uniqueSocketNotifications].sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          );
          console.log('Updated notifications state:', updatedNotifications); // Debug state
          return updatedNotifications;
        });

        // Fetch additional pages if more notifications exist
        if (response.data.total > response.data.notifications.length * page) {
          fetchNotifications(page + 1);
        }
      } else {
        setError(response.data.message || 'Failed to fetch notifications');
        toast.error(response.data.message || 'Failed to fetch notifications');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || 'Server error';
      setError(errorMessage);
      toast.error(`Failed to fetch notifications: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE_URL, currentUserId, isClient]);

  useEffect(() => {
    if (!isAuthenticated || !currentUserId) return;

    socketRef.current = io.connect(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      auth: { userId: currentUserId },
    });

    socketRef.current.on('connect', () => {
      console.log('Socket connected:', socketRef.current.id);
      socketRef.current.emit('join_room', currentUserId);
      reconnectAttemptsRef.current = 0;
      toast.dismiss('socket-error');
    });

    socketRef.current.on('receive_message', (data) => {
      if (data.receiver === currentUserId) {
        const senderUser = users.find((u) => u._id === data.sender) || {};
        const newNotification = {
          id: data.notificationId,
          user: {
            _id: data.sender,
            fullName: senderUser.fullName || data.senderName || 'Unknown',
            image: senderUser.image || data.senderImage || null,
            role: senderUser.role || data.senderRole || 'Admin',
          },
          title: senderUser.fullName || data.senderName || 'Unknown',
          message: data.message?.length > 50 ? `${data.message.substring(0, 50)}...` : data.message || 'No message',
          type: 'message',
          timestamp: data.timestamp || new Date(),
          seen: false,
        };
        setNotifications((prev) => {
          const filteredPrev = prev.filter((n) => n.id !== newNotification.id);
          const updatedNotifications = [newNotification, ...filteredPrev].sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          );
          console.log('Updated notifications with socket:', updatedNotifications);
          return updatedNotifications;
        });
        dispatch(updateUnreadCount({ userId: data.sender, count: (unreadCounts[data.sender] || 0) + 1 }));
        fetchNotifications(); // Sync with backend
      }
    });

    socketRef.current.on('disconnect', (reason) => {
      console.warn('Socket disconnected:', reason);
      toast.warn('Real-time notifications disconnected. Attempting to reconnect...', {
        toastId: 'socket-error',
        autoClose: false,
      });
    });

    socketRef.current.on('reconnect', (attempt) => {
      console.log(`Reconnected after ${attempt} attempts`);
      toast.success('Real-time notifications reconnected!');
      toast.dismiss('socket-error');
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
      toast.error('Failed to connect to real-time notifications: ' + error.message, {
        toastId: 'socket-error',
        autoClose: false,
      });
    });

    return () => {
      console.log('Cleaning up socket connection');
      socketRef.current?.disconnect();
    };
  }, [isAuthenticated, currentUserId, dispatch, unreadCounts, users, fetchNotifications]);

  useEffect(() => {
    if (isAuthenticated && currentUserId) {
      fetchNotifications();
    }
  }, [isAuthenticated, currentUserId, fetchNotifications]);

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        toast.error('Please log in to mark notifications as read');
        return;
      }
      await axios.put(`${API_BASE_URL}/api/notifications/mark-read/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, seen: true } : n))
      );
    } catch (error) {
      console.error('Error marking notification as read:', error.response?.data || error.message);
      toast.error('Failed to mark notification as read');
    }
  };

  const openChat = useCallback((notification) => {
    dispatch(setSelectedUser(notification.user));
    dispatch(openChatPopup());
    markAsRead(notification.id);
    setIsOpen(false);
  }, [dispatch]);

  const memoizedNotifications = useMemo(() => {
    return notifications.map((notification) => ({
      ...notification,
      onClick: () => openChat(notification),
    }));
  }, [notifications, openChat]);

  if (!isAuthenticated || !currentUserId) return null;

  return (
    <div className={`relative inline-block ${isFixed ? 'fixed top-0 right-0' : ''} ${!isVisible ? 'hidden' : ''} notificationResponsiveView`}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
        </svg>
        {totalUnread > 0 && <span className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full" />}
      </button>
      <div
        ref={dropdownRef}
        className={`absolute right-0 w-80 bg-white rounded-lg shadow-xl z-[9999] max-h-96 overflow-y-auto transition-all duration-200 ${
          isOpen ? 'block' : 'hidden'
        } ${openUpward ? 'bottom-full mb-2' : 'top-full mt-2'}`}
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {isLoading ? (
            <div className="p-4 text-sm text-gray-500">Loading notifications...</div>
          ) : error ? (
            <div className="p-4 text-sm text-red-500">{error}</div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-sm text-gray-500">No notifications available</div>
          ) : (
            notifications.map((notification) => (
              <Link
                key={notification.id}
                to="#"
                className={`block p-4 hover:bg-gray-50 transition-colors ${!notification.seen ? 'bg-gray-100' : ''}`}
                onClick={notification.onClick}
              >
                <div className="flex items-start">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className={`text-sm font-medium ${!notification.seen ? 'text-black' : 'text-gray-800'}`}>
                        {notification.title}
                      </h4>
                      {!notification.seen && (
                        <span className="ml-2 h-2 w-2 bg-blue-500 rounded-full" />
                      )}
                    </div>
                    <p className="mt-1 text-xs text-gray-500">{notification.message}</p>
                    <p className="mt-1 text-xs text-gray-400">
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;