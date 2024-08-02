import React from 'react';
import { HashRouter as Router } from 'react-router-dom'; //BrowserRouter HashRouter
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppContent from './AppContent';






function App() {
  return (
    <Router>
     <AppContent />
    </Router>
  );
}

export default App;
