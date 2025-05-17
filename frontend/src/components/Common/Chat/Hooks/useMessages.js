import { useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const useMessages = ({ API_BASE_URL, currentUserId, selectedUser, allUsers, onFetchUsers }) => {
  const [messages, setMessages] = useState([]);
  const [recentMessages, setRecent] = useState(new Map());

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
      setMessages(res.data.map((m, i) => {
        const senderUser = allUsers.find(u => u._id === m.sender);
        return {
          id: i + 1,
          sender: m.sender,
          receiver: m.receiver,
          text: m.content,
          senderName: m.senderName || senderUser?.fullName || 'Unknown',
          senderImage: m.senderImage || senderUser?.image || null,
          side: m.sender === currentUserId ? "right" : "left",
          seen: m.seen,
          timestamp: m.timestamp,
        };
      }));
      setRecent(m => { const nm = new Map(m); nm.delete(selectedUser._id); return nm; });
      onFetchUsers();
    } catch (e) {
      console.error('fetchHistory error:', e);
      toast.error("Failed to load chat");
    }
  }, [API_BASE_URL, selectedUser, currentUserId, allUsers, onFetchUsers]);

  const detectMissingUsers = useCallback(() => {
    if (messages.length > 0 && currentUserId) {
      const messageUserIds = new Set([
        ...messages.map(m => m.sender),
        ...messages.map(m => m.receiver),
      ]);
      messageUserIds.add(currentUserId);
      const missingIds = Array.from(messageUserIds).filter(
        id => !allUsers.some(u => u._id === id)
      );
      if (missingIds.length > 0) {
        // console.log('useMessages: Missing users detected:', missingIds);
        // console.log('useMessages: Current allUsers=', allUsers.map(u => ({ _id: u._id, fullName: u.fullName, role: u.role })));
        onFetchUsers();
      }
    }
  }, [messages, currentUserId, allUsers, onFetchUsers]);

  const handleTemporaryUser = useCallback(() => {
    if (selectedUser?.isTemporary) {
      console.log('Showing temp user message:', selectedUser);
      setMessages([{
        id: "sys",
        sender: selectedUser.email,
        receiver: currentUserId,
        text: `Original message: ${selectedUser.originalMessage}`,
        side: "left",
        seen: false,
        timestamp: Date.now(),
        isSystem: true
      }]);
    }
  }, [selectedUser, currentUserId]);

  const handleSocketMessage = useCallback((data) => {
    const senderUser = allUsers.find(u => u._id === data.sender);
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      sender: data.sender,
      receiver: data.receiver,
      text: data.message,
      senderName: data.senderName || senderUser?.fullName || 'Unknown',
      senderImage: data.senderImage || senderUser?.image || null,
      side: data.sender === currentUserId ? "right" : "left",
      seen: data.sender === currentUserId,
      timestamp: data.timestamp,
    }]);
    setRecent(m => new Map(m).set(data.sender, data.timestamp));
    onFetchUsers();
  }, [currentUserId, allUsers, onFetchUsers]);

  return {
    messages,
    setMessages,
    recentMessages,
    fetchHistory,
    detectMissingUsers,
    handleTemporaryUser,
    handleSocketMessage,
  };
};