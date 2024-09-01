import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ClientSignForm from './ClientSignForm';



function ClientPortal() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('authToken');
  console.log(isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/client-portal/ClientSignForm', { replace: true }); 
    }
  }, [isAuthenticated, navigate]);

  return (
    isAuthenticated ? (
      <>
      <Routes>
        {/* <Route path='/client-portal/investorHome' element={<investor>}  */}
      </Routes>
    </>
    ) : (       
        <ClientSignForm />
    )
  );
}

export default ClientPortal;
