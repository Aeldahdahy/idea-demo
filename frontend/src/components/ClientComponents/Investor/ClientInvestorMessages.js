import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useFunctions } from "../../../useFunctions";

// Replace with your actual setUsers action
const setUsers = (users) => ({
  type: 'user/setUsers',
  payload: users,
});

const socket = io.connect('https://idea-venture.agency');

const ChatInterface = () => {
  const { API_BASE_URL } = useFunctions();
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.clientAuth?.clientData?._id);
  const [users, setUsersState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUserFetched, setLastUserFetched] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [recentMessages, setRecentMessages] = useState(new Set());
  const audioRef = useRef(new Audio('/sounds/notification.mp3'));

  const getAllUsers = useCallback(async () => {
    if (!currentUserId) return;

    const THIRTY_MINUTES = 30 * 60 * 1000;
    const now = Date.now();
    const token = localStorage.getItem('authToken');

    if (!token) {
      const errorMessage = 'Authentication token is missing. Please sign in again.';
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    if (lastUserFetched && now - lastUserFetched < THIRTY_MINUTES) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/chat`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(response.data.data)) {
        dispatch(setUsers(response.data.data));
        setUsersState(response.data.data);
        // Update recentMessages based on lastMessageTime
        const recent = new Set(response.data.data
          .filter(user => user.lastMessageTime)
          .map(user => user._id));
        setRecentMessages(recent);
        setLastUserFetched(now);
      } else {
        throw new Error('Invalid data format: Expected an array in response.data.data');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred while fetching users.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL, lastUserFetched, dispatch, currentUserId]);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    if (!currentUserId) return;

    socket.emit("join_room", currentUserId);

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("receive_message", (data) => {
      audioRef.current.play().catch((err) => console.log("Audio play failed:", err));
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          sender: data.sender,
          receiver: data.receiver,
          text: data.message,
          side: data.sender === currentUserId ? "right" : "left",
          seen: false,
          timestamp: data.timestamp,
        },
      ]);
      if (data.receiver === currentUserId) {
        setRecentMessages((prev) => new Set(prev).add(data.sender));
        getAllUsers(); // Refresh user list to update lastMessageTime
      }
    });

    socket.on("connect_error", (error) => {
      console.error("Socket.IO connection error:", error);
      toast.error("Failed to connect to chat server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    return () => {
      socket.off("connect");
      socket.off("receive_message");
      socket.off("connect_error");
      socket.off("disconnect");
    };
  }, [currentUserId, getAllUsers]);

  const fetchMessages = useCallback(async () => {
    if (!selectedUser || !currentUserId) return;

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(
        `${API_BASE_URL}/api/chats/${currentUserId}/${selectedUser._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(
        response.data.map((msg, index) => ({
          id: index + 1,
          sender: msg.sender,
          receiver: msg.receiver,
          text: msg.content,
          side: msg.sender === currentUserId ? "right" : "left",
          seen: false,
          timestamp: msg.timestamp,
        }))
      );
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to fetch messages");
    }
  }, [API_BASE_URL, selectedUser, currentUserId]);

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
      setRecentMessages((prev) => new Set(prev).add(selectedUser._id));
      setInputMessage("");
      getAllUsers(); // Refresh user list to update lastMessageTime
    }
  };

  const handleClose = () => setIsOpen(false);

  return (
    <>
      {!currentUserId ? (
        <div>Please log in to use the chat</div>
      ) : !isOpen ? null : (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
          <div className="relative w-full max-w-6xl h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
              data-tooltip-target="tooltip-close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div id="tooltip-close" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip">
              Close Chat
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>

            <div className="flex h-full overflow-hidden">
              <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-gray-50 flex-shrink-0 border-r border-gray-200">
                <div className="flex flex-row items-center justify-center h-12 w-full">
                  <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div className="ml-2 font-bold text-2xl text-gray-800">InvestorConnect</div>
                </div>

                <div className="flex flex-col mt-8">
                  <div className="flex flex-row items-center justify-between text-xs">
                    <span className="font-bold text-gray-700">Users</span>
                    <span className="flex items-center justify-center bg-indigo-100 text-indigo-700 h-4 w-4 rounded-full text-xs">{users.length}</span>
                  </div>
                  <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
                    {loading ? (
                      <div>Loading users...</div>
                    ) : error ? (
                      <div>Error: {error}</div>
                    ) : users.length === 0 ? (
                      <div>No users found</div>
                    ) : (
                      users.map((user) => (
                        <button
                          key={user._id}
                          onClick={() => setSelectedUser(user)}
                          className={`flex flex-row items-center hover:bg-indigo-50 rounded-xl p-2 transition-colors ${selectedUser?._id === user._id ? 'bg-indigo-100' : ''}`}
                          disabled={user._id === currentUserId}
                        >
                          <div className="relative flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full text-indigo-700 overflow-hidden">
                            {user.image ? (
                              <img
                                src={`${API_BASE_URL}/Uploads/user_images/${user.image}`}
                                alt={`${user.fullName}'s profile`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.nextSibling.style.display = "flex";
                                }}
                              />
                            ) : null}
                            <div
                              className="w-full h-full flex items-center justify-center"
                              style={{ display: user.image ? "none" : "flex" }}
                            >
                              {user.fullName.charAt(0).toUpperCase()}
                            </div>
                            {recentMessages.has(user._id) && (
                              <div className="absolute -top-1 -right-1 h-3 w-3 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <div className="ml-2 text-sm font-semibold text-gray-700">{user.fullName}</div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col flex-auto h-full p-6">
                <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                  <div className="flex flex-col h-full overflow-x-auto mb-4">
                    <div className="flex flex-col h-full">
                      <div className="grid grid-cols-12 gap-y-2">
                        {selectedUser ? (
                          messages.map((message) => (
                            <ChatBubble
                              key={message.id}
                              side={message.side}
                              text={message.text}
                              seen={message.seen}
                              sender={message.sender}
                              receiver={message.receiver}
                              currentUserId={currentUserId}
                              users={users}
                              API_BASE_URL={API_BASE_URL}
                            />
                          ))
                        ) : (
                          <div className="col-span-12 text-center text-gray-500">Select a user to start chatting</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4 shadow-sm">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors" data-tooltip-target="tooltip-attach">
                      📎
                    </button>
                    <div id="tooltip-attach" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip">
                      Attach File
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors ml-2" data-tooltip-target="tooltip-emoji">
                      😊
                    </button>
                    <div id="tooltip-emoji" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip">
                      Add Emoji
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                    <div className="flex-grow ml-4">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="w-full border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 pl-4 h-10 transition-colors"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && sendChat()}
                        disabled={!selectedUser}
                      />
                    </div>
                    <button
                      className="bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 ml-4 transition-colors flowbite-button"
                      onClick={sendChat}
                      disabled={!selectedUser}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Reusable chat bubble component
const ChatBubble = ({ side = "left", text, seen, sender, receiver, currentUserId, users, API_BASE_URL }) => {
  const isRight = side === "right";
  const alignment = isRight ? "col-start-6 col-end-13" : "col-start-1 col-end-8";
  const justify = isRight ? "flex-row-reverse" : "flex-row";
  const bubbleColor = isRight ? "bg-indigo-100" : "bg-white";

  const mainUserId = isRight ? sender : receiver;
  const secondaryUserId = isRight ? receiver : sender;
  const mainUser = users.find((u) => u._id === mainUserId);
  const secondaryUser = users.find((u) => u._id === secondaryUserId);
  const mainImageUrl = mainUser?.image ? `${API_BASE_URL}/Uploads/user_images/${mainUser.image}` : null;
  const secondaryImageUrl = secondaryUser?.image ? `${API_BASE_URL}/Uploads/user_images/${secondaryUser.image}` : null;
  const mainInitial = mainUser?.fullName?.charAt(0).toUpperCase() || (isRight ? "U" : "T");
  const secondaryInitial = secondaryUser?.fullName?.charAt(0).toUpperCase() || (isRight ? "T" : "U");

  return (
    <div className={`${alignment} p-3 rounded-lg animate-slide-in`}>
      <div className={`flex items-center ${justify}`}>
        <div className="relative flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0 text-white overflow-hidden">
          {mainImageUrl ? (
            <img
              src={mainImageUrl}
              alt={`${mainUser?.fullName || "User"}'s profile`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ display: mainImageUrl ? "none" : "flex" }}
          >
            {mainInitial}
          </div>
          {secondaryImageUrl || secondaryInitial ? (
            <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-indigo-500 text-white overflow-hidden border-2 border-white">
              {secondaryImageUrl ? (
                <img
                  src={secondaryImageUrl}
                  alt={`${secondaryUser?.fullName || "User"}'s profile`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : null}
              <div
                className="w-full h-full flex items-center justify-center text-xs"
                style={{ display: secondaryImageUrl ? "none" : "flex" }}
              >
                {secondaryInitial}
              </div>
            </div>
          ) : null}
        </div>
        <div className={`relative ${isRight ? "mr-3" : "ml-3"} text-sm ${bubbleColor} py-2 px-4 shadow rounded-xl transition-transform hover:scale-[1.02]`}>
          <div>{text}</div>
          {seen && (
            <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
              Seen
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;