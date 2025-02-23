import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import JobCreationForm from './components/PostJobs/JobCreationForm';
import reportWebVitals from './reportWebVitals';
import Dashboard from './components/PostJobs/Dashboard'
import FormBuilder from './components/PostJobs/FormBuilder/FormBuilder';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create" element={<JobCreationForm />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/test" element={<FormBuilder />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
