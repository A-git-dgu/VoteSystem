import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Test from './test'
import Main from './Main/main';

import HomePage from './HomePage/homePage';
import LoginVoter from './Login/loginVoter';
import LoginManage from './Login/loginManage';

import CandidateInfo from './Candidate/candidate_info';
import AdminSignup from './Adminsignup/Adminsignup';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/loginVoter" element={<LoginVoter/>} />
                <Route path="/loginManage" element={<LoginManage/>} />
                <Route path="/adminSignup" element={<AdminSignup/>} />
                <Route path="/candidate_info" element={<CandidateInfo/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
