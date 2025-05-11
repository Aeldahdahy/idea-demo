import React, { useState, useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import EmojiPicker from 'emoji-picker-react';

function Chat({
  currentUserId,
  currentUserData,
  isOpen,
  users,
  loading,
  error,
  selectedUser,
  setSelectedUser,
  messages,
  inputMessage,
  setInputMessage,
  sendChat,
  handleClose,
  recentMessages,
  API_BASE_URL,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showCurrentUserFallback, setShowCurrentUserFallback] = useState(false);
  const [userFallbacks, setUserFallbacks] = useState({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const messagesEndRef = useRef(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleEmojiClick = (emojiObject) => {
    setInputMessage((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSendChat = () => {
    if (inputMessage.trim() || selectedFile) {
      const messageData = { text: inputMessage };
      if (selectedFile) {
        messageData.file = selectedFile;
      }
      sendChat(messageData);
      setInputMessage('');
      setSelectedFile(null);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!currentUserId || !currentUserData) {
    return <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-700">Please log in to use the chat</div>;
  }

  if (!isOpen) return null;

  const currentUser = currentUserData;
  const currentUserImage = currentUser.image ? (['Admin', 'employee', 'CS'].includes(currentUser.role) ? `${API_BASE_URL}/${currentUser.image}` : `${API_BASE_URL}/Uploads/user_images/${currentUser.image}`) : null;
  const currentUserInitial = currentUser.fullName.charAt(0).toUpperCase() || 'U';
  const isEmployee = ['Admin', 'employee', 'CS'].includes(currentUser.role);

  console.log('Chat: currentUser=', currentUser, 'currentUserImage=', currentUserImage);

  const validMessages = messages.filter(message => {
    if (currentUser.role === 'client') {
      const sender = users.find(u => u._id === message.sender);
      return sender && ["Admin", "employee", "CS"].includes(sender.role);
    }
    return true;
  });

  const sidebarBg = isEmployee ? 'bg-gray-800 text-white' : 'bg-white';
  const chatAreaBg = isEmployee ? 'bg-gray-700' : 'bg-[#E7ECEF]';
  const inputAreaBg = isEmployee ? 'bg-gray-900 text-white' : 'bg-white';
  const headerBg = isEmployee ? 'bg-[#1E3A8A]' : 'bg-[#527DA9]';

  return (
    <div className="fixed inset-0 z-50 bg-gray-100 flex font-sans hidelogo">
      <div className={`w-full sm:w-80 flex-shrink-0 border-r border-gray-200 flex flex-col transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 fixed sm:static h-full z-10 ${sidebarBg}`}>
        <div className={`flex items-center justify-between p-4 ${headerBg} text-white`}>
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="sm:hidden mr-2 text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="h-10 w-10 mr-2">
              {currentUserImage && !showCurrentUserFallback ? (
                <img
                  src={currentUserImage}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                  onError={() => setShowCurrentUserFallback(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-700 bg-gray-200 rounded-full">
                  {currentUserInitial}
                </div>
              )}
            </div>
            <p>{currentUser.fullName}</p>
          </div>
          <button onClick={handleClose} className="text-white hover:text-gray-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {loading ? (
            <div className={`text-gray-500 p-4 ${isEmployee ? 'text-gray-300' : ''}`}>Loading users...</div>
          ) : error ? (
            <div className="text-red-500 p-4">Error: {error}</div>
          ) : users.length === 0 ? (
            <div className={`text-gray-500 p-4 ${isEmployee ? 'text-gray-300' : ''}`}>No users found</div>
          ) : (
            users.map((user) => {
              const lastMessageTime = recentMessages.get(user._id);
              const isUnread = user.unreadCount > 0;
              const userImage = user.image ? (['Admin', 'employee', 'CS'].includes(user.role) ? `${API_BASE_URL}/${user.image}` : `${API_BASE_URL}/Uploads/user_images/${user.image}`) : null;
              const userInitial = user.fullName.charAt(0).toUpperCase() || 'U';

              return (
                <button
                  key={user._id}
                  onClick={() => {
                    setSelectedUser(user);
                    setIsSidebarOpen(false);
                  }}
                  className={`flex items-center w-full p-3 rounded-lg ${isEmployee ? 'hover:bg-gray-600' : 'hover:bg-gray-100'} ${selectedUser?._id === user._id ? (isEmployee ? 'bg-gray-600' : 'bg-gray-100') : ''} ${user._id === currentUserId ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={user._id === currentUserId}
                >
                  <div className="relative h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                    {userImage && !userFallbacks[user._id] ? (
                      <img
                        src={userImage}
                        alt={`${user.fullName}'s profile`}
                        className="w-full h-full object-cover"
                        onError={() => setUserFallbacks((prev) => ({ ...prev, [user._id]: true }))}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-700">
                        {userInitial}
                      </div>
                    )}
                    {lastMessageTime && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-blue-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="ml-3 text-left flex-1">
                    <div className={`font-semibold ${isUnread ? (isEmployee ? 'text-white' : 'text-black') : (isEmployee ? 'text-gray-300' : 'text-gray-700')}`}>
                      {user.fullName}
                    </div>
                    {isEmployee && (
                      <div className="text-xs text-gray-400">{user.role}</div>
                    )}
                    {isUnread && (
                      <span className="text-xs bg-blue-500 text-white rounded-full px-2 py-1">{user.unreadCount}</span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className={`flex-1 flex flex-col h-full ${isSidebarOpen && !selectedUser ? 'hidden sm:flex' : 'flex'}`}>
        {selectedUser ? (
          <>
            <div className={`flex items-center justify-between p-4 ${headerBg} text-white`}>
              <div className="flex items-center">
                <button onClick={toggleSidebar} className="sm:hidden mr-2 text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                  {selectedUser.image && !userFallbacks[selectedUser._id] ? (
                    <img
                      src={['Admin', 'employee', 'CS'].includes(selectedUser.role) ? `${API_BASE_URL}/${selectedUser.image}` : `${API_BASE_URL}/Uploads/user_images/${selectedUser.image}`}
                      alt={`${selectedUser.fullName}'s profile`}
                      className="w-full h-full object-cover"
                      onError={() => setUserFallbacks((prev) => ({ ...prev, [selectedUser._id]: true }))}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-700">
                      {selectedUser.fullName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="ml-3">
                  <div className="font-semibold">{selectedUser.fullName}</div>
                  <div className="text-xs">Online</div>
                </div>
              </div>
            </div>
            <div
              className={`flex-1 overflow-y-auto p-4 ${chatAreaBg}`}
              style={{ backgroundSize: 'auto', backgroundPosition: 'center' }}
            >
              <div className="flex flex-col gap-2">
                {validMessages.map((message) => (
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
                    timestamp={message.timestamp || new Date().toISOString()}
                    senderName={message.senderName}
                    senderImage={message.senderImage} // Pass senderImage
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
            <div className={`p-4 ${inputAreaBg} flex flex-col border-t border-gray-200 relative`}>
              <div className="flex items-center">
                <button
                  className={`${isEmployee ? 'text-gray-300 hover:text-gray-100' : 'text-gray-500 hover:text-gray-700'} mx-2`}
                  title="Add Emoji"
                  onClick={() => setShowEmojiPicker((prev) => !prev)}
                >
                  😊
                </button>
                {isEmployee && (
                  <label className={`${isEmployee ? 'text-gray-300 hover:text-gray-100' : 'text-gray-500 hover:text-gray-700'} mx-2 cursor-pointer`} title="Attach File">
                    📎
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*,application/pdf"
                    />
                  </label>
                )}
                <input
                  type="text"
                  placeholder="Type a message"
                  className={`flex-1 ${isEmployee ? 'bg-gray-800 text-white' : 'bg-gray-100'} rounded-lg p-3 border-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendChat()}
                  disabled={!selectedUser}
                />
                <button
                  className={`ml-2 ${isEmployee ? 'bg-blue-700' : 'bg-[#527DA9]'} text-white rounded-full p-3 hover:bg-blue-600 disabled:opacity-50`}
                  onClick={handleSendChat}
                  disabled={!selectedUser}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              {selectedFile && isEmployee && (
                <div className={`mt-2 text-sm ${isEmployee ? 'text-gray-300' : 'text-gray-600'}`}>
                  Attached: {selectedFile.name}
                  <button
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={() => setSelectedFile(null)}
                  >
                    Remove
                  </button>
                </div>
              )}
              {showEmojiPicker && (
                <div className="absolute bottom-16 left-2 z-10">
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className={`flex-1 flex items-center justify-center ${isEmployee ? 'text-gray-300' : 'text-gray-500'}`}>
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;