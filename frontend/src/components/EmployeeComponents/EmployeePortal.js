import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EmployeeMain from './EmployeeMain';
import EmployeeSideBar from './EmployeeSideBar';
import EmployeeNavbar from './EmployeeNavbar';

function EmployeePortal() {
  return (
    <div style={{ display: "flex" }}>
      {/* Static Sidebar for All Modules */}
      <EmployeeSideBar />

    <div className="DashboardContentContainer">

        {/* Static Navbar for All Modules */}
        <EmployeeNavbar />

        {/* Dynamic Content */}
        <div className="DashboardContent">
          <div className='dashboardScrollableOutlet'>
            <Routes>
              <Route path="" element={<EmployeeMain />} />
              <Route path="/manageStaff" element={<h1>Manage Staff</h1>} />
              <Route path="/manageProject" element={<h1>Projects</h1>} />
              <Route path="/manageMeetingRequest" element={<h1>Meeting Requests</h1>} />
              <Route path="/manageContractRequest" element={<h1>Contract Request</h1>} />
              <Route path="/manageMessages" element={<h1>Messages</h1>} />
              <Route path="/manageUsers" element={<h1>Manage Users</h1>} />
              <Route path="/manageMobileWeb" element={<h1>Mobile Web</h1>} />
              <Route path="/manageAd" element={<h1>Manage Ad</h1>} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeePortal;
