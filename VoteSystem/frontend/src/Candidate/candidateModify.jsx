import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';

import styles from './twoSegInputForm.css';
import Nav from '../Main/main';
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
        searchApi();
    }, [])
    console.log(candidate_elections)

    return (
        <>
            <Nav/>
            <div id="title">후보자 등록 정보 수정</div>
                <div id="outer_form">
                    <div id="form_border">
                        <div id="left_form">
                            <div className="each_form">선거 선택
                                <NativeSelect default="select_election" id="election" className="input_form">
                                    <option value={"select_election"}>-- 선거 선택 --</option>
                                        if(candidate_elections.length>0){
                                            candidate_elections.map((candidate_election) => (
                                    <option value={candidate_election.electionnumber}>{candidate_election.name}</option>
                                    ))
                                    }
                                </NativeSelect>
                            </div>
                            <div className="each_form">
                                이름 <Input placeholder="내용을 입력하세요." id="name" className="input_form"/>
                            </div>
                            <div className="each_form">
                                주민등록번호 <Input className="ssn" placeholder="000000" id="fssn"/>
                                - <Input className="ssn" type="password" placeholder="1234567" id="lssn"/>
                            </div>
                            <div className="each_form">
                                전화번호 <Input type="tel" placeholder="010-0000-0000" id="phonenumber" className="input_form"/>
                            </div>
                            <div className="each_form">
                                이메일 <Input type="email" placeholder="dongguk@dgu.kr" id="email" className="input_form"/>
                            </div>
                            <div className="each_form">
                                주소&nbsp;&nbsp; <TextField multiline cols="22px" placeholder="주소를 입력하세요." id="address" className="input_form" />
                            </div>
                        </div>
                    <div id="right_form">
                        <div>
                            소개 <TextField multiline maxRows={4} rows="5"
                            placeholder="자유롭게 본인을 소개하세요."
                            helperText="500자 이내로 작성하세요." id="introduceself"
                            fullWidth></TextField>
                        </div>
                    <div>
                        이력 <TextField multiline maxRows={4} rows="5"
                        placeholder="예)20xx년~20xx년 학생회 집행부"
                        helperText="1000자 이내로 작성하세요." id="carrer"
                        fullWidth></TextField>
                    </div>
                    <div>
                        공약 <TextField multiline maxRows={4} rows="5"
                        placeholder="본인의 공약을 자세히 작성하세요."
                        helperText="1000자 이내로 작성하세요." id="electionpledge"
                        fullWidth></TextField>
                    </div>
                </div>
            </div>
        <div id="reg_button">
            <Button variant="contained" type="button">후보자 등록</Button>
            후보자 등록 정보는 "회원정보 수정"에서 수정 가능합니다.</div>
        </div>
    </>
    );
}