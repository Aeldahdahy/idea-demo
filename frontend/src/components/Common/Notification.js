import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Notification = ({ isAuthenticated, isFixed, isVisible }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Determine dropdown direction based on button position
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // If button is closer to bottom (less than 50% of viewport height remaining below),
      // open upward; otherwise, open downward
      const spaceBelow = viewportHeight - rect.bottom;
      setOpenUpward(spaceBelow < viewportHeight / 2);
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  return isAuthenticated ? (
    <div
      className={`relative inline-block ${isFixed ? 'fixed top-0 right-0' : ''} ${
        !isVisible ? 'hidden' : ''
      }`}
    >
      {/* Notification Icon */}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
      >
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
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          ></path>
        </svg>
        {/* Notification Badge */}
        <span className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full"></span>
      </button>

      {/* Notifications Dropdown */}
      <div
        ref={dropdownRef}
        className={`absolute right-0 w-80 bg-white rounded-lg shadow-xl z-[9999] max-h-96 overflow-y-auto transition-all duration-200 ${
          isOpen ? 'block' : 'hidden'
        } ${openUpward ? 'bottom-full mb-2' : 'top-full mt-2'}`}
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
        </div>
        {/* Notification Items */}
        <div className="divide-y divide-gray-200">
          <Link
            to={"#"}
            className="block p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start">
              <div className="flex-1">
                <div className="flex items-center">
                  <h4 className="text-sm font-medium text-gray-800">New Message</h4>
                  <span className="ml-2 h-2 w-2 bg-blue-500 rounded-full"></span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  You received a new message from John.
                </p>
              </div>
            </div>
          </Link>
          <Link
            to={"#"}
            className="block p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start">
              <div className="flex-1">
                <div className="flex items-center">
                  <h4 className="text-sm font-medium text-gray-800">Update Available</h4>
                  <span className="ml-2 h-2 w-2 bg-blue-500 rounded-full"></span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  A new version of the app is ready.
                </p>
              </div>
            </div>
          </Link>
          <Link
            to={"#"}
            className="block p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start">
              <div className="flex-1">
                <div className="flex items-center">
                  <h4 className="text-sm font-medium text-gray-800">Event Reminder</h4>
                  <span className="ml-2 h-2 w-2 bg-blue-500 rounded-full"></span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Team meeting at 3 PM today.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Notification;