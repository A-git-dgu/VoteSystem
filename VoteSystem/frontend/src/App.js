import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from './Main/main';

import HomePage from './HomePage/homePage';
import Login from './Login/login';
import SignupAdmin from './SignupAdmin/signupAdmin';
import SignupVoter from './SignupVoter/signupVoter';

import MainVoter from './MainVoter/mainVoter';

import CandidateInput from './Candidate/candidateInput';
import CandidateModify from './Candidate/candidateModify';

import PossibleVoters from './PossibleVoters/possibleVoters';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/loginVoter" element={<Login Type={"Voter"}/>} />
                <Route path="/loginAdmin" element={<Login Type={"Admin"}/>} />

                <Route path="/signupAdmin" element={<SignupAdmin/>} />
                <Route path="/signupVoter" element={<SignupVoter/>} />

                <Route path="/mainVoter" element={<MainVoter/>} />

                <Route path="/candidateInput" element={<CandidateInput/>} />
                <Route path="/candidateModify" element={<CandidateModify/>} />

                <Route path="/possibleVoters" element={<PossibleVoters/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
