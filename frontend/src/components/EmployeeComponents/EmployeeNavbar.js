import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { jwtDecode } from 'jwt-decode';
import { UserRound } from 'lucide-react';
import { Dropdown } from 'flowbite-react';

function EmployeeNavbar() {
    const location = useLocation();
    const [moduleName, setModuleName] = useState('');
    const user = useSelector((state) => state.auth.token);
    const decodedToken = jwtDecode(user);

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

    useEffect(() => {
        setModuleName(moduleNames[location.pathname] || "Unknown Module");
    }, [location.pathname]);

    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            {/* Module Name Section */}
            <div className="text-2xl font-semibold text-gray-800">
                {moduleName}
            </div>

            {/* User Profile Section */}
            <div className="flex items-center space-x-4">
                {user && (
                    <Dropdown
                        label={
                            <div className="flex items-center space-x-2">
                                {decodedToken.image ? (
                                    <img
                                        src={decodedToken.image}
                                        alt="User"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    ) : (
                                        <UserRound className="w-10 h-10" size={40} />
                                    )}
                                </div>
                            }
                        >
                            <>
                                <Dropdown.Item>
                                    <span className="text-sm text-gray-700">
                                        {decodedToken.username || 'Unknown User'}
                                    </span>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <span className="text-sm text-gray-500">
                                        {decodedToken.role || 'No Role Assigned'}
                                    </span>
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item>
                                    <span className="text-sm text-red-600">Logout</span>
                                </Dropdown.Item>
                            </>
                        </Dropdown>
                )}
            </div>
        </nav>
    );
}

export default EmployeeNavbar;