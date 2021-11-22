import React, {useState, useEffect} from 'react';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import getSessionCookie, { isLogin } from '../Login/cookies';

import './candidate.css';
import Nav from '../Main/nav';
import axios from 'axios';

export default function CandidateInput() {

    let [candidate_elections, setCandidateElections] = useState([]);

    // 통신 메서드
    const searchApi = async()=> {
        const url = "http://localhost:8000/getCandidate";
        await axios.post(url, {'candidate_ssn': '991115-2000000'})
        .then(function(response) {
            setCandidateElections(response.data);
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

    function showCandidateInfo(){
        const url = "http://localhost:8000/getCandidateContent";
        axios.post(url,{
                'candidate_ssn':'001224-4000000',
                'election_num':document.getElementById('election').value
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
                    document.getElementById("fssn").value=response.data.candidate_ssn.substring(0,6)
                    document.getElementById("lssn").value=response.data.candidate_ssn.substring(7)
                    document.getElementById("phonenumber").value=response.data.phonenumber
                    document.getElementById("email").value=response.data.candidate_email
                    document.getElementById("address").value=response.data.address
                    document.getElementById("introduceself").value=response.data.introduce_self
                    document.getElementById("career").value=response.data.career
                    document.getElementById("electionpledge").value=response.data.election_pledge
                }
            }
        })
        .catch(function(error) {
            alert('실패했습니다.')
            console.log("실패");
        })
    }

    function updateCandidateContent(){
        const url = "http://localhost:8000/updateCandidateContent";
        axios.put(url, {
            'candidate_ssn':'001224-4000000',
            'election_num':document.getElementById('election').value,
            'introduceself': document.getElementById("introduceself").value,
            'career': document.getElementById("career").value,
            'electionpledge': document.getElementById("electionpledge").value
        })
        .then(function(response){
            if(response.status=200){
                alert("수정이 완료되었습니다.")
            }
            else{
                alert("실패했습니다.")
            }
        })
    }

    return (
        <>
            <Nav Type={"Voter"}/>
            <div id="outer_form_candidate">
                <div id="container_candidate">
                    <div><p id="title_candidate">후보자 등록 정보 수정</p></div>
                    <div id="form_border_candidate">
                        <div id="left_form_candidate">
                            <div className="each_form_candidate">
                                <div className="article_candidate">선거 선택</div>
                                    <NativeSelect default="select_election" id="election" className="input_form_candidate" onChange={showCandidateInfo}>
                                        <option value={"select_election"}>-- 선거 선택 --</option>
                                            if(candidate_elections.length>0){
                                                candidate_elections.map((candidate_election) => (
                                        <option value={candidate_election.election_num}>{candidate_election.name}</option>
                                            ))
                                        }
                                    </NativeSelect>
                                </div>
                                <div className="each_form_candidate">
                                    <div className="article_candidate"> 이름 </div>
                                        <Input disabled placeholder="내용을 입력하세요." id="name" className="input_form_candidate"/>
                                </div>
                                <div className="each_form_candidate">
                                    <div className="article_candidate"> 주민등록번호 </div>
                                    <Input disabled className="ssn_candidate" placeholder="000000" id="fssn"/>
                                    - <Input disabled className="ssn_candidate" type="password" placeholder="1234567" id="lssn"/>
                                </div>
                                <div className="each_form_candidate">
                                    <div className="article_candidate"> 전화번호 </div>
                                    <Input disabled type="tel" placeholder="010-0000-0000" id="phonenumber" className="input_form_candidate"/>
                                </div>
                                <div className="each_form_candidate">
                                    <div className="article_candidate">이메일</div>
                                    <Input disabled type="email" placeholder="dongguk@dgu.kr" id="email" className="input_form_candidate"/>
                                </div>
                                <div className="each_form_candidate">
                                    <div className="article_candidate">주소&nbsp; </div>
                                    <TextField disabled multiline cols="22px" placeholder="주소를 입력하세요." id="address" className="input_form_candidate" />
                                </div>
                            </div>
                            <div id="right_form_candidate">
                                <div>
                                    소개 <TextField multiline maxRows={4} rows="5"
                                    placeholder="자유롭게 본인을 소개하세요."
                                    helperText="500자 이내로 작성하세요." id="introduceself"
                                    fullWidth></TextField>
                                </div>
                            <div>
                                이력 <TextField multiline maxRows={4} rows="5"
                                placeholder="예)20xx년~20xx년 학생회 집행부"
                                helperText="1000자 이내로 작성하세요." id="career"
                                fullWidth></TextField>
                            </div>
                            <div>
                                공약 <TextField multiline maxRows={4} rows="5"
                                placeholder="본인의 공약을 자세히 작성하세요."
                                helperText="1000자 이내로 작성하세요." id="electionpledge"
                                fullWidth></TextField>
                            </div>
                        </div>

                        <div id="reg_button_candidate">
                            <button className="candidate_Button" id="requestCandidate" onClick={updateCandidateContent}>수정</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}