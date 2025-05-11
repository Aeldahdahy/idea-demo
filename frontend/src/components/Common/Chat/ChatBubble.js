import React, { useState } from 'react';

function ChatBubble({ side = 'left', text, seen, sender, receiver, currentUserId, users, API_BASE_URL, timestamp, senderName, senderImage }) {
  const isRight = side === 'right';
  const bubbleColor = isRight ? 'bg-[#DBF0FF]' : 'bg-white';
  const alignment = isRight ? 'justify-end' : 'justify-start';

  const senderUser = users.find((u) => u._id === sender) || { fullName: senderName || 'Unknown', role: 'client', image: null };
  const senderRole = senderUser.role ? senderUser.role.toLowerCase() : 'client';
  const senderImageUrl = senderImage || (senderUser.image 
    ? (['admin', 'employee', 'cs'].includes(senderRole) 
        ? `${API_BASE_URL}/${senderUser.image}` 
        : `${API_BASE_URL}/Uploads/user_images/${senderUser.image}`)
    : null);
  const senderInitial = senderUser.fullName.charAt(0).toUpperCase() || 'U';

  const receiverUser = users.find((u) => u._id === receiver) || { fullName: 'Unknown', role: 'client', image: null };

  const [showSenderFallback, setShowSenderFallback] = useState(false);

  const formatTime = (date) => {
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  console.log('ChatBubble: Sender ID:', sender);
  console.log('ChatBubble: Sender User:', senderUser);
  console.log('ChatBubble: Sender Image:', senderImageUrl);
  console.log('ChatBubble: Receiver ID:', receiver);
  console.log('ChatBubble: Receiver User:', receiverUser);
  console.log('ChatBubble: Users array:', users.map(u => ({ _id: u._id, fullName: u.fullName, role: u.role })));

  return (
    <div className={`flex ${alignment} mb-2 w-full`}>
      <div className="flex items-end max-w-[80%]">
        {!isRight && (
          <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden mr-2 flex-shrink-0">
            {senderImageUrl && !showSenderFallback ? (
              <img
                src={senderImageUrl}
                alt={`${senderUser.fullName}'s profile`}
                className="w-full h-full object-cover"
                onError={() => setShowSenderFallback(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-700">
                {senderInitial}
              </div>
            )}
          </div>
        )}
        <div className={`relative ${bubbleColor} p-3 rounded-2xl shadow-sm w-fit max-w-full`}>
          <div className="text-sm text-gray-800 break-words">{text}</div>
          <div className="flex items-center justify-end mt-1">
            <span className="text-xs text-gray-500 mr-1">{formatTime(timestamp)}</span>
            {isRight && seen && (
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>
        {isRight && (
          <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden ml-2 flex-shrink-0">
            {senderImageUrl && !showSenderFallback ? (
              <img
                src={senderImageUrl}
                alt={`${senderUser.fullName}'s profile`}
                className="w-full h-full object-cover"
                onError={() => setShowSenderFallback(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-700">
                {senderInitial}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatBubble;