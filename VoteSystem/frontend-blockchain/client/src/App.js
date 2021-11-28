import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Election from "./contracts/Election.json";
import getWeb3 from "./getWeb3";

import Main from './Main/main';

import HomePage from './HomePage/homePage';
import Login from './Login/login';
import SignupAdmin from './SignupAdmin/signupAdmin';
import SignupVoter from './SignupVoter/signupVoter';

import MainVoter from './MainVoter/mainVoter';
import VoterModify from './MainVoter/voterModify';
import MainAdmin from './MainAdmin/mainAdmin';

import CandidateInput from './Candidate/candidateInput';
import CandidateModify from './Candidate/candidateModify';

import PossibleVoters from './PossibleVoters/possibleVoters';
import ElectionInfoForVoter from './Election/electionInfoForVoter';

import ViewCandidate from './ViewCandidate/viewCandidate';
import Vote from './Vote/vote';
import Voting from './Vote/voting';
import BallotCount from './MainAdmin/ballotCount';
import ElectionResult from './ElectionResult/electionResult';

import "./App.css";

class App extends Component {
  render() {
//    if (!this.state.web3) {
//      return <div>Loading Web3, accounts, and contract...</div>;
//    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/loginVoter" element={<Login Type={"Voter"}/>} />
                <Route path="/loginAdmin" element={<Login Type={"Admin"}/>} />

                <Route path="/signupAdmin" element={<SignupAdmin/>} />
                <Route path="/signupVoter" element={<SignupVoter/>} />

                <Route path="/mainVoter" element={<MainVoter/>} />
                <Route path="/voterModify" element={<VoterModify/>}/>
                <Route path="/mainAdmin" element={<MainAdmin/>} />

                <Route path="/candidateInput" element={<CandidateInput/>} />
                <Route path="/candidateModify" element={<CandidateModify/>} />

                <Route path="/possibleVoters" element={<PossibleVoters/>} />
                <Route path="/electionInfoForVoter/:id" element={<ElectionInfoForVoter/>} />

                <Route path="/viewCandidate/:electionNum/:candidateId" element={<ViewCandidate/>} />
                <Route path="/vote/:electionNum" element={<Vote/>} />
                <Route path="/voting/:electionNum/:candidateId" element={<Voting/>} />
                <Route path="/ballotCount/:electionNum" element={<BallotCount/>} />
                <Route path="/electionResultVoter/:electionNum" element={<ElectionResult Type={"Voter"}/>} />
                <Route path="/electionResultAdmin/:electionNum" element={<ElectionResult Type={"Admin"}/>} />

            </Routes>
        </BrowserRouter>
    );
  }
}

export default App;
