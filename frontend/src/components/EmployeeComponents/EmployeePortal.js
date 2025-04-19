import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EmployeeMain from './EmployeeMain';
import EmployeeSideBar from './EmployeeSideBar';
import EmployeeNavbar from './EmployeeNavbar';
import EmployeeManageStaff from './EmployeeManageStaff';
import EmployeeManageProjects from './EmployeeManageProjects';
import EmployeeManageMessages from './EmployeeManageMessages';
import EmployeeManageUsers from './EmployeeManageUsers';
import EmployeeManageAd from './EmployeeManageAd';
import EmployeeManageContract from './EmployeeManageContract';
import EmployeeMobileWebContent from './EmployeeMobileWebContent';
import EmployeeManageMeeting from './EmployeeManageMeeting';
import EmployeeDataPopUp from './EmployeeDataPopUp';
import EmployeeProjectPopUp from './EmployeeProjectPopUp';

function EmployeePortal() {
  const staffData = useSelector((state) => state.staffData);
  const projectData = useSelector((state) => state.projectData);
  // console.log('EmployeePortal staffData:', staffData); // Debug
  const { isOpenStaff, typeStaff, initialStaffData } = staffData; // Fixed
  const { isOpen: isOpenProject, type: typeProject, initialData: initialProjectData } = projectData;

  return (
    <div style={{ display: "flex" }}>
      <EmployeeSideBar />
      <div className="DashboardContentContainer">
        <EmployeeNavbar />
        <div className="DashboardContent">
          <div className='dashboardScrollableOutlet'>
            <Routes>
              <Route path="" element={<EmployeeMain />} />
              <Route path="/manageStaff" element={<EmployeeManageStaff />} />
              <Route path="/manageProject" element={<EmployeeManageProjects />} />
              <Route path="/manageMeetingRequest" element={<EmployeeManageMeeting />} />
              <Route path="/manageContractRequest" element={<EmployeeManageContract />} />
              <Route path="/manageMessages" element={<EmployeeManageMessages />} />
              <Route path="/manageUsers" element={<EmployeeManageUsers />} />
              <Route path="/manageMobileWeb" element={<EmployeeMobileWebContent />} />
              <Route path="/manageAd" element={<EmployeeManageAd />} />
            </Routes>
          </div>
        </div>
      </div>
      {isOpenStaff && <EmployeeDataPopUp typeStaff={typeStaff} initialStaffData={initialStaffData} />}
      {isOpenProject && <EmployeeProjectPopUp typeProject={typeProject} initialProjectData={initialProjectData} />}
    </div>
  );
}

export default EmployeePortal;