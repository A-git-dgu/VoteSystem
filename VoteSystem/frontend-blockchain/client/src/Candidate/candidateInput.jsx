import React, {useState, useEffect} from 'react';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';

import getSessionCookie, { isLogin } from '../Login/cookies';
import './candidate.css';
import Nav from '../Main/nav';
import axios from 'axios';

export default function CandidateInput() {

    let [elections, setElections] = useState([]);

    // 통신 메서드
    const searchApi = async()=> {
        const url = "http://localhost:8000/getElection";
        await axios.get(url)
        .then(function(response) {
            setElections(response.data);
            console.log("성공");
        })
        .catch(function(error) {
            console.log("실패");
        })

    };
    function showVoterInfo(){
        const url = "http://localhost:8000/getUserContent";
        axios.post(url,{
                id:getSessionCookie('id')
            }
        )
        .then(function(response) {
            if(response.status==400){
                alert('실패했습니다.')
            }
            else {
                if(response.data.approval_state==1){
                    alert('이미 승인된 후보자입니다.')
                }
                else{
                    document.getElementById("name").value=response.data.name
                    document.getElementById("fssn").value=response.data.ssn.substring(0,6)
                    document.getElementById("lssn").value=response.data.ssn.substring(7)
                    document.getElementById("phonenumber").value=response.data.phonenumber
                    document.getElementById("email").value=response.data.email
                }
            }
        })
        .catch(function(error) {
            alert('실패했습니다.')
            console.log(error);
        })
    }
    useEffect(()=>{
        isLogin( "Voter" );
        searchApi();
        showVoterInfo();
    }, [])
    console.log(elections)

    function insertApi(){
        const url = "http://localhost:8000/insertCandidate";
        console.log(document.getElementById('election').value)
        axios.put(url,{
                election_num: document.getElementById('election').value,
                candidate_ssn: document.getElementById('fssn').value+'-'+document.getElementById('lssn').value,
                email: document.getElementById('email').value,
                introduce_self: document.getElementById('introduce_self').value,
                election_pledge:document.getElementById('election_pledge').value,
                career: document.getElementById('career').value
            }
        )
        .then(function(response) {
            if(response.status==400){
                alert('후보자 등록에 실패했습니다.')
            }
            else {
                alert('후보자 등록이 완료되었습니다.')
                window.location.href="/mainVoter";
            }
        })
        .catch(function(error) {
            alert('실패했습니다.')
            console.log("실패");
        })
    };

    return (
        <>
            <Nav Type={"Voter"}/>
            <div id="outer_form_candidate">
                <div id="container_candidate">
                    <div><p id="title_candidate">후보자 등록</p></div>
                    <div id="form_border_candidate">
                        <div id="left_form_candidate">
                            <div className="each_form_candidate">
                                <div className="article_candidate">선거 선택</div>
                                <NativeSelect default="select_election" id="election" className="input_form_candidate">
                                    <option value={"select_election"}>-- 선거 선택 --</option>
                                        if(elections.length>0){
                                            elections.map((election) => (
                                    <option value={election.election_num}>{election.election_name}</option>
                                    ))
                                    }
                                </NativeSelect>
                            </div>
                            <div className="each_form_candidate">
                                <div className="article_candidate"> 이름 </div>
                                 <Input placeholder="내용을 입력하세요." id="name" className="input_form_candidate" disabled/>
                            </div>
                            <div className="each_form_candidate">
                                <div className="article_candidate"> 주민등록번호 </div>
                                 <Input className="ssn_candidate" placeholder="000000" id="fssn" disabled/>
                                - <Input className="ssn_candidate" type="password" placeholder="1234567" id="lssn" disabled/>
                            </div>
                            <div className="each_form_candidate">
                                <div className="article_candidate"> 전화번호 </div>
                                 <Input type="tel" placeholder="010-0000-0000" id="phonenumber" className="input_form_candidate" disabled/>
                            </div>
                            <div className="each_form_candidate">
                                <div className="article_candidate">이메일</div>
                                 <Input type="email" placeholder="dongguk@dgu.kr" id="email" className="input_form_candidate" disabled/>
                            </div>
                        </div>
                        <div id="middle_line_candidate"></div>
                        <div id="right_form_candidate">
                            <div className="each_form_candidate">
                                <div>
                                    소개 <TextField multiline maxRows={4} rows="5"
                                    placeholder="자유롭게 본인을 소개하세요."
                                    helperText="500자 이내로 작성하세요." id="introduce_self"
                                    fullWidth></TextField>
                                </div>
                            </div>
                            <div className="each_form_candidate">
                                이력 <TextField multiline maxRows={4} rows="5"
                                placeholder="예)20xx년~20xx년 학생회 집행부"
                                helperText="1000자 이내로 작성하세요." id="career"
                                fullWidth></TextField>
                            </div>
                            <div className="each_form_candidate">
                                공약 <TextField multiline maxRows={4} rows="5"
                                placeholder="본인의 공약을 자세히 작성하세요."
                                helperText="1000자 이내로 작성하세요." id="election_pledge"
                                fullWidth></TextField>
                            </div>
                        </div>

                        <div id="reg_button_candidate">
                            <button className="candidate_Button" id="requestCandidate" onClick={insertApi}>후보자 등록</button>
                                &nbsp;&nbsp;후보자 등록 정보는 "회원정보 수정"에서 수정 가능합니다.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}