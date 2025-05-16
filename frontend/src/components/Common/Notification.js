import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isEmployee = !!auth.role;
  const isClient = !!clientAuth.clientData;
  const currentUserId = isClient && clientAuth.clientData?._id
    ? clientAuth.clientData._id
    : isEmployee && auth.user?._id
      ? auth.user._id
      : null;

  const fetchNotifications = useCallback(async (page = 1, accumulated = []) => {
    if (!currentUserId || !API_BASE_URL) return;

    const token = localStorage.getItem('authToken');
    if (!token) {
      console.warn('No auth token found');
      // toast.error('Please log in to view notifications');
      setError('Authentication required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/api/get-notifications`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page },
      });

      console.log('Notifications response:', response.data);

      if (response.data.success) {
        const backendNotifications = response.data.notifications.map((n) => ({
          id: n._id || `temp-${Math.random()}`, // Fallback ID
          title: n.title || 'Untitled',
          message: n.body || 'No message',
          type: n.sourceType || 'other',
          timestamp: new Date(n.createdAt || Date.now()),
          seen: n.isRead || false,
          user: {
            _id: n.metadata?.senderId || 'system',
            fullName: n.title || 'System',
          },
        }));

        const allNotifications = [...accumulated, ...backendNotifications];
        setNotifications((prev) => {
          const existingIds = new Set(allNotifications.map((n) => n.id));
          const uniqueSocketNotifications = prev.filter((n) => !existingIds.has(n.id));
          const updated = [...allNotifications, ...uniqueSocketNotifications].sort(
            (a, b) => b.timestamp - a.timestamp
          );
          console.log('Notifications state:', updated);
          return updated;
        });

        // Fetch next page if more exist
        if (response.data.total > allNotifications.length) {
          fetchNotifications(page + 1, allNotifications);
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
  }, [API_BASE_URL, currentUserId]);

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
      toast.dismiss('socket-error');
    });

    socketRef.current.on('receive_message', (data) => {
      if (data.receiver === currentUserId) {
        const newNotification = {
          id: data.notificationId || `temp-${Math.random()}`,
          title: data.senderName || 'Unknown',
          message: data.message || 'No message',
          type: 'message',
          timestamp: new Date(data.timestamp || Date.now()),
          seen: false,
          user: {
            _id: data.sender || 'system',
            fullName: data.senderName || 'Unknown',
          },
        };
        setNotifications((prev) => {
          const updated = [newNotification, ...prev.filter((n) => n.id !== newNotification.id)];
          console.log('Socket notifications:', updated);
          return updated;
        });
        dispatch(updateUnreadCount({ userId: data.sender, count: (unreadCounts[data.sender] || 0) + 1 }));
        fetchNotifications(); // Sync with backend
      }
    });

    socketRef.current.on('disconnect', (reason) => {
      console.warn('Socket disconnected:', reason);
      // toast.warn('Real-time notifications disconnected...', { toastId: 'socket-error' });
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
      // toast.error('Failed to connect to real-time notifications', { toastId: 'socket-error' });
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [isAuthenticated, currentUserId, dispatch, unreadCounts, fetchNotifications]);

  useEffect(() => {
    if (isAuthenticated && currentUserId) {
      console.log('Fetching notifications for user:', currentUserId);
      fetchNotifications();
    }
  }, [isAuthenticated, currentUserId, fetchNotifications]);

  const markAsRead = useCallback(async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      // if (!token) return toast.error('Please log in to mark notifications as read');
      await axios.put(`${API_BASE_URL}/api/notifications/mark-read/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, seen: true } : n)));
    } catch (error) {
      console.error('Error marking notification as read:', error.response?.data || error.message);
      // toast.error('Failed to mark notification as read');
    }
  }, [API_BASE_URL]);

  const openChat = useCallback((notification) => {
    dispatch(setSelectedUser(notification.user));
    dispatch(openChatPopup());
    markAsRead(notification.id);
    setIsOpen(false);
  }, [dispatch, markAsRead]);

  if (!isAuthenticated || !currentUserId) return null;

  return (
    <div className={`relative inline-block ${isFixed ? 'fixed top-0 right-0' : ''} ${!isVisible ? 'hidden' : ''} z-50`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
        </svg>
        {totalUnread > 0 && <span className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full" />}
      </button>
      <div
        className={`absolute right-0 w-80 bg-white rounded-lg shadow-xl max-h-96 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}
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
                className={`block p-4 hover:bg-gray-50 ${!notification.seen ? 'bg-gray-100' : ''}`}
                onClick={() => openChat(notification)}
              >
                <div className="flex items-start">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className={`text-sm font-medium ${!notification.seen ? 'text-black' : 'text-gray-800'}`}>
                        {notification.title}
                      </h4>
                      {!notification.seen && <span className="ml-2 h-2 w-2 bg-blue-500 rounded-full" />}
                    </div>
                    <p className="mt-1 text-xs text-gray-500">{notification.message}</p>
                    <p className="mt-1 text-xs text-gray-400">
                      {notification.timestamp.toLocaleTimeString()}
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