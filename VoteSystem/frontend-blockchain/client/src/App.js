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
import MainAdmin from './MainAdmin/mainAdmin';

import CandidateInput from './Candidate/candidateInput';
import CandidateModify from './Candidate/candidateModify';

import PossibleVoters from './PossibleVoters/possibleVoters';
import ElectionInfoForVoter from './Election/electionInfoForVoter';

import ViewCandidate from './ViewCandidate/viewCandidate';
import Vote from './Vote/vote';

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

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
                <Route path="/mainAdmin" element={<MainAdmin/>} />

                <Route path="/candidateInput" element={<CandidateInput/>} />
                <Route path="/candidateModify" element={<CandidateModify/>} />

                <Route path="/possibleVoters" element={<PossibleVoters/>} />
                <Route path="/electionInfoForVoter/:id" element={<ElectionInfoForVoter/>} />

                <Route path="/viewCandidate" element={<ViewCandidate/>} />
                <Route path="/vote/:electionNum" element={<Vote/>} />

            </Routes>
        </BrowserRouter>
    );
  }
}

export default App;
