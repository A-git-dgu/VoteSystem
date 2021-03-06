import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';

import './signupVoter.css';
import Nav from '../Main/nav'
import axios from 'axios';

export default function SignupVoter() {
    const [okID, setOkID] = useState([]);
    const [okSSN, setOkSSN] = useState([]);

    const [pwd, setPwd]= useState("");
    const [pwd2, setPwd2]= useState("");
    const [pwdEqual, setPwdEqual] = useState("");

    useEffect(()=>{
        setOkID("F");
        setOkSSN("F");
    },[])

    function requestSignup() {
        const url = "http://localhost:8000/requestSignup";
        // 예외처리
        if (okID === "F") {
            alert("아이디 중복 확인을 해주세요.");
            return;
        }
        else if (pwdEqual==="false") {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        else if (okSSN === "F") {
            alert("본인 확인을 해주세요.");
            return;
        }
        else if (document.getElementById('id').value===""||pwd===""||pwd2===""||
        document.getElementById('name').value===""||document.getElementById('address').value===""||document.getElementById('phonenumber').value===""||
        document.getElementById('email').value==="") {
            alert("모든 항목을 작성해주세요.");
            return;
        }
        while ( document.getElementById('phonenumber').value.includes('-')) {
            document.getElementById('phonenumber').value = document.getElementById('phonenumber').value.replace('-','');
        }

        // 삽입
        axios.put(url,{
            user_ssn:document.getElementById('fssn').value+'-'+document.getElementById('lssn').value,
            id:document.getElementById('id').value,
            pwd:pwd,
            name:document.getElementById('name').value,
            address:document.getElementById('address').value,
            phonenumber:document.getElementById('phonenumber').value,
            email:document.getElementById('email').value
        })
        .then(function(response) {
            if(response.status===400){
                alert('회원가입이 실패하였습니다.')
            }
            else {
                alert('회원가입이 완료되었습니다.')
                window.location.href="/loginVoter"
            }
        })
        .catch(function(error) {
            alert('다시 한번 시도해주세요.')
        })
    };

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

    const checkIdVote = async() =>{
        const url="http://localhost:8000/checkIdVote";

       await axios.post(url,{
        voter_id:document.getElementById('id').value
        })
        .then(function(response) {
            if(response.status===200){
                 alert('존재하는 아이디입니다.')
            }
            else if(response.status===201){
                 alert('아이디를 입력해주세요.')
            }
            else if(response.status===202){
                 alert('아이디에 공백이 포함될 수 없습니다.')
            }
            else {
                  alert('사용할수 있는 아이디입니다.')
                  setOkID("T");
            }
        })
        .catch(function(error) {
             alert('다시 한번 시도해주세요.')
         })
    };

    function checkSSN(){
        const fssnElement = document.getElementById("fssn")
        const lssnElement = document.getElementById("lssn")
        const fssn = fssnElement.value
        const lssn = lssnElement.value
        if(fssn.length!=6 || lssn.length!=7 || fssn[2]+fssn[3] > 12 || fssn[4]+fssn[5] > 31 || fssn[4]+fssn[5]==0){
            alert("유효한 주민등록번호를 입력하세요.")
        }
        else if(isNaN(fssn)||isNaN(lssn)){
            alert("유효한 주민등록번호를 입력하세요.")
        }
        else if(!(lssn[0]==5)&&!(fssn[0]+fssn[1]>21&&(lssn[0]==1||lssn[0]==2)) && !(fssn[0]+fssn[1]<=21&&(lssn[0]==3||lssn[0]==4))){
            alert("유효한 주민등록번호를 입력하세요.")
        }
        else{
            alert("유효한 주민등록번호입니다!")
            fssnElement.disabled="true"
            lssnElement.disabled="true"
            setOkSSN("T")
        }
    }

    return (
        <>
            <Nav Type={"Voter"}/>

            <div id="outer_form_signup">
            <div id="container">
            <div id="title2"><p id="title_signup">회원가입</p></div>
                <div id="form_border_signup">
                    <div id="left_form_signup">
                        <div className="each_form_signup">
                            <div className="article_signup">회원 ID</div>
                            <Input placeholder="아이디를 입력하세요.(영어 대소문자 구분)" id="id" className="input_form_signup"/>
                            <button className="signupPage_Button" id="checkInput_signup" onClick={checkIdVote}>중복확인</button>
                        </div>
                        <div className="each_form_signup">
                            <div className="article_signup">비밀번호</div>
                            <Input type="password" placeholder="알파벳+숫자(영어 대소문자 구분)" id="pwd" className="input_form_signup" onChange={handlePwdChange}/>
                        </div>
                        <div className="each_form_signup">
                            <div className="article_signup">비밀번호 재확인</div>
                            <Input type="password" placeholder="비밀번호를 다시 한번 입력하세요." id="pwd2" className="input_form_signup" onChange={handlePwd2Change}/>
                            <div className="isPwdEqual">
                                { pwdEqual=="false" && <p id="pwdNotEqual">비밀번호가 일치하지 않습니다.</p> }
                                { pwdEqual=="true" && <p id="pwdEqual">비밀번호가 일치합니다.</p> }
                            </div>
                        </div>
                        <div className="each_form_signup">
                            <div className="article_signup">회원 이름</div>
                            <Input placeholder="이름를 입력하세요." id="name" className="input_form_signup"/>
                        </div>
                        <div className="each_form_signup">
                            <div className="article_signup" id="backmargin_article_signup">주민등록번호</div>
                            <Input className="ssn_signup" placeholder="000000" id="fssn"/>
                            &nbsp;&nbsp;- <Input className="ssn_signup" type="password" placeholder="1234567" id="lssn"/>
                            <button className="signupPage_Button" id="checkInput_signup" onClick={checkSSN}>본인확인</button>
                        </div>
                    </div>
                    <div id="middle_line_signup"></div>
                    <div id="right_form_signup">
                        <div className="each_form_signup">
                            <div className="article_signup">전화번호</div>
                            <Input type="tel" placeholder="01000000000" className="input_form_signup" id="phonenumber"/>
                        </div>
                        <div className="each_form_signup">
                            <div className="article_signup">이메일</div>
                            <Input type="email" placeholder="dongguk@dgu.kr" className="input_form_signup" id="email"/>
                        </div>
                        <div className="each_form_signup">
                            <div className="article_signup" id="backmargin_article_signup">주소</div>
                            <TextField hiddenLabel multiline rows={4} placeholder="주소를 입력하세요." className="input_form_signup" id="address"/>
                        </div>
                    </div>
                    <div id="reg_button_signup">
                        <button className="signupPage_Button" id="requestSignup" onClick={requestSignup}>회원가입</button>
                    </div>
                </div>
                </div>
                <p>{okID}</p>
                <p>{okSSN}</p>
            </div>

        </>
    );
}