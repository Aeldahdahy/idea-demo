import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ClientInvestorHome from './ClientInvestorHome';
import ClientEntreHome from './ClientEntreHome';

function ClientPortal() {
  const role = useSelector((state) => state.auth.role);


  return (
    <Routes>
      <Route
        path="/"
        element={role === "Investor" ? <ClientInvestorHome /> : <ClientEntreHome />}
      />
    </Routes>
  );
}

export default ClientPortal;