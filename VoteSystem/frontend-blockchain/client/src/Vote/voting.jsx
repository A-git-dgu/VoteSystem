import React, { Component } from "react";
import getWeb3 from "../getWeb3";
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import getSessionCookie from '../Login/cookies';
import axios from 'axios';

class Voting extends Component {
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
            //alert(
            //  `Failed to load web3, accounts, or contract. Check console for details.`,
            //);
            console.error(error);
        }
    };

    runExample = async () => {
        const { accounts, contract } = this.state;
        let name = window.location.pathname.split('/')[2]+";"+window.location.pathname.split('/')[3];
        console.log(this.state.contract)
        await contract.methods.voting(name).send({ from: accounts[0], gas:900000 }).then( async () =>{
            const url = "http://localhost:8000/changeVotingStatus";
            await axios.put(url,{
                election_num:window.location.pathname.split('/')[2],
                user_id:getSessionCookie('id')
            })
            .then(function(response) {
                alert('투표가 완료되었습니다.')
                window.location.href = "/mainVoter"
            })
            .catch(function(error) {
                console.log("실패");
            })}
        );
        //let response = await contract.methods.countBallot(name).call();
        //console.log(response)
        //this.setState({ storageValue: response });
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

export default Voting;
