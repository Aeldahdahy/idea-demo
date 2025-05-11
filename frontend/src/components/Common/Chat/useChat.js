import { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchUsers, closeChatPopup } from "../../../redux/chatSlice";

const SOCKET_URL = "https://idea-venture.agency";

export const useChat = ({ API_BASE_URL, updateMessages, currentUserId, currentUserData, currentUserRole }) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [recentMessages, setRecent] = useState(new Map());
  const [connectionError, setConnectionError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const audioRef = useRef(null);
  let socket = null;

  // Initialize Socket.IO connection
  const initializeSocket = useCallback(() => {
    if (socket) {
      socket.disconnect();
    }
    socket = io.connect(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on('connect', () => {
      console.log('Socket.IO connected');
      setConnectionError(null);
    });

    socket.on('connect_error', (err) => {
      console.error('Socket.IO connect_error:', err.message);
      setConnectionError('Failed to connect to the chat server. Please try again later.');
    });

    socket.on('reconnect_failed', () => {
      console.error('Socket.IO reconnect_failed');
      setConnectionError('Unable to reconnect to the chat server. Please try again.');
    });

    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('reconnect_failed');
    };
  }, []);

  // Attempt to reconnect
  const handleReconnect = () => {
    console.log('Attempting to reconnect...');
    initializeSocket();
  };

  // Fetch available users
  const { lastFetched } = useSelector(s => s.chat); // Access lastFetched from Redux

  const getAllUsers = useCallback(() => {
    if (!currentUserId) {
      console.log('getAllUsers: Skipping, no currentUserId');
      return;
    }
    if (lastFetched && Date.now() - lastFetched < 30 * 60e3) {
      console.log('getAllUsers: Skipping, recently fetched');
      return;
    }
    console.log('getAllUsers: Dispatching fetchUsers');
    dispatch(fetchUsers({ API_BASE_URL })).unwrap().catch(err => {
      console.error('fetchUsers error:', err);
      toast.error(err);
    });
  }, [currentUserId, dispatch, API_BASE_URL, lastFetched]);

  // Initialize socket on mount
  useEffect(() => {
    initializeSocket();
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [initializeSocket]);

  // Notification sound
  useEffect(() => {
    if (!API_BASE_URL) {
      console.log('Notification sound: Skipping, no API_BASE_URL');
      return;
    }
    audioRef.current = new Audio(`${API_BASE_URL}/sounds/notification.mp3`);
    if (audioRef.current && typeof audioRef.current.load === 'function') {
      console.log('Notification sound: Loading audio');
      audioRef.current.load();
    } else {
      console.warn('Notification sound: Audio load not supported');
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [API_BASE_URL]);

  // Subscribe to sockets
  useEffect(() => {
    if (!currentUserId || !socket) {
      console.log('Socket: Skipping, no currentUserId or socket');
      return;
    }
    console.log('Socket: Joining room', currentUserId);
    socket.emit("join_room", currentUserId);
    const handler = (data) => {
      console.log('Socket: Received message', data);
      if (data.sender !== currentUserId && data.playSound) {
        if (audioRef.current && typeof audioRef.current.play === 'function') {
          audioRef.current.play().catch(err => console.error('Audio play error:', err));
        } else {
          console.warn('Socket: Audio play not supported');
        }
      }
      if (data.receiver === currentUserId) {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          sender: data.sender,
          receiver: data.receiver,
          text: data.message,
          senderName: data.senderName,
          senderImage: data.senderImage,
          side: data.sender === currentUserId ? "right" : "left",
          seen: data.sender === currentUserId,
          timestamp: data.timestamp,
        }]);
        setRecent(m => new Map(m).set(data.sender, data.timestamp));
        getAllUsers();
      }
    };
    socket.on("receive_message", handler);
    return () => socket.off("receive_message", handler);
  }, [currentUserId, getAllUsers]);

  // Fetch history (skip temp)
  const users = useSelector(s => s.chat.users); // Move useSelector outside the callback

  const fetchHistory = useCallback(async () => {
    if (!selectedUser || !currentUserId || selectedUser.isTemporary) {
      console.log('fetchHistory: Skipping', { selectedUser, currentUserId });
      return;
    }
    try {
      console.log('fetchHistory: Fetching for', selectedUser._id);
      const token = localStorage.getItem("authToken");
      await axios.put(
        `${API_BASE_URL}/api/chats/mark-seen/${currentUserId}/${selectedUser._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const res = await axios.get(
        `${API_BASE_URL}/api/chats/${currentUserId}/${selectedUser._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(res.data.map((m, i) => ({
        id: i + 1,
        sender: m.sender,
        receiver: m.receiver,
        text: m.content,
        senderName: m.senderName || (users.find(u => u._id === m.sender)?.fullName || 'Idea-Venture'),
        senderImage: m.senderImage || (users.find(u => u._id === m.sender)?.image || null),
        side: m.sender === currentUserId ? "right" : "left",
        seen: m.seen,
        timestamp: m.timestamp,
      })));
      setRecent(m => { const nm = new Map(m); nm.delete(selectedUser._id); return nm; });
      getAllUsers();
    } catch (e) {
      console.error('fetchHistory error:', e);
      toast.error("Failed to load chat");
    }
  }, [API_BASE_URL, selectedUser, currentUserId, getAllUsers, users]);

  // Send (socket or email)
  const sendChat = async () => {
    if (!inputMessage.trim() || !selectedUser || !currentUserId) {
      console.log('sendChat: Invalid input', { inputMessage, selectedUser, currentUserId });
      return;
    }
    if (connectionError) {
      toast.error("Cannot send message: No connection to the chat server");
      return;
    }
    const now = Date.now();

    if (selectedUser.isTemporary) {
      try {
        console.log('sendChat: Sending email to', selectedUser.email);
        const token = localStorage.getItem("authToken");
        const res = await axios.post(
          `${API_BASE_URL}/api/send-email`,
          {
            email: selectedUser.email,
            message: selectedUser.originalMessage,
            reply: inputMessage,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) {
          toast.success("Reply sent via email");
          if (selectedUser.messageId) {
            updateMessages(selectedUser.messageId, "Replied");
          }
        } else {
          toast.error(res.data.message || "Failed to send email");
        }
      } catch (e) {
        console.error('sendEmail error:', e);
        toast.error("Email send failed");
      }
      dispatch(closeChatPopup());
      return;
    }

    console.log('sendChat: Sending socket message to', selectedUser._id);
    const messageData = {
      sender: currentUserId,
      receiver: selectedUser._id,
      message: inputMessage,
      timestamp: now,
      senderName: currentUserData.fullName,
      senderImage: currentUserData.image,
      senderRole: currentUserRole,
    };
    socket.emit("send_message", messageData);

    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `${API_BASE_URL}/api/chats`,
        {
          sender: currentUserId,
          receiver: selectedUser._id,
          message: inputMessage,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(prev => [...prev, {
        id: `local-${now}`,
        sender: currentUserId,
        receiver: selectedUser._id,
        text: inputMessage,
        senderName: currentUserData.fullName,
        senderImage: currentUserData.image,
        side: "right",
        seen: true,
        timestamp: now
      }]);
    } catch (e) {
      console.error("Persist chat error:", e);
    }

    setInputMessage("");
    getAllUsers();
  };

  return {
    messages,
    setMessages,
    inputMessage,
    setInputMessage,
    recentMessages,
    connectionError,
    selectedUser,
    setSelectedUser,
    handleReconnect,
    getAllUsers,
    fetchHistory,
    sendChat,
  };
};