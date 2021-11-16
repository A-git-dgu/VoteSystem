import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from './Main/main';

import HomePage from './HomePage/homePage';
import Login from './Login/login';

import CandidateInput from './Candidate/candidateInput';
import CandidateModify from './Candidate/candidateModify';

import AdminSignup from './AdminSignup/AdminSignup';
import SignupVoter from './SignupVoter/signupVoter';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/loginVoter" element={<Login Type={"Voter"}/>} />
                <Route path="/loginManage" element={<Login Type={"Admin"}/>} />

                <Route path="/adminSignup" element={<AdminSignup/>} />
                <Route path="/signupVoter" element={<SignupVoter/>} />

                <Route path="/candidateInput" element={<CandidateInput/>} />
                <Route path="/candidateModify" element={<CandidateModify/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
