import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import axios from "axios";
import { toast } from "react-toastify";
import { useFunctions } from "../../../useFunctions";
import Chat from "./Chat";
import {
  fetchUsers,
  closeChatPopup,
  selectIsChatPopupOpen,
  selectSelectedUser,
} from "../../../redux/chatSlice";

const socket = io.connect("http://127.0.0.1:7030", {
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionAttempts: 5,
});

function ChatInterface() {
  const { API_BASE_URL, updateMessages } = useFunctions();
  const dispatch = useDispatch();

  // Auth
  const { role: empRole, user } = useSelector(s => s.auth || {});
  const { clientData } = useSelector(s => s.clientAuth || {});
  const isEmployee = empRole && ["Admin", "employee", "CS"].includes(empRole);
  const isClient = !!clientData;
  const currentUserId = isClient ? clientData._id : isEmployee ? user?._id : null;
  const userRole = isEmployee ? empRole : isClient ? clientData.role : null;

  // Redux chat state
  const { users: allUsers, loading, error, lastFetched } = useSelector(s => s.chat);
  const isOpen = useSelector(selectIsChatPopupOpen);
  const reduxUser = useSelector(selectSelectedUser);

  // Local
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [recentMessages, setRecent] = useState(new Map());
  const audioRef = useRef(null);

  // Debug logs
  useEffect(() => {
    console.log('ChatInterface: isOpen=', isOpen, 'selectedUser=', selectedUser);
  }, [isOpen, selectedUser]);

  // Socket.IO debug
  useEffect(() => {
    socket.on('connect', () => console.log('Socket.IO connected'));
    socket.on('connect_error', (err) => console.error('Socket.IO error:', err.message));
    return () => {
      socket.off('connect');
      socket.off('connect_error');
    };
  }, []);

  // Sidebar: inject temporary user first
  const sidebarUsers = selectedUser?.isTemporary
    ? [selectedUser, ...allUsers.filter(u => u._id !== selectedUser._id)]
    : allUsers;
  const users = (["Admin", "CS"].includes(userRole)
    ? sidebarUsers
    : sidebarUsers.filter(u => ["Admin", "employee", "CS"].includes(u.role))
  );

  // Fetch available users
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
  }, [currentUserId, lastFetched, dispatch, API_BASE_URL]);

  useEffect(() => { getAllUsers() }, [getAllUsers]);

  // Sync popup selection
  useEffect(() => {
    if (isOpen && reduxUser && reduxUser._id !== selectedUser?._id) {
      console.log('Syncing selectedUser:', reduxUser);
      setSelectedUser(reduxUser);
    }
  }, [isOpen, reduxUser]);

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
    if (!currentUserId) {
      console.log('Socket: Skipping, no currentUserId');
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
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: data.sender,
        receiver: data.receiver,
        text: data.message,
        side: data.sender === currentUserId ? "right" : "left",
        seen: data.sender === currentUserId,
        timestamp: data.timestamp,
      }]);
      if (data.receiver === currentUserId) {
        setRecent(m => new Map(m).set(data.sender, data.timestamp));
        getAllUsers();
      }
    };
    socket.on("receive_message", handler);
    return () => socket.off("receive_message", handler);
  }, [currentUserId, getAllUsers]);

  // Fetch history (skip temp)
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
  }, [API_BASE_URL, selectedUser, currentUserId, getAllUsers]);

  useEffect(() => { fetchHistory() }, [fetchHistory]);

  // Show original email for temp user
  useEffect(() => {
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
  }, [selectedUser]);

  // Send (socket or email)
  const sendChat = async () => {
    if (!inputMessage.trim() || !selectedUser || !currentUserId) {
      console.log('sendChat: Invalid input', { inputMessage, selectedUser, currentUserId });
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
    socket.emit("send_message", {
      sender: currentUserId,
      receiver: selectedUser._id,
      message: inputMessage,
      timestamp: now,
    });

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
    } catch (e) {
      console.error("Persist chat error:", e);
    }

    setMessages(prev => [...prev, {
      id: `local-${now}`,
      sender: currentUserId,
      receiver: selectedUser._id,
      text: inputMessage,
      side: "right",
      seen: true,
      timestamp: now
    }]);

    setInputMessage("");
    getAllUsers();
  };

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
      handleClose={() => dispatch(closeChatPopup())}
      recentMessages={recentMessages}
      API_BASE_URL={API_BASE_URL}
    />
  );
}

export default ChatInterface;