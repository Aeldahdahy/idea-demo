import React from 'react';
import { HashRouter as Router } from 'react-router-dom'; //BrowserRouter HashRouter
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
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
