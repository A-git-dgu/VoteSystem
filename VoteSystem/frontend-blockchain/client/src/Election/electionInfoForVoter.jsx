import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import getSessionCookie, { isLogin } from '../Login/cookies';

import Nav from '../Main/nav';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './electionInfoForVoter.css';

export default function ElectionInfoForVoter({match}) {
    let [electionInfoForUser, setElectionInfoForUser] = useState([]);
    let [candidateInfoForUser, setCandidateInfoForUser] = useState([]);
    const { id } = useParams();

    // 통신 메서드
    const searchApi = async()=> {
        const url = "http://localhost:8000/getElectionInfoForUser?election_num="+id;
        await axios.get(url)
        .then(function(response) {
            setElectionInfoForUser(response.data);
            setCandidateInfoForUser(response.data.candidates);
            console.log("성공");
        })
        .catch(function(error) {
            console.log("실패");
        })
    };

    useEffect(()=>{
        isLogin( "Voter" );
        searchApi();
    }, [])

    function electionType(elec_type) {
        if (elec_type==0) {
            return "찬반 투표";
        }
        else { return "후보자 투표"}
    }

    return (
        <>
            <Nav Type={"Voter"}/>

            <div id="outer_form_election4user">
                <div id="container_election4user">
                    <div><p id="title_election4user">선거 정보</p></div>

                    <div className="form_border_election4user">
                        <div className="left_form_election4user">
                            <div className="each_form_election4user">
                                <div className="article_election4user">선거 이름 :</div>
                                <div className="article_print_election4user" id="election_name">
                                {electionInfoForUser.election_name}</div>
                            </div>
                            <div className="each_form_election4user">
                                <div className="article_election4user">선거 종류 : </div>
                                <div className="article_print_election4user" id="election_type">
                                    {electionType(electionInfoForUser.election_type)}
                                </div>
                            </div>
                            <div className="each_form_election4user">
                                <div className="article_election4user">후보자 등록&nbsp;&nbsp; 기간 : </div>
                                <div className="article_print_election4user" id="reg_candidate_period">
                                {electionInfoForUser.enroll_start} ~ {electionInfoForUser.enroll_end}</div>
                            </div>
                            <div className="each_form_election4user">
                                <div className="article_election4user">선거 기간 : </div>
                                <div className="article_print_election4user" id="election_period">
                                {electionInfoForUser.start_date} ~ {electionInfoForUser.end_date}</div>
                            </div>
                        </div>
                        <div className="middle_line_election4user"></div>
                        <div className="right_form_election4user">
                            <div className="each_form_election4user">
                                <div className="article_election4user">소속 기관 : </div>
                                <div className="article_print_election4user" id="institution">
                                {electionInfoForUser.institution}</div>
                            </div>
                            <div className="each_form_election4user">
                                <div className="article_election4user">관리자명 : </div>
                                <div className="article_print_election4user" id="admin_name">
                                {electionInfoForUser.admin_name}</div>
                            </div>
                            <div className="each_form_election4user">
                                <div className="article_election4user">관리자 email : </div>
                                <div className="article_print_election4user" id="admin_email">
                                {electionInfoForUser.admin_email}</div>
                            </div>
                        </div>
                    </div>
                    <div><p id="title_election4user">후보자 정보</p></div>

                    {/* 만약 등록된 후보자가 없을 경우 "등록된 후보자가 없습니다" 출력 */ }
                    {
                        candidateInfoForUser.length === 0 &&
                        <div className="form_border_election4user">
                            <center><div style={{color:'gray'}}>
                                등록된 후보자가 없습니다.
                            </div></center>
                        </div>
                    }

                    { candidateInfoForUser.map((candidate) => (
                    <div className="form_border_election4user">
                        <div className="left_form_election4user">
                            <div className="each_form_election4user">
                                <div className="article_election4user_bottom_up">이름 : {candidate.candidate_name}</div>
                                <div className="article_print_election4user_bottom_up" id="candidate_name">
                            </div>
                        </div>
                        <div className="each_form_election4user">
                            <div className="article_election4user_bottom_up">email : {candidate.candidate_email}</div>
                            <div className="article_print_election4user_bottom_up" id="candidate_email">
                            {electionInfoForUser.candidate_email}</div>
                        </div>
                        <div className="each_form_election4user">
                            <div className="article_election4user_bottom">소개 :</div>
                            <div><p className="print_form" id="self_introduce">
                            {candidate.introduce_self}</p></div>
                        </div>
                    </div>
                    <div className="middle_line_election4user"></div>
                    <div className="right_form_election4user">
                        <div className="each_form_election4user_bottom">
                            <div className="article_election4user_bottom">이력 : </div>
                            <div><p className="print_form" id="career">{candidate.career}</p></div>
                        </div>
                        <div className="each_form_election4user_bottom">
                             <div className="article_election4user_bottom">공약 : </div>
                             <div><p className="print_form" id="election_pledge">{candidate.election_pledge}</p></div>
                        </div>
                    </div>
                </div>
                ))
                }

                </div>
            </div>
            <Link to={'/vote/'+id}><button id="vote_button" className="election4user_Button">투표하기</button></Link>
        </>
    );
}

