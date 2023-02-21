import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/css/style.css';
import 'font-awesome/css/font-awesome.min.css';
import * as mdb from 'mdb-ui-kit'; // lib
import { BrowserRouter } from 'react-router-dom';
import { Provider} from 'react-redux';
import {store} from './store';
// import { Input } from 'mdb-ui-kit'; // module

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
