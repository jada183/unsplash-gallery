import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
axios.interceptors.request.use(
  (request) => {
    request.headers['Accept-Version'] = 'v1';
    request.headers['Authorization'] = 'Client-ID 3pBVO1EmJlDmFTAH3VECukfrfAD_C6nPrVquHhxzOz8';
    return request
  }
)
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
