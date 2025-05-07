import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useFunctions } from "../../../useFunctions";
import Chat from './Chat';
import { fetchUsers } from '../../../redux/chatSlice';

const SOCKET_URL = process.env.NODE_ENV === 'production'
  ? window.location.origin // e.g., https://idea-venture.agency
  : 'http://127.0.0.1:7030';
  
  
  const socket = io.connect(SOCKET_URL, {
    transports: ['websocket', 'polling'], // Prioritize WebSocket, fallback to polling
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

function ChatInterface() {
  const { API_BASE_URL } = useFunctions();
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.clientAuth?.clientData?._id);
  const { users, loading, error, lastFetched } = useSelector((state) => state.chat);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [recentMessages, setRecentMessages] = useState(new Map());
  const audioRef = useRef(null);

  // Initialize audio
  useEffect(() => {
    if (!API_BASE_URL) {
      console.warn("API_BASE_URL is not defined, skipping audio initialization");
      return;
    }

    try {
      audioRef.current = new Audio(`${API_BASE_URL}/sounds/notification.mp3`);
      if (audioRef.current && typeof audioRef.current.load === 'function') {
        audioRef.current.load().catch(err => console.error("Audio preload failed:", err));
      } else {
        console.warn("Audio object or load method is not available");
      }
    } catch (err) {
      console.error("Failed to initialize audio:", err);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [API_BASE_URL]);

  const getAllUsers = useCallback(() => {
    if (!currentUserId) return;

    const THIRTY_MINUTES = 30 * 60 * 1000;
    const now = Date.now();

    if (lastFetched && now - lastFetched < THIRTY_MINUTES) {
      return;
    }

    dispatch(fetchUsers({ API_BASE_URL }))
      .unwrap()
      .catch((err) => toast.error(err));
  }, [currentUserId, lastFetched, dispatch, API_BASE_URL]);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    if (!currentUserId) return;
  
    socket.emit("join_room", currentUserId);
  
    const handleNewMessage = (data) => {
      if (data.sender !== currentUserId && data.playSound && audioRef.current) {
        audioRef.current.play().catch(err => console.log("Audio play failed:", err));
      }
  
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          sender: data.sender,
          receiver: data.receiver,
          text: data.message,
          side: data.sender === currentUserId ? "right" : "left",
          seen: data.sender === currentUserId,
          timestamp: data.timestamp,
        },
      ]);
  
      if (data.receiver === currentUserId) {
        setRecentMessages((prev) => {
          const newMap = new Map(prev);
          newMap.set(data.sender, data.timestamp);
          return newMap;
        });
        getAllUsers();
      }
    };
  
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
      toast.success("Chat server connected");
    });
  
    socket.on("receive_message", handleNewMessage);
  
    socket.on("connect_error", (error) => {
      console.error("Socket.IO connection error:", error);
      toast.error("Failed to connect to chat server. Retrying...");
    });
  
    socket.on("reconnect", (attempt) => {
      console.log(`Reconnected to Socket.IO server after ${attempt} attempts`);
      toast.success("Chat server reconnected");
    });
  
    socket.on("reconnect_error", (error) => {
      console.error("Socket.IO reconnect error:", error);
      toast.error("Failed to reconnect to chat server");
    });
  
    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
      toast.warn("Disconnected from chat server");
    });
  
    return () => {
      socket.off("connect");
      socket.off("receive_message", handleNewMessage);
      socket.off("connect_error");
      socket.off("reconnect");
      socket.off("reconnect_error");
      socket.off("disconnect");
    };
  }, [currentUserId, getAllUsers]);

  const fetchMessages = useCallback(async () => {
    if (!selectedUser || !currentUserId) return;

    try {
      const token = localStorage.getItem('authToken');
      
      await axios.put(
        `${API_BASE_URL}/api/chats/mark-seen/${currentUserId}/${selectedUser._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const response = await axios.get(
        `${API_BASE_URL}/api/chats/${currentUserId}/${selectedUser._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setMessages(
        response.data.map((msg, index) => ({
          id: index + 1,
          sender: msg.sender,
          receiver: msg.receiver,
          text: msg.content,
          side: msg.sender === currentUserId ? "right" : "left",
          seen: msg.seen,
          timestamp: msg.timestamp,
        }))
      );
      
      setRecentMessages(prev => {
        const newMap = new Map(prev);
        newMap.delete(selectedUser._id);
        return newMap;
      });
      
      getAllUsers();
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to fetch messages");
    }
  }, [API_BASE_URL, selectedUser, currentUserId, getAllUsers]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const sendChat = () => {
    if (inputMessage.trim() && selectedUser && currentUserId) {
      const now = Date.now();
      socket.emit("send_message", {
        sender: currentUserId,
        receiver: selectedUser._id,
        message: inputMessage,
        timestamp: now,
      });
      setRecentMessages((prev) => {
        const newMap = new Map(prev);
        newMap.set(selectedUser._id, now);
        return newMap;
      });
      setInputMessage("");
      getAllUsers();
    }
  };

  const handleClose = () => setIsOpen(false);

  return (
    <Chat
      currentUserId={currentUserId}
      isOpen={isOpen}
      users={users}
      loading={loading}
      error={error}
      selectedUser={selectedUser}
      setSelectedUser={setSelectedUser}
      messages={messages}
      inputMessage={inputMessage}
      setInputMessage={setInputMessage}
      sendChat={sendChat}
      handleClose={handleClose}
      recentMessages={recentMessages}
      API_BASE_URL={API_BASE_URL}
    />
  );
}

export default ChatInterface;