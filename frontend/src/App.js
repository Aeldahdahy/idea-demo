import React from 'react';
import { HashRouter as Router } from 'react-router-dom'; //BrowserRouter HashRouter
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Main from './Main';
import { ToastContainer } from 'react-bootstrap';
import "react-toastify/ReactToastify.css";





function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Main />
      </Router>
    </>
  );
}

export default App;
