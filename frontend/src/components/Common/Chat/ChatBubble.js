import React, { useState } from 'react';

function ChatBubble({ side = 'left', text, seen, sender, receiver, currentUserId, users, API_BASE_URL, timestamp }) {
  const isRight = side === 'right';
  const bubbleColor = isRight ? 'bg-[#DBF0FF]' : 'bg-white';
  const alignment = isRight ? 'justify-end' : 'justify-start';

  const mainUserId = isRight ? sender : receiver;
  const mainUser = users.find((u) => u._id === mainUserId) || { fullName: 'Unknown' };
  const mainImageUrl = mainUser.image ? `${API_BASE_URL}/Uploads/user_images/${mainUser.image}` : null;
  const mainInitial = mainUser.fullName.charAt(0).toUpperCase() || 'U';

  const [showFallback, setShowFallback] = useState(false);

  const formatTime = (date) => {
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${alignment} mb-2 w-full`}>
      <div className="flex items-end max-w-[80%]">
        {!isRight && (
          <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden mr-2 flex-shrink-0">
            {mainImageUrl && !showFallback ? (
              <img
                src={mainImageUrl}
                alt={`${mainUser.fullName}'s profile`}
                className="w-full h-full object-cover"
                onError={() => setShowFallback(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-700">
                {mainInitial}
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
      </div>
    </div>
  );
}

export default ChatBubble;