import React, {useState, useEffect} from 'react';
import getSessionCookie, { isLogin } from '../Login/cookies';
import { PieChart } from 'react-minimal-pie-chart';

import Nav from '../Main/nav';
import axios from 'axios';
import crownImg from './crown.png';
import './electionResult.css';

export default function ElectionResult() {

    let [electionResult, setElectionResult] = useState([]);
    let [candidateResult, setCandidateResult] = useState([]);

    // 통신 메서드
    const searchApi = async()=> {
        const url = "http://localhost:8000/getElectionResult";
        await axios.post(url, {
            election_num: '1'
        })
        .then(function(response) {
            setElectionResult(response.data);
            setCandidateResult(response.data.candidateResults)
            console.log(response.data);
            console.log("성공");
        })
        .catch(function(error) {
            console.log("실패");
        })
    };

    useEffect(()=>{
        isLogin( "Voter" )
        searchApi();
    }, [])
    function checkWinner(name) {
        if (name == electionResult.winner_name) {
            return true;
        }
        else
            return false;
    }

    const color = { 1: "#F7819F", 2: "#0174DF",
                    3: "#FA5858", 4: "#3ADF00",
                    5: "#00FF40", 6: "#088A08",
                    7: "#FE2E9A", 8: "#B45F04" }
    var colorIdx = 0
    return (
        <>
            <Nav Type={"Voter"}/>

            <div id="outer_form_result">
                <div id="container_result">
                    <div><p id="title_result">선거 결과 확인</p></div>
                    <div className="form_border_result_full">
                        <div><p id="sub_title_result">선거 이름 : {electionResult.election_name}</p></div>
                        <div id="left_form_result">
                            <div className="print_winner">
                                <div id="article_result_title">
                                    <img class="crown_image" src={crownImg} />
                                </div>
                                <div id="article_result_content">
                                    <div id="big_print_winner">당선자 : {electionResult.winner_name}</div>
                                </div>
                            </div>
                            <div className="show_percentage">
                                <div id="pie_chart">
                                    <PieChart
                                        data={candidateResult.map((result) => (
                                            {'title': result.candidate_name,
                                            'value': result.polling_rate,
                                            'color': color[(++colorIdx)%8] }
                                        ))}
                                        label={ (data) => data.dataEntry.title+data.dataEntry.value+'%' }
                                        labelStyle= { {
                                            fontSize:"6px",
                                            fontWeight: "bold",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div id="right_form_result">
                            <div id="right_form_result_top">
                                <div className="each_form_result">
                                    <div className="article_result_title">유권자 수 : &nbsp;<b>{electionResult.countPossibleVoter}</b></div>
                                </div>
                                <div className="each_form_result">
                                    <div className="article_result_title">투표율 : &nbsp;<b>{electionResult.voting_rate}%</b></div>
                                </div>
                            </div>
                            <div id="right_form_result_bottom">
                                <p className="sub_title_each_result">[ 득표율 ]</p>
                                <div className="form_border_result">
                                    {candidateResult.map((candidate) => (
                                        checkWinner(candidate.candidate_name) ?
                                            <div className="winner_sub_content">기호 {electionResult.winner_number_of_candidate}번 {electionResult.winner_name} : {electionResult.winner_polling_rate}%</div>
                                            :
                                            <div className="sub_content">기호 {candidate.NumberOfCandidate}번 {candidate.candidate_name} : {candidate.polling_rate}%</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}