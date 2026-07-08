import { useState } from 'react'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UI from './UI.jsx';
import Loogin from './Loogin.jsx';
import ForgotPassword from './Forgot-password.jsx';
import Signup from './Signup.jsx';


// Inside your <Routes> structure:


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home/Landing Page */}
        <Route path="/" element={<UI />} />
        
        {/* Login Page */}
        <Route path="/loogin" element={<Loogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<Signup />} />
        


      </Routes>
    </BrowserRouter>
  );
}

export default App;