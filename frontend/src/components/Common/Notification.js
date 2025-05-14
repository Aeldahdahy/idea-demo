import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import { setSelectedUser, openChatPopup, selectTotalUnreadCount, updateUnreadCount } from "../../redux/chatSlice";
import { toast } from 'react-toastify';

const SOCKET_URL = "http://127.0.0.1:7030";

const Notification = ({ isAuthenticated, isFixed, isVisible, API_BASE_URL }) => {
  const dispatch = useDispatch();
  const socketRef = useRef(null);

  const auth = useSelector((state) => state.auth || {});
  const clientAuth = useSelector((state) => state.clientAuth || {});
  const totalUnread = useSelector(selectTotalUnreadCount);
  const unreadCounts = useSelector((state) => state.chat.unreadCounts || {});
  const users = useSelector((state) => state.chat.users || []);
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const isEmployee = !!auth.role;
  const isClient = !!clientAuth.clientData;
  const currentUserId = isClient && clientAuth.clientData?._id
    ? clientAuth.clientData._id
    : isEmployee && auth.user?._id
      ? auth.user._id
      : null;

  useEffect(() => {
    if (!isAuthenticated || !currentUserId) return;

    socketRef.current = io.connect(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current.on('connect', () => {
      console.log('Notification: Socket.IO connected');
      socketRef.current.emit('join_room', currentUserId);
    });

    socketRef.current.on('receive_message', (data) => {
      console.log('Notification: Received message', data);
      if (data.receiver === currentUserId) {
        const senderUser = users.find((u) => u._id === data.sender) || {};
        setNotifications((prev) => {
          const newNotification = {
            id: `socket-${Date.now()}`,
            user: {
              _id: data.sender,
              fullName: senderUser.fullName || data.senderName || 'Unknown',
              image: senderUser.image || data.senderImage || null,
              role: senderUser.role || data.senderRole || 'Admin',
            },
            title: senderUser.fullName || data.senderName || 'Unknown',
            message: data.message.length > 50 ? `${data.message.substring(0, 50)}...` : data.message,
            type: 'message',
            timestamp: data.timestamp,
            seen: false,
          };
          const updated = prev.filter((n) => n.user._id !== data.sender);
          return [newNotification, ...updated].sort((a, b) => b.timestamp - a.timestamp);
        });
        dispatch(updateUnreadCount({ userId: data.sender, count: (unreadCounts[data.sender] || 0) + 1 }));
      }
    });

    socketRef.current.on('connect_error', (err) => {
      console.error('Notification: Socket.IO connect_error:', err.message);
      toast.error('Failed to connect to chat server');
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [isAuthenticated, currentUserId, dispatch, unreadCounts, users]);

  const fetchRecentMessages = useCallback(async () => {
    if (!currentUserId || !API_BASE_URL) {
      console.log('fetchRecentMessages: Skipping, no currentUserId or API_BASE_URL');
      return;
    }
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.log('fetchRecentMessages: No auth token');
        return;
      }
      const response = await axios.get(
        `${API_BASE_URL}/api/chats/recent/${currentUserId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success && Array.isArray(response.data.data)) {
        const newNotifications = response.data.data.map((msg) => ({
          id: msg._id,
          user: {
            _id: msg.sender._id,
            fullName: msg.sender.fullName,
            image: msg.sender.image,
            role: msg.sender.role,
          },
          title: msg.sender.fullName,
          message: msg.content.length > 50 ? `${msg.content.substring(0, 50)}...` : msg.content,
          type: 'message',
          timestamp: msg.timestamp,
          seen: msg.seen,
        }));
        setNotifications(newNotifications.sort((a, b) => b.timestamp - a.timestamp));
      } else {
        console.warn('fetchRecentMessages: Invalid response data');
      }
    } catch (error) {
      console.error('fetchRecentMessages error:', error);
      toast.error('Failed to load recent messages');
    }
  }, [currentUserId, API_BASE_URL]);

  useEffect(() => {
    if (isAuthenticated && currentUserId) {
      fetchRecentMessages();
    }
  }, [isAuthenticated, currentUserId, fetchRecentMessages]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      setOpenUpward(spaceBelow < viewportHeight / 2);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    if (isAuthenticated) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAuthenticated]);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  const openChat = useCallback((user) => {
    dispatch(setSelectedUser(user));
    dispatch(openChatPopup());
    setIsOpen(false);
  }, [dispatch]);

  const memoizedNotifications = useMemo(() => {
    return notifications.map((notification) => ({
      ...notification,
      onClick: () => openChat(notification.user),
    }));
  }, [notifications, openChat]);

  if (!isAuthenticated || !currentUserId) {
    return null;
  }

  return (
    <div
      className={`relative inline-block ${isFixed ? 'fixed top-0 right-0' : ''} ${!isVisible ? 'hidden' : ''} notificationResponsiveView`}
    >
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {totalUnread > 0 && (
          <span className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full" />
        )}
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
          {memoizedNotifications.length === 0 ? (
            <div className="p-4 text-sm text-gray-500">No new notifications</div>
          ) : (
            memoizedNotifications.map((notification) => (
              <Link
                key={notification.id}
                to="#"
                className="block p-4 hover:bg-gray-50 transition-colors"
                onClick={notification.onClick}
              >
                <div className="flex items-start">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className="text-sm font-medium text-gray-800">{notification.title}</h4>
                      {notification.type === 'message' && !notification.seen && (
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