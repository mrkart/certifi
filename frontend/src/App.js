import { React, useEffect } from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Login from './components/Login';
import Admin from './layout/admin';
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import StudentsImport  from './components/Students_Import';
import CertificateTemplate  from './components/Certificate_Template';
import CertificateTemplateCustomize  from './components/Certificate_Template_Customize';
import Issue_Certificate from './components/Issue_Certificate';
import PageNotFound from './components/PageNotFound';
import Signer from './components/Signer';
import { PrivateRoute } from './layout/PrivateRoute';
import StudentsAdd from './components/Students_Add';
import StudentsEdit from './components/Students_Edit';
import StudentLayout from './layout/studentslayout';
import StudentDashboard from './components/StudentDashboard';
import ClaimFlowAccount from './components/Claim_Flow_Account';
import StudentsAddEmail from './components/Students_Add_Email';
import CreateApiToken from './components/Create_Api_Token';
import CertificateVerification from './components/Certificate_Verification';

function App() {
  useEffect(() => {
    document.title = 'Certifi.ly';
  }, []);

  return (
    <div className="App h-100">
      <Routes >
        <Route path="/login" element={ <Login /> } />
        <Route path="/verify" element={ <CertificateVerification/> } />
        <Route path="/verify/:certificateNumber" element={ <CertificateVerification/> } />
        <Route path="/" element={ 
          <PrivateRoute> 
            <Admin subElement={ <Dashboard /> } /> 
          </PrivateRoute> 
        } />
        <Route path="/students" element={ 
          <PrivateRoute>
            <Admin subElement={ <Students /> }  /> 
          </PrivateRoute> 
        } />
        <Route path="/add-student" element={ 
          <PrivateRoute>
            <Admin subElement={ <StudentsAdd /> }  /> 
          </PrivateRoute> 
        } />
        <Route path="/edit-student/:studentId" element={ 
          <PrivateRoute>
            <Admin subElement={ <StudentsEdit /> }  /> 
          </PrivateRoute> 
        } />
        <Route path="/students-import" element={ 
          <PrivateRoute>
            <Admin subElement={ <StudentsImport /> } /> 
          </PrivateRoute>
        } />
        <Route path="/select-template" element={ 
          <PrivateRoute>
            <Admin subElement={ <CertificateTemplate /> } /> 
          </PrivateRoute>
        } />
        <Route path="/customize-template" element={ 
          <PrivateRoute>
            <Admin  subElement={ <CertificateTemplateCustomize /> } /> 
          </PrivateRoute>
        } />
        <Route path="/mint-certificate" element={ 
          <PrivateRoute>
            <Admin  subElement={ <Issue_Certificate /> } /> 
          </PrivateRoute>
        } />
        <Route path="/signer" element={ 
          <PrivateRoute>
            <Admin  subElement={ <Signer /> } /> 
          </PrivateRoute>
        } />
        <Route path="/create-token" element={ 
          <PrivateRoute>
            <Admin  subElement={ <CreateApiToken /> } /> 
          </PrivateRoute>
        } />
        <Route path="/dashboard" element={ 
          <PrivateRoute>
            <StudentLayout  subElement={ <StudentDashboard /> } /> 
          </PrivateRoute>
        } />
        <Route path="/claim-flow-account" element={ 
          <PrivateRoute>
            <StudentLayout  subElement={ <ClaimFlowAccount /> } /> 
          </PrivateRoute>
        } />
        <Route path="/add-email" element={ 
          <PrivateRoute>
            <StudentLayout  subElement={ <StudentsAddEmail /> } /> 
          </PrivateRoute>
        } />
        <Route path="*" element={ 
          <PrivateRoute>
            <Admin  subElement={ <PageNotFound /> } /> 
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
