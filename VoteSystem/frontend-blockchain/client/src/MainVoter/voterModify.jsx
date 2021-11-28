import React, {useState, useEffect} from 'react';
import './mainVoter.css';
import './voterModify.css';
import Nav from '../Main/nav';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';

import axios from 'axios';
import { Link } from 'react-router-dom';
import getSessionCookie, {isLogin} from '../Login/cookies';

export default function MainVoter({match}) {
    let [user, setUser] = useState([]);

    // user의 선거 불러오기
    const getUserElection = async() => {
        const url = "http://localhost:8000/getUserModify";
        await axios.post(url,{
            id:getSessionCookie('id')
        })
        .then(function(response) {
            setUser(response.data);
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
            <div><p id="title_mainVoter">회원 정보</p></div>
                <div id="form_border_voterModify">
                    <div className="inner_voterModify">
                        <div className="inner_left_voterModify">회원 ID</div>
                        <div className="inner_right_voterModify"><Input placeholder={user.id} disabled id="id"/></div>
                    </div>
                    <div className="inner_voterModify">
                        <div className="inner_left_voterModify">비밀번호</div>
                        <div className="inner_right_voterModify"><Input type="password" placeholder={user.pwd} disabled id="pwd"/>
                            <button className="voterModify_Button changePWD_Button">비밀번호 재설정</button>
                        </div>
                    </div>
                    <div className="inner_voterModify">
                        <div className="inner_left_voterModify">회원 이름</div>
                        <div className="inner_right_voterModify"><Input value={user.name} id="name"/></div>
                    </div>
                    <div className="inner_voterModify">
                        <div className="inner_left_voterModify">주민등록번호</div>
                        <div className="inner_right_voterModify"><Input className="ssn_voterModify" placeholder={user.fssn} disabled id="fssn"/>
                            &nbsp;&nbsp;- <Input className="ssn_voterModify" type="password" placeholder={user.lssn} disabled id="lssn"/></div>
                    </div>
                    <div className="inner_voterModify">
                        <div className="inner_left_voterModify">전화번호</div>
                        <div className="inner_right_voterModify"><Input type="tel" value={user.phonenumber} id="phonenumber"/></div>
                    </div>
                    <div className="inner_voterModify">
                        <div className="inner_left_voterModify">이메일</div>
                        <div className="inner_right_voterModify"><Input type="email" value={user.email} id="email"/></div>
                    </div>
                    <div className="inner_voterModify">
                        <div className="inner_left_voterModify">주소</div>
                        <div className="inner_right_voterModify"><TextField hiddenLabel multiline rows={4} value={user.address} id="address"/></div>
                    </div>
                    <div id="bottom_mainVoter">
                        <Link to='/candidateModify'><button className="mainVoterPage_Button" id="candidateModify_button_voterModify">후보자 등록 정보 수정</button></Link>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}