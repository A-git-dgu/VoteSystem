import React, {useState, useEffect} from 'react';
import styles from './vote.css';
import Nav from '../Main/nav';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import getSessionCookie, {isLogin} from '../Login/cookies';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function Vote() {
    const { electionNum } = useParams();
    let [election, setElection] = useState();
    let [candidates, setCandidates] = useState([]);
    let [radioValue, setRadioValue] = useState("");
    const state = { web3: null, accounts: null, contract: null, electionNum: null }
    // 선거 이름 불러오기
    const getElectionName = async() => {
        const url = "http://localhost:8000/getElectionName";
        await axios.post(url,{
            election_num:electionNum
        })
        .then(function(response) {
            setElection(response.data);
            console.log("성공");
        })
        .catch(function(error) {
            console.log("실패");
        })
    };

    // 후보자 명단 불러오기
    const getVoteCandidate = async() => {
        const url = "http://localhost:8000/getVoteCandidate";
        await axios.post(url,{
            election_num:electionNum
        })
        .then(function(response) {
            setCandidates(response.data);
            console.log("성공");
        })
        .catch(function(error) {
            console.log("실패");
        })
    };

    React.useEffect(()=>{
        isLogin("Voter");
        getElectionName();
        getVoteCandidate();
    },[])

    const handleRadioChange = (event) => {
        setRadioValue(event.target.value);
        console.log(event.target.value);
    }

    function vote() {
        if (radioValue=="") { alert("투표할 항목을 선택해주세요."); return; }
        else {
            window.location.href="/voting/"+electionNum+"/"+radioValue
        }
        console.log(electionNum);
        console.log(radioValue);
        console.log(getSessionCookie('id'));
    }

    return (
        <>
            <Nav Type={"Voter"}/>
            <div id="outer_form_vote">
            <div id="container_vote">

            <div><p id="title_vote">{election}</p></div>
                <div id="form_border_vote">
                    <div id="showCandidate_vote">
                        <FormControl component="fieldset">
                        <RadioGroup aria-label="vote" name="controlled-radio-buttons-group" value={radioValue} onChange={handleRadioChange}>
                            { candidates.length > 1 &&
                            candidates.map(candidate => (
                                <div className="eachCandidate_vote">
                                    <p className="textCandidate_vote">■ &nbsp;&nbsp; 기호 {candidate.approval_state}번. {candidate.candidate_name}</p>
                                    <div className="radioCandidate">
                                        <FormControlLabel value={candidate.candidate_id} control={<Radio />} label=""/>
                                    </div>
                                </div>
                            ))}
                            { candidates.length == 1 &&
                            candidates.map(candidate => (
                                <div className="eachCandidate_vote">
                                    <p className="textCandidate_vote">■ &nbsp;&nbsp; 기호 {candidate.approval_state}번. {candidate.candidate_name}</p>
                                    <div className="radioCandidate">
                                        <FormControlLabel value="TRUE" control={<Radio />} label="찬성" labelPlacement="bottom"/>
                                        <FormControlLabel value="FALSE" control={<Radio />} label="반대" labelPlacement="bottom"/>
                                    </div>
                                </div>
                            ))
                            }
                            { candidates.length == 0 && <p className="textCandidate_vote">등록된 후보자가 없습니다.</p> }
                        </RadioGroup>
                        </FormControl>
                    </div>
                    <div id="bottom_vote">
                        <button className="votePage_Button" id="vote_button_vote" onClick={vote}>투표</button>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}
