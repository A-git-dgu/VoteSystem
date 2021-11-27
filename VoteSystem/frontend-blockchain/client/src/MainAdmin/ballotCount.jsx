import React, { useState, Component } from "react";
import getWeb3 from "../getWeb3";
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import getSessionCookie from '../Login/cookies';
import axios from 'axios';

class BallotCount extends Component {
    state = { storageValue: 0, web3: null, accounts: null, contract: null, Cname:null };

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
            //alert(
            //  `Failed to load web3, accounts, or contract. Check console for details.`,
            //);
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
        .then(function(response) {
            console.log(response.data);
            let candidates_count = response.data.split(';')[0];

            for (let i=1; i<=candidates_count; i++) {
                let name = window.location.pathname.split('/')[2]+";"+response.data.split(';')[i];
                this.setState({Cname:name})
                console.log(this.state.Cname);
                //let result = await contract.methods.countBallot(name).call()
                //.then(async(result) =>{
                //console.log(result)
                //})
                //.catch(function(error) {
                //    console.log("실패");
                //})
                //this.setState({ storageValue: result });
            }

        })
        .catch(function(error) {
            console.log("실패 : " + error);
        })

//        const { accounts, contract } = this.state;
//        let name = window.location.pathname.split('/')[2]+";"+window.location.pathname.split('/')[3];
//        console.log(this.state.contract)
//        let response = await contract.methods.countBallot(name).call();
//        console.log(response)
//        this.setState({ storageValue: response });
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
            console.log(this.candidates);
        })
        .catch(function(error) {
            console.log("실패");
        })
    };

    render() {
        console.log(this.state)

        if (!this.state.web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
        }
        return (
            <>
                <h1>{this.state.storageValue}</h1>
            </>
        );
    }
}

export default BallotCount;
