import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ClientInvestorHome from './ClientInvestorHome';
import ClientEntreHome from './ClientEntreHome';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const clientRole = useSelector((state) => state.clientAuth.clientData?.clientRole);
  console.log(`ProtectedRoute - Client Role: ${clientRole}, Authenticated: ${isAuthenticated}`);

  if (!isAuthenticated) {
    console.log('ProtectedRoute: Redirecting to /login due to unauthenticated user');
    return <Navigate to="/login" replace />;
  }

  if (!clientRole || !allowedRoles.includes(clientRole)) {
    console.log(`ProtectedRoute: Redirecting to / due to invalid client role (${clientRole})`);
    return <Navigate to="/" replace />;
  }

  return children;
};

function ClientPortal() {
  const clientRole = useSelector((state) => state.clientAuth.clientData?.clientRole);

  return (
    <Routes>
      {/* Default route: Redirect based on clientRole */}
      <Route
        path="/"
        element={
          clientRole === 'Investor' ? (
            <Navigate to="investor" replace />
          ) : clientRole === 'Entrepreneur' ? (
            <Navigate to="entrepreneur" replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="investor"
        element={
          <ProtectedRoute allowedRoles={['Investor']}>
            <ClientInvestorHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="entrepreneur"
        element={
          <ProtectedRoute allowedRoles={['Entrepreneur']}>
            <ClientEntreHome />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default ClientPortal;