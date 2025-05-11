import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Chat from "./Chat";
import {
  fetchUsers,
  closeChatPopup,
  selectIsChatPopupOpen,
  selectSelectedUser,
} from "../../../redux/chatSlice";
import { useFunctions } from "../../../useFunctions";
import { useSocket } from "./Hooks/useSocket";
import { useMessages } from "./Hooks/useMessages";
import { useSendChat } from "./Hooks/useSendChat";

function EmployeeChatInterface() {
  const { API_BASE_URL, updateMessages } = useFunctions();
  const dispatch = useDispatch();

  // Auth
  const auth = useSelector((s) => s.auth || {});
  const { userRole, user } = auth;
  const currentUserId = user?._id || null;
  const currentUserRole = userRole || null;
  const currentUserData = user
    ? { _id: user._id, fullName: user.fullName, image: user.image, role: userRole }
    : null;

  // Redux chat state
  const isOpen = useSelector(selectIsChatPopupOpen);
  const reduxUser = useSelector(selectSelectedUser);
  const { users: allUsers, loading, error, lastFetched } = useSelector((s) => s.chat);

  // Fetch users
  const getAllUsers = useCallback(() => {
    if (!currentUserId) {
      console.log("getAllUsers: Skipping, no currentUserId");
      return;
    }
    if (lastFetched && Date.now() - lastFetched < 30 * 60e3) {
      console.log("getAllUsers: Skipping, recently fetched");
      return;
    }
    console.log("getAllUsers: Dispatching fetchUsers");
    dispatch(fetchUsers({ API_BASE_URL }))
      .unwrap()
      .then(() => console.log("fetchUsers: Success"))
      .catch((err) => {
        console.error("fetchUsers error:", err);
        toast.error("Failed to fetch users");
      });
  }, [currentUserId, lastFetched, dispatch, API_BASE_URL]);

  // Fetch users when chat popup opens
  useEffect(() => {
    if (isOpen && currentUserId) {
      console.log("Chat popup opened, triggering getAllUsers");
      getAllUsers();
    }
  }, [isOpen, currentUserId, getAllUsers]);

  // Socket hook
  const { socket, connectionError, handleReconnect, emitMessage } = useSocket({
    currentUserId,
    API_BASE_URL,
    onMessageReceived: (data) => {
      handleSocketMessage(data);
      getAllUsers(); // Refresh users on new message
    },
  });

  // Messages hook
  const [selectedUser, setSelectedUser] = React.useState(null);
  const {
    messages,
    setMessages,
    recentMessages,
    fetchHistory,
    detectMissingUsers,
    handleTemporaryUser,
    handleSocketMessage,
  } = useMessages({
    API_BASE_URL,
    currentUserId,
    selectedUser,
    allUsers,
    onFetchUsers: getAllUsers,
  });

  // Send chat hook
  const { inputMessage, setInputMessage, sendSocketMessage, sendEmailReply } = useSendChat({
    API_BASE_URL,
    updateMessages,
    currentUserId,
    currentUserData,
    currentUserRole,
    emitMessage,
    onFetchUsers: getAllUsers,
  });

  // Sidebar: inject temporary user first
  const sidebarUsers = selectedUser?.isTemporary
    ? [selectedUser, ...allUsers.filter((u) => u._id !== selectedUser._id)]
    : allUsers;

  // Employees see all users
  const users = [...sidebarUsers].concat(currentUserData ? [currentUserData] : []);

  // Debug state
  useEffect(() => {
    console.log("EmployeeChatInterface State:", {
      users: users.map((u) => ({ _id: u._id, fullName: u.fullName, role: u.role })),
      messages: messages.map((m) => ({ id: m.id, sender: m.sender, senderName: m.senderName, text: m.text })),
      selectedUser,
      isOpen,
      reduxUser,
      loading,
      error,
      connectionError,
      socketConnected: socket?.connected,
    });
  }, [users, messages, selectedUser, isOpen, reduxUser, loading, error, connectionError, socket]);

  // Sync popup selection
  useEffect(() => {
    if (isOpen && reduxUser && reduxUser._id !== selectedUser?._id) {
      console.log("Syncing selectedUser:", reduxUser);
      setSelectedUser(reduxUser);
    }
  }, [isOpen, reduxUser, selectedUser?._id]);

  // Fetch history and handle temporary users
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  useEffect(() => {
    handleTemporaryUser();
  }, [handleTemporaryUser]);

  // Detect missing users
  useEffect(() => {
    detectMissingUsers();
  }, [detectMissingUsers]);

  // Handle send chat
  const sendChat = useCallback(async () => {
    if (connectionError) {
      toast.error("Cannot send message: No connection to the chat server");
      return;
    }
    if (!selectedUser) {
      toast.error("No user selected for chat");
      return;
    }
    if (selectedUser?.isTemporary) {
      const success = await sendEmailReply(selectedUser);
      if (success) {
        dispatch(closeChatPopup());
      }
    } else {
      const newMessage = await sendSocketMessage(selectedUser);
      if (newMessage) {
        setMessages((prev) => [...prev, newMessage]);
        setInputMessage("");
        getAllUsers();
      }
    }
  }, [
    connectionError,
    selectedUser,
    sendEmailReply,
    sendSocketMessage,
    setMessages,
    setInputMessage,
    getAllUsers,
    dispatch,
  ]);

  // Render loading state if no valid user data
  if (!currentUserId || !currentUserData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-700">
        Loading user data... Please log in if this persists.
      </div>
    );
  }

  // Render error state for fetch users or socket failure
  if (error || connectionError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-700">
        <p className="text-lg mb-4">{connectionError || `Failed to load chat users: ${error}`}</p>
        <button
          onClick={connectionError ? handleReconnect : getAllUsers}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {connectionError ? "Try Reconnecting" : "Retry Loading Users"}
        </button>
      </div>
    );
  }

  return (
    <Chat
      currentUserId={currentUserId}
      currentUserData={currentUserData}
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

export default EmployeeChatInterface;