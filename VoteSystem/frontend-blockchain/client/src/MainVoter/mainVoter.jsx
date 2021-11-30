import React, {useState, useEffect} from 'react';
import styles_test from './mainVoter.css';
import CandiAppliImg from '../Img/candiAppli.png';
import Nav from '../Main/nav';

import axios from 'axios';
import { Link } from 'react-router-dom';
import getSessionCookie, {isLogin} from '../Login/cookies';

export default function MainVoter({match}) {
    let [elections, setElections] = useState([]);

    // user의 선거 불러오기
    const getUserElection = async() => {
        const url = "http://localhost:8000/getUserElection";
        await axios.post(url,{
            id:getSessionCookie('id')
        })
        .then(function(response) {
            setElections(response.data);
            console.log("성공");
        })
        .catch(function(error) {
            console.log("실패");
        })
    };

    useEffect(()=>{
        isLogin("Voter");
        getUserElection();
    },[])

    return (
        <>
            <Nav Type={"Voter"}/>

            <div id="outer_form_mainVoter">
            <div id="container_mainVoter">
            <div id="title2"><p id="title_mainVoter">투표 가능한 선거리스트</p></div>
                <div id="form_border_mainVoter">
                    {elections.map(election => (
                        <div className="eachElection_mainVoter">
                            <Link to={"/electionInfoForVoter/"+election.election_num} style={{textDecoration: 'none'}}>
                                <div className="showElection_mainVoter">
                                    <div className="Count_mainVoter">{election.index}.</div>
                                    <div className="electionName_mainVoter">{election.election_name}</div>
                                    <div className="electionPeriod_mainVoter">선거 기간 : {election.start_date} ~ {election.end_date}</div>
                                </div>
                            </Link>
                            {election.election_status=="0" && <Link to={'/electionResultVoter/'+election.election_num}><button className="mainVoterPage_Button" id="showResult_mainVoter">결과보기</button></Link>}
                            {election.election_status=="1" && election.voting_status=="0" && <Link to={'/vote/'+election.election_num}><button className="mainVoterPage_Button" id="voteButton_mainVoter">투표하기</button></Link>}
                            {election.election_status=="1" && election.voting_status=="1" && <button className="mainVoterPage_Button" id="complete_mainVoter">투표완료</button>}
                        </div>
                    ))}
                    {elections.length==0 && <div id="notFoundElection">투표 가능한 선거가 없습니다.</div>}
                </div>
                <div id="bottom_mainVoter">
                    <img src={CandiAppliImg} id="candiAppli_img_mainVoter"/>
                    <Link to='/candidateInput'><button className="mainVoterPage_Button" id="candiAppli_button_mainVoter">후보자 신청하기</button></Link>
                </div>
            </div>
            </div>
        </>
    );
}