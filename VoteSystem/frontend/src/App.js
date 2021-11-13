import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Test from './test'
import Main from './Main/Main';

import HomePage from './HomePage/HomePage';
import Login_Voter from './Login/Login_Voter';
import Login_Manage from './Login/Login_Manage';

import Candidate_Info from './Candidate/candidate_info';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                 <Route path="/" element={<HomePage/>} />
                 <Route path="/loginVoter" element={<Login_Voter/>} />
                 <Route path="/loginManage" element={<Login_Manage/>} />

                 <Route path="/candidate_info" element={<Candidate_Info/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
