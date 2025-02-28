import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { motion } from "framer-motion";
import Logo from "../Common/Logo";
import LogoImage from "../../assets/idea.png";
import {
  UsersRound,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
  LayoutGrid,
  FileStack,
  Presentation,
  BookUser,
  Inbox,
  MonitorSmartphoneIcon,
  Megaphone,
} from "lucide-react";
import { useFunctions } from '../../useFunctions';

function EmployeeSideBar() {
  const [isExpanded, setExpanded] = useState(true);
  const toggleSidebar = () => setExpanded(!isExpanded);
  const { signOutDistroySession } = useFunctions();
  
  const location = useLocation(); // Get current URL path

  const menuItems = [
    { path: "/employee-portal/", label: "Dashboard", icon: <LayoutGrid /> },
    { path: "/employee-portal/manageStaff", label: "Manage Staff", icon: <UsersRound /> },
    { path: "/employee-portal/manageProject", label: "Projects", icon: <FileStack /> },
    { path: "/employee-portal/manageMeetingRequest", label: "Meeting Requests", icon: <Presentation /> },
    { path: "/employee-portal/manageContractRequest", label: "Contract Requests", icon: <BookUser /> },
    { path: "/employee-portal/manageMessages", label: "Messages", icon: <Inbox /> },
    { path: "/employee-portal/manageUsers", label: "Users", icon: <UsersRound /> },
  ];
  
  const moreItems = [
    { path: "/employee-portal/manageMobileWeb", label: "Mobile App & Website", icon: <MonitorSmartphoneIcon /> },
    { path: "/employee-portal/manageAd", label: "Manage Advertisements", icon: <Megaphone /> },
  ];

  return (
    <motion.div
      className={`sidebarContainer ${isExpanded ? "expanded" : "collapsed"}`}
      initial={{ width: isExpanded ? 320 : 100 }}
      animate={{ width: isExpanded ? "320px" : "100px" }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
      className="sidebar-header" 
      initial={{ padding: isExpanded ? '1rem' : '1.5rem' }}  
      animate={{ padding: isExpanded ? '1rem' : '1.5rem' }} 
      transition={{ duration: 0.5 }}
      >
          {isExpanded ? <Logo /> : <img src={LogoImage} alt="logo" width={50} />}
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isExpanded ? <ChevronsLeft /> : <ChevronsRight />}
        </button>
      </motion.div>

      <div className="sidebar-links">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`} // Apply 'active' class if link matches current path
          >
            {item.icon}
            {isExpanded && <span>{item.label}</span>}
          </Link>
        ))}

        {/* Logout Link */}
        <Link
          onClick={() => signOutDistroySession()}
          className="sidebar-link logout-link"
        >
          <LogOut />
          {isExpanded && <span>Logout</span>}
        </Link>
        <span className="sidebarLine"></span>
        <span className="sidebarMoreTitle">More</span>
        {moreItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`} // Apply 'active' class if link matches current path
          >
            {item.icon}
            {isExpanded && <span>{item.label}</span>}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

export default EmployeeSideBar;
