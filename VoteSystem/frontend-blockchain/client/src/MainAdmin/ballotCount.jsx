import React, { useState, Component } from "react";
import getWeb3 from "../getWeb3";
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import getSessionCookie from '../Login/cookies';
import axios from 'axios';

import '../Vote/vote.css';

class BallotCount extends Component {
    state = { storageValue: 0, web3: null, accounts: null, contract: null };

    componentDidMount = async () => {
        console.log("componentDidMount");
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
            console.error(error);
        }
    };

    runExample = async () => {
        const { accounts, contract } = this.state;
        console.log(this.state.contract);

        const url = "http://localhost:8000/getElectionCandidates";
        await axios.post(url,{
            election_num:window.location.pathname.split('/')[2]
        })
        .then(async(response) => {
            let candidates_info = response.data;
            console.log(candidates_info);
            let candidates_count = candidates_info.split(';')[0];

            for (let i=1; i<=candidates_count; i++) {
                let name = window.location.pathname.split('/')[2]+";"+candidates_info.split(';')[i];
                console.log(name)
                await contract.methods.countBallot(name).call()
                .then(async(r) => {
                    const url2 = "http://localhost:8000/setCandidateResult";
                    await axios.put(url2, {
                        election_num:window.location.pathname.split('/')[2],
                        candidate_id:candidates_info.split(';')[i],
                        number_votes:r
                    })
                    .then(function(response) {
                        if (response.status==400) {
                            alert("개표를 실패하였습니다.");
                            window.location.href = "/mainAdmin";
                        }
                        console.log(r);
                    })
                    .catch(function(error) {
                        alert("개표를 실패하였습니다.");
                        window.location.href = "/mainAdmin";
                    })
                })
                .catch(function(error) {
                    alert("개표 실패하였습니다.");
                    window.location.href = "/mainAdmin";
                })
            }

            const url3 = "http://localhost:8000/setElectionResult";
            await axios.put(url3, {
                election_num:window.location.pathname.split('/')[2]
            })
            .then(function(response) {
                if (response.status==400) {
                    alert("개표를 실패하였습니다.");
                    window.location.href = "/mainAdmin";
                }
            })
            .catch(function(error) {
                alert("개표를 실패하였습니다.");
                window.location.href = "/mainAdmin";
            })
            alert("개표가 완료되었습니다.");
            window.location.href = "/electionResultAdmin/"+window.location.pathname.split('/')[2];
        })
        .catch(function(error) {})
    };

    findCandidates = async() => {
        console.log("findCandidates");
        console.log(window.location.pathname.split('/')[2]);
        const url = "http://localhost:8000/getElectionCandidates";
        await axios.post(url,{
            election_num:window.location.pathname.split('/')[2]
        })
        .then(function(response) {
            this.candidates = response.data;
        })
        .catch(function(error) {})
    };

    render() {
        console.log(this.state)

        if (!this.state.web3) {
            return <div>개표 중입니다...</div>;
        }
        return (
            <>
                <div id="voteMessage">개표 중입니다...</div>
            </>
        );
    }
}

export default BallotCount;
