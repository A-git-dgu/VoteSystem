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

//     const pieData = electionResult.map((result)) => (
//         return {'title': result.candidate_name, 'value': result.voti, 'color': }
//     )

    return (
        <>
            <Nav Type={"Voter"}/>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.bundle.min.js"></script>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.css" />

            <div id="outer_form_result">
                <div id="container_result">
                    <div><p id="title_result">선거 결과 확인</p></div>
                    <div className="form_border_result">
                        <div><p id="sub_title_result">선거 이름 : {electionResult.election_name}</p></div>
                        <div id="left_form_result">
                            <div className="print_winner">
                                <div id="article_result_title">
                                    <img class="crown_image" src={crownImg} />
                                </div>
                                <div id="article_result_content">
                                    <div id="big_print_winner">당선자 : {/* 당선자 이름 */}</div>
                                </div>
                            </div>
                            <div className="show_percentage">
                                <div id="pie_chart">
{/*                                     <PieChart */}
{/*                                         data={[ */}
{/*                                             { title: 'One', value: 10, color: '#00FFFF' }, */}
{/*                                             { title: 'Two', value: 15, color: '#FFBF00' }, */}
{/*                                             { title: 'Three', value: 20, color: '#FFFF00' }, */}
{/*                                         ]} */}
{/*                                         animate={[true]} */}
{/*                                     /> */}
{/*                                     <PieChart data={pieData}/> */}
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
                                <p className="winner_sub_content">홍길동{}</p>
                                <p className="sub_content">이기호{/* 기호 1번 */}</p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
}