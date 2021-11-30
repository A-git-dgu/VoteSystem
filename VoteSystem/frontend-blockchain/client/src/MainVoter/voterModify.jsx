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
    // user의 선거 불러오기
    let [user, setUser] = useState([]);

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

    // 비밀번호 입력과 비밀번호 재입력 같은지 확인
    const [pwd, setPwd]= useState(""); // 비밀번호 입력
    const [pwd2, setPwd2]= useState(""); // 비밀번호 재입력
    const [pwdEqual, setPwdEqual] = useState("");

    const handlePwdChange = (event) => {
        setPwd(event.target.value);
        if (pwd2=="") { setPwdEqual(""); }
        else if (event.target.value===pwd2) {
            setPwdEqual("true");
        } else {
            setPwdEqual("false");
        }
    }
    const handlePwd2Change = (event) => {
        setPwd2(event.target.value);
        if (event.target.value=="") { setPwdEqual(""); }
        else if (pwd===event.target.value) {
            setPwdEqual("true");
        } else {
            setPwdEqual("false");
        }
    }

    // 회원정보 수정 버튼 클릭 시
    const [canModifyAll, setCanModifyAll] = useState(true);

    const setModifyFalseAll = () => { setCanModifyAll(false); }
    const setModifyTrueAll = () => { setCanModifyAll(true); changeVoterInfo(); }
    const setCancelModify = () => { setCanModifyAll(true); window.location.reload(); }

    // 회원 정보 수정
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const handleChangeName = (event) => { setName(event.target.value); if(event.target.value=="") {setName(user.name);} }
    const handleChangePhone = (event) => { setPhone(event.target.value); if(event.target.value=="") {setPhone(user.phonenumber);} }
    const handleChangeEmail = (event) => { setEmail(event.target.value); if(event.target.value=="") {setEmail(user.email);} }
    const handleChangeAddress = (event) => { setAddress(event.target.value); if(event.target.value=="") {setAddress(user.address);} }

    let [voterInfo, setVoterInfo] = useState([]);

    const changeVoterInfo = async() => {
        setName(user.name);
        setPhone(user.phonenumber);
        setEmail(user.email);
        setAddress(user.address);
        if (name == "" || phone == "" || email == "" || address == "") {
            alert("모든 항목을 입력하세요.");
            setCanModifyAll(false);
        }
        else {
            const url = "http://localhost:8000/updateVoterInfo";
            await axios.put(url,{
                id:getSessionCookie('id'),
                name: name,
                phone: phone,
                email: email,
                address: address
            })
            .then(function(response) {
                setVoterInfo(response.data);
                alert("회원 정보가 수정되었습니다.");
            })
            .catch(function(error) {
                console.log("실패");
            })
        }
    }

    // 비밀번호 재설정 버튼 클릭 시
    const [canModify, setCanModifyPWD] = useState(true);
    const setModifyFalse = () => { setCanModifyPWD(false); }
    const setModifyTrue = () => { setCanModifyPWD(true); changePWD(); }

    // 비밀번호 재설정
    const changePWD = async() => {
        if (pwd != pwd2) {
            alert("비밀번호가 다릅니다.");
            setPwd(user.pwd);
            setCanModifyPWD(false);
        }
        else if (pwd == "") {
            alert("비밀번호를 입력해주세요.");
            setPwd(user.pwd);
            setCanModifyPWD(false);
        }
        else {
            const url = "http://localhost:8000/updatePWD";
            await axios.put(url,{
                id:getSessionCookie('id'),
                pwd:pwd
            })
            .then(function(response) {
                setUser(response.data);
            })
            .catch(function(error) {
                console.log("실패");
            })
            alert("비밀번호가 변경되었습니다.");
            window.location.reload();
        }
    }

    return (
        <>
            <Nav Type={"Voter"}/>

            <div id="outer_form_mainVoter">
            <div id="container_mainVoter">
            <div><p id="title_mainVoter">회원 정보
                {
                    canModifyAll == false &&
                    <button id="cancel_button_voterModify" className="voterModify_Button" onClick={setCancelModify}>취소</button>
                }
                {
                    canModifyAll == true ?
                    <button id="modify_button_voterModify" className="voterModify_Button" onClick={setModifyFalseAll}>정보 수정</button>
                    :
                    <button id="modify_button_voterModify" className="voterModify_Button" onClick={setModifyTrueAll}>수정하기</button>
                }

            </p></div>
                <div id="form_border_voterModify">
                    <div className="inner_voterModify">
                        <div className="inner_left_voterModify">회원 ID</div>
                        <div className="inner_right_voterModify"><Input value={user.id} disabled id="id"/></div>
                    </div>
                    <div className="inner_voterModify">
                        <div className="inner_left_voterModify">비밀번호</div>
                        <div className="inner_right_voterModify"><Input type="password" placeholder={user.pwd} id="pwd" disabled={canModify} onChange={handlePwdChange}/>
                        </div>
                    </div>
                    <div className="inner_voterModify">
                        <div className="inner_left_voterModify">비밀번호 재확인</div>
                        <div className="inner_right_voterModify"><Input type="password" id="pwd2" disabled={canModify} onChange={handlePwd2Change}/>
                            {canModify == true ?
                                <button className="voterModify_Button changePWD_Button" onClick={setModifyFalse} disabled={canModifyAll}>비밀번호 재설정</button>
                                :
                                <button className="voterModify_Button changePWD_Button" onClick={setModifyTrue} disabled={canModifyAll}>변경</button>
                            }
                        <div className="isPwdEqual">
                            { pwdEqual=="false" && <p id="pwdNotEqualVoterModify">비밀번호가 일치하지 않습니다.</p> }
                            { pwdEqual=="true" && <p id="pwdEqualVoterModify">비밀번호가 일치합니다.</p> }</div>
                        </div>
                    </div>
                    <div className="inner_voterModify">
                        <div className="inner_left_voterModify">회원 이름</div>
                        <div className="inner_right_voterModify"><Input placeholder={user.name} disabled={canModifyAll} id="name" onChange={handleChangeName}/></div>
                    </div>
                    <div className="inner_voterModify">
                        <div className="inner_left_voterModify">주민등록번호</div>
                        <div className="inner_right_voterModify"><Input className="ssn_voterModify" value={user.fssn} disabled id="fssn"/>
                            &nbsp;&nbsp;- <Input className="ssn_voterModify" type="password" value={user.lssn} disabled id="lssn"/></div>
                    </div>
                    <div className="inner_voterModify">
                        <div className="inner_left_voterModify">전화번호</div>
                        <div className="inner_right_voterModify"><Input type="tel" placeholder={user.phonenumber} id="phonenumber" disabled={canModifyAll} onChange={handleChangePhone}/></div>
                    </div>
                    <div className="inner_voterModify">
                        <div className="inner_left_voterModify">이메일</div>
                        <div className="inner_right_voterModify"><Input type="email" placeholder={user.email} id="email" disabled={canModifyAll} onChange={handleChangeEmail}/></div>
                    </div>
                    <div className="inner_voterModify">
                        <div className="inner_left_voterModify">주소</div>
                        <div className="inner_right_voterModify"><TextField hiddenLabel multiline rows={4} placeholder={user.address} id="address" disabled={canModifyAll}  onChange={handleChangeAddress}/></div>
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