import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { UserCircle, Inbox, User, ChevronDown } from 'lucide-react';
import { openChatPopup, selectTotalUnreadCount } from '../../redux/chatSlice';

function EmployeeNavbar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [moduleName, setModuleName] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const { token, username } = useSelector((state) => state.auth);
    const totalUnreadCount = useSelector(selectTotalUnreadCount);

    useEffect(() => {
        const moduleNames = {
            "/employee-portal/": "Dashboard",
            "/employee-portal/manageStaff": "Manage Staff",
            "/employee-portal/manageProject": "Projects",
            "/employee-portal/manageMeetingRequest": "Meeting Requests",
            "/employee-portal/manageContractRequest": "Contract Requests",
            "/employee-portal/manageMessages": "Messages",
            "/employee-portal/manageUsers": "Users",
            "/employee-portal/manageMobileWeb": "Mobile App & Website",
            "/employee-portal/manageAd": "Manage Advertisements",
        };
        setModuleName(moduleNames[location.pathname] || 'Unknown Module');
    }, [location.pathname]);

    const handleOpenChat = () => {
        dispatch(openChatPopup());
        setIsOpen(false); // Close dropdown after clicking Inbox
    };

    return (
        <nav className="bg-white shadow-lg p-4 flex justify-between items-center">
            {/* Module Name Section */}
            <div className="text-2xl font-bold text-gray-900">
                {moduleName}
            </div>

            {/* User Profile Section */}
            <div className="flex items-center space-x-4">
                {token && (
                    <div className="relative">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center space-x-2 focus:outline-none"
                        >
                            <UserCircle className="w-10 h-10 text-gray-600" />
                            <span className="text-sm text-gray-700">{username || 'User'}</span>
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                        </button>
                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                                <div
                                    className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={handleOpenChat}
                                >
                                    <Inbox className="w-5 h-5 text-gray-600" />
                                    <span className="text-sm text-gray-700">Inbox</span>
                                    {totalUnreadCount > 0 && (
                                        <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-500 rounded-full">
                                            {totalUnreadCount}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    <User className="w-5 h-5 text-gray-600" />
                                    <span className="text-sm text-gray-700">Profile</span>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default EmployeeNavbar;