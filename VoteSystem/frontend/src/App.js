import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from './Main/main';

import HomePage from './HomePage/homePage';
import LoginVoter from './Login/loginVoter';
import LoginManage from './Login/loginManage';

import CandidateInput from './Candidate/candidateInput';
import AdminSignup from './AdminSignup/AdminSignup';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/loginVoter" element={<LoginVoter/>} />
                <Route path="/loginManage" element={<LoginManage/>} />
                <Route path="/adminSignup" element={<AdminSignup/>} />
                <Route path="/candidateInput" element={<CandidateInput/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
