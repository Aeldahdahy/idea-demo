import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EmployeeMain from './EmployeeMain';
import EmployeeSideBar from './EmployeeSideBar';
import EmployeeNavbar from './EmployeeNavbar';
import EmployeeManageStaff from './EmployeeManageStaff';
import EmployeeManageProjects from './EmployeeManageProjects';
import EmployeeManageMessages from './EmployeeManageMessages';
import EmployeeManageUsers from './EmployeeManageUsers';

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
              <Route path="/manageStaff" element={<EmployeeManageStaff />} />
              <Route path="/manageProject" element={<EmployeeManageProjects />} />
              <Route path="/manageMeetingRequest" element={<h1>Meeting Requests</h1>} />
              <Route path="/manageContractRequest" element={<h1>Contract Request</h1>} />
              <Route path="/manageMessages" element={<EmployeeManageMessages />} />
              <Route path="/manageUsers" element={<EmployeeManageUsers />} />
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
