import React from "react";

const ChatInterface = () => {
  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        {/* Sidebar */}
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
          <div className="flex flex-row items-center justify-center h-12 w-full">
            <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div className="ml-2 font-bold text-2xl">QuickChat</div>
          </div>

          {/* Profile Card */}
          <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
            <div className="h-20 w-20 rounded-full border overflow-hidden">
              <img
                src="https://avatars3.githubusercontent.com/u/2763884?s=128"
                alt="Avatar"
                className="h-full w-full"
              />
            </div>
            <div className="text-sm font-semibold mt-2">Aminos Co.</div>
            <div className="text-xs text-gray-500">Lead UI/UX Designer</div>
            <div className="flex flex-row items-center mt-3">
              <div className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full">
                <div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
              </div>
              <div className="leading-none ml-1 text-xs">Active</div>
            </div>
          </div>

          {/* Active Conversations */}
          <div className="flex flex-col mt-8">
            <div className="flex flex-row items-center justify-between text-xs">
              <span className="font-bold">Active Conversations</span>
              <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">4</span>
            </div>
            <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
              {["Henry Boyd", "Marta Curtis", "Philip Tucker", "Christine Reid", "Jerry Guzman"].map((name, index) => (
                <button
                  key={index}
                  className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                >
                  <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                    {name[0]}
                  </div>
                  <div className="ml-2 text-sm font-semibold">{name}</div>
                </button>
              ))}
            </div>

            {/* Archived */}
            <div className="flex flex-row items-center justify-between text-xs mt-6">
              <span className="font-bold">Archived</span>
              <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">7</span>
            </div>
            <div className="flex flex-col space-y-1 mt-4 -mx-2">
              <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">H</div>
                <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
              </button>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  {/* Chat Bubbles */}
                  <ChatBubble side="left" text="Hey How are you today?" />
                  <ChatBubble side="left" text="Lorem ipsum dolor sit amet..." />
                  <ChatBubble side="right" text="I'm ok what about you?" />
                  <ChatBubble side="right" text="Lorem ipsum dolor sit, amet..." />
                  <ChatBubble side="left" text="Lorem ipsum dolor sit amet !" />
                  <ChatBubble side="right" text="Seen message example" seen />
                </div>
              </div>
            </div>

            {/* Input Bar */}
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              <button className="text-gray-400 hover:text-gray-600">
                📎
              </button>
              <div className="flex-grow ml-4">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                />
              </div>
              <button className="bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 ml-4">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable chat bubble component
const ChatBubble = ({ side = "left", text, seen }) => {
  const isRight = side === "right";
  const alignment = isRight ? "col-start-6 col-end-13" : "col-start-1 col-end-8";
  const justify = isRight ? "flex-row-reverse" : "flex-row";
  const bubbleColor = isRight ? "bg-indigo-100" : "bg-white";

  return (
    <div className={`${alignment} p-3 rounded-lg`}>
      <div className={`flex items-center ${justify}`}>
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          A
        </div>
        <div className={`relative ${isRight ? "mr-3" : "ml-3"} text-sm ${bubbleColor} py-2 px-4 shadow rounded-xl`}>
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
