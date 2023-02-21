import { React, useEffect } from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Login from './components/Login';
import Admin from './layout/admin';
import Dashboard from './components/Dashboard';
import { PrivateRoute } from './layout/PrivateRoute';

function App() {
  useEffect(() => {
    document.title = 'Certifi.ly';
  }, []);

  return (
    <div className="App dashboard-light-bg">
      <Routes >
        <Route path="/login" element={ <Login /> } />
        <Route path="/" element={ 
          <PrivateRoute> 
            <Admin subElement={ <Dashboard /> } /> 
          </PrivateRoute> 
        } />
      </Routes>
    </div>
  );
}

export default App;
