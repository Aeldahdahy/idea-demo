import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { jwtDecode } from 'jwt-decode';
import { UserRound } from 'lucide-react';

function EmployeeNavbar() {
    const location = useLocation();
    const [moduleName, setModuleName] = useState('');
    // Get user details from Redux store
    const user = useSelector((state) => state.auth.token); // Adjust based on your store structure
    const decodedToken = jwtDecode(user);

    // Map paths to their corresponding module names
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    // Update module name when route changes
    useEffect(() => {
        setModuleName(moduleNames[location.pathname] || "Unknown Module");
    }, [location.pathname, moduleNames]);

    return (
        <div className='dashboardNavbarContainer'>
            {/* Module Name Section */}
            <div className='dashboardModuleName'>
                <h1>{moduleName}</h1>
            </div>

            {/* User Profile Section */}
            <div className='dashboardUser'>
                {user && (
                    <>
                        <div className='userInfo'>
                            <span className='userName'>{decodedToken.username || 'Unknown User'}</span>
                            <span className='userRole'>{decodedToken.role || 'No Role Assigned'}</span>
                        </div>
                        {decodedToken.image ? (
                            <img src={decodedToken.image} alt='User' className='userImage' />
                        ) : (
                            <UserRound className='userImage' />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default EmployeeNavbar;
