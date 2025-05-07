import React from 'react';

function ChatBubble({ side = "left", text, seen, sender, receiver, currentUserId, users, API_BASE_URL }) {
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
}

export default ChatBubble;