import React from 'react';
import ChatBubble from './ChatBubble';

function Chat({
  currentUserId,
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
                      users.map((user) => {
                        const lastMessageTime = recentMessages.get(user._id);
                        const isUnread = user.unreadCount > 0;
                        return (
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
                              {lastMessageTime && (
                                <div className="absolute -top-1 -right-1 h-3 w-3 bg-blue-500 rounded-full animate-pulse"></div>
                              )}
                            </div>
                            <div className={`ml-2 text-sm ${isUnread ? 'font-bold' : 'font-semibold'} text-gray-700 transition-all`}>
                              {user.fullName}
                              {isUnread && (
                                <span className="ml-2 text-xs text-indigo-600">({user.unreadCount})</span>
                              )}
                            </div>
                          </button>
                        );
                      })
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
}

export default Chat;