import React, { useEffect } from 'react';
import { Route, Routes, useNavigate,  } from 'react-router-dom';
import EmployeeSignForm from './EmployeeSignForm';

function EmployeePortal() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('authToken');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/employee-portal/EmployeeSignForm', { replace: true }); 
    }
  }, [isAuthenticated, navigate]);

  return (
    isAuthenticated ? (
    <>
      <Routes>
        {/* <Route path='/employee-portal/' element={<Dashboard />} */}
      </Routes>
    </>
    ) : (
        <EmployeeSignForm />
    )
  );
}

export default EmployeePortal;
