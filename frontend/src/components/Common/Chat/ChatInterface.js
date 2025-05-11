import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Chat from "./Chat";
import { fetchAdminsUsers, closeChatPopup, selectIsChatPopupOpen, selectSelectedUser } from "../../../redux/chatSlice";
import { useFunctions } from "../../../useFunctions";
import { useSocket } from "./Hooks/useSocket";
import { useMessages } from "./Hooks/useMessages";
import { useSendChat } from "./Hooks/useSendChat";
import { addNotification } from "../../../redux/chatSlice";

function ClientChatInterface() {
  const { API_BASE_URL, updateMessages } = useFunctions();
  const dispatch = useDispatch();

  const clientAuth = useSelector(s => s.clientAuth || {});
  const { clientData } = clientAuth;
  const currentUserId = clientData?._id || null;
  const currentUserRole = clientData?.role || null;
  const currentUserData = clientData
    ? { _id: clientData._id, fullName: clientData.fullName, image: clientData.image, role: clientData.role }
    : null;

  const isOpen = useSelector(selectIsChatPopupOpen);
  const reduxUser = useSelector(selectSelectedUser);
  const { users: allUsers, loading, error, lastFetched } = useSelector(s => s.chat);

  const getAllUsers = useCallback(() => {
    if (!currentUserId) {
      console.log('getAllUsers: Skipping, no currentUserId');
      return;
    }
    if (lastFetched && Date.now() - lastFetched < 30 * 60e3) {
      console.log('getAllUsers: Skipping, recently fetched');
      return;
    }
    console.log('getAllUsers: Dispatching fetchAdminsUsers');
    dispatch(fetchAdminsUsers({ API_BASE_URL })).unwrap().catch(err => {
      console.error('fetchAdminsUsers error:', err);
    });
  }, [currentUserId, lastFetched, dispatch, API_BASE_URL]);

  const { connectionError, handleReconnect, emitMessage } = useSocket({
    currentUserId,
    API_BASE_URL,
    onMessageReceived: (data) => {
      handleSocketMessage(data);
      const senderUser = allUsers.find(u => u._id === data.sender);
      dispatch(addNotification({
        id: data.messageId || `msg-${Date.now()}`,
        user: {
          _id: data.sender,
          fullName: senderUser?.fullName || data.senderName || 'Unknown',
          image: senderUser?.image || data.senderImage || null,
          role: senderUser?.role || data.senderRole || 'admin',
        },
        title: senderUser?.fullName || data.senderName || 'Unknown',
        message: data.message.length > 50 ? `${data.message.substring(0, 50)}...` : data.message,
        type: 'message',
        timestamp: data.timestamp || Date.now(),
        seen: false,
      }));
      getAllUsers();
    },
  });

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

  const { inputMessage, setInputMessage, sendSocketMessage, sendEmailReply } = useSendChat({
    API_BASE_URL,
    updateMessages,
    currentUserId,
    currentUserData,
    currentUserRole,
    emitMessage,
    onFetchUsers: getAllUsers,
  });

  const sidebarUsers = selectedUser?.isTemporary
    ? [selectedUser, ...allUsers.filter(u => u._id !== selectedUser._id)]
    : allUsers;

  const users = sidebarUsers.filter(u => {
    return messages.some(
      m => (m.sender === u._id && m.receiver === currentUserId) || (m.receiver === u._id && m.sender === currentUserId)
    ) && u._id !== currentUserId;
  });

  console.log('ClientChatInterface: users=', users.map(u => ({ _id: u._id, fullName: u.fullName, role: u.role })));
  console.log('ClientChatInterface: messages=', messages.map(m => ({ id: m.id, sender: m.sender, senderName: m.senderName, text: m.text })));

  useEffect(() => {
    if (isOpen && reduxUser && reduxUser._id !== selectedUser?._id) {
      console.log('Syncing selectedUser:', reduxUser);
      setSelectedUser(reduxUser);
    }
  }, [isOpen, reduxUser, setSelectedUser, selectedUser?._id]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  useEffect(() => {
    handleTemporaryUser();
  }, [handleTemporaryUser]);

  useEffect(() => {
    detectMissingUsers();
  }, [detectMissingUsers, messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllUsers();
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [getAllUsers]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const dummyData = {
        messageId: `dummy-${Date.now()}`,
        sender: 'admin123',
        receiver: currentUserId,
        message: 'This is a test message from Admin',
        senderName: 'Test Admin',
        senderImage: null,
        senderRole: 'admin',
        timestamp: Date.now(),
      };
      handleSocketMessage(dummyData);
      dispatch(addNotification({
        id: dummyData.messageId,
        user: {
          _id: dummyData.sender,
          fullName: dummyData.senderName,
          image: dummyData.senderImage,
          role: dummyData.senderRole,
        },
        title: dummyData.senderName,
        message: dummyData.message.length > 50 ? `${dummyData.message.substring(0, 50)}...` : dummyData.message,
        type: 'message',
        timestamp: dummyData.timestamp,
        seen: false,
      }));
      getAllUsers();
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentUserId, handleSocketMessage, dispatch, getAllUsers]);

  const sendChat = useCallback(async () => {
    if (connectionError) {
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
        setMessages(prev => [...prev, newMessage]);
        setInputMessage("");
        getAllUsers();
      }
    }
  }, [connectionError, selectedUser, sendEmailReply, sendSocketMessage, setMessages, setInputMessage, getAllUsers, dispatch]);

  if (!currentUserId || !currentUserData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-700">
        Loading user data... Please log in if this persists.
      </div>
    );
  }

  if (connectionError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-700">
        <p className="text-lg mb-4">{connectionError}</p>
        <button
          onClick={handleReconnect}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Reconnecting
        </button>
      </div>
    );
  }

  console.log("users=", users, "messages=", messages, "inputMessage=", inputMessage, "selectedUser=", selectedUser);

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

export default ClientChatInterface;