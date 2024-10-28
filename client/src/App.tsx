import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SubmitForm from './components/ticketForm';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/ticket" element={<SubmitForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
