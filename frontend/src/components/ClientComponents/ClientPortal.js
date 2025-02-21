import React from 'react';
import { Route, Routes } from 'react-router-dom';

function ClientPortal() {
  return (
    <Routes>
      <Route path="" element={<h1>Welcome to Client Portal</h1>} />
    </Routes>
  );
}

export default ClientPortal;
