import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Test from './test'
import HomePage from './HomePage/HomePage';
import Main from './Main/Main';
import Login_Voter from './Login/Login_Voter';
import Login_Manage from './Login/Login_Manage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                 <Route path="/" element={<HomePage/>} />
                 <Route path="/loginVoter" element={<Login_Voter/>} />
                 <Route path="/loginManage" element={<Login_Manage/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
