import React from 'react';
import { HashRouter as Router } from 'react-router-dom'; //BrowserRouter HashRouter
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Main from './Main';


function App() {
  return (
    <>
      <Router>
        <Main />
      </Router>
    </>
  );
}

export default App;
