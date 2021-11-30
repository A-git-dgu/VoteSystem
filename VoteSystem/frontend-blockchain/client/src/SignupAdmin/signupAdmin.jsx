import * as React from 'react';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import Nav from '../Main/nav';

import './signupAdmin.css';

import axios from 'axios';

export default function SignupAdmin() {
    const [value, setValue] = React.useState([null, null]);
    const [value1, setValue1] = React.useState([null, null]);

    const [pwd, setPwd]= React.useState("");
    const [pwd2, setPwd2]= React.useState("");
    const [pwdEqual, setPwdEqual] = React.useState("");

    const [okID, setOkID] = React.useState([]);
    const [okSSN, setOkSSN] = React.useState([]);
    const [okName, setOkName]=React.useState([]);

    React.useEffect(()=>{
        setOkID("F");
        setOkSSN("F");
        setOkName("F");
    },[])

    function requestOpenElection() {
        const url = "http://localhost:8000/requestOpenElection";

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
        else if (document.getElementById('select_election').value==="None") {
            alert("선거 종류를 선택하세요.")
            return;
        }
        else if (document.getElementById('election_name').value===""||document.getElementById('start').value===""||document.getElementById('end').value===""
        ||document.getElementById('enroll_start').value===""||document.getElementById('enroll_end').value===""||document.getElementById('institution').value===""
        ||document.getElementById('admin_fssn').value===""||document.getElementById('admin_lssn').value===""||document.getElementById('admin_id').value===""
        ||pwd===""||pwd2===""||document.getElementById('admin_name').value===""||document.getElementById('admin_fphone').value===""
        ||document.getElementById('admin_mphone').value===""||document.getElementById('admin_lphone').value===""||document.getElementById('admin_email').value==="") {
            alert("모든 항목을 작성해주세요.");
            return;
        }

        // request server
        axios.put(url,{
            election_name:document.getElementById('election_name').value,
            election_type:document.getElementById('select_election').value,
            start_date:document.getElementById('start').value,
            end_date:document.getElementById('end').value,
            enroll_start:document.getElementById('enroll_start').value,
            enroll_end:document.getElementById('enroll_end').value,
            institution:document.getElementById('institution').value,
            admin_ssn:document.getElementById('admin_fssn').value+'-'+document.getElementById('admin_lssn').value,
            admin_id:document.getElementById('admin_id').value,
            admin_pwd:document.getElementById('admin_pwd').value,
            admin_name:document.getElementById('admin_name').value,
            admin_phonenumber:document.getElementById('admin_fphone').value+document.getElementById('admin_mphone').value+document.getElementById('admin_lphone').value,
            admin_email:document.getElementById('admin_email').value
        })
        .then(function(response) {
            if(response.status===400){
                alert('선거개설 실패')
            }
            else {
                alert('선거개설 성공')
                window.location.href="/loginAdmin"
            }
        })
        .catch(function(error) {
            alert('서버 연결실패')
            console.log("실패");
        })
    };
    function checkSSN(){
        const fssnElement = document.getElementById("admin_fssn")
        const lssnElement = document.getElementById("admin_lssn")
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

    const handlePwdChange = (event) => {
        setPwd(event.target.value);
        console.log("Pwd : " + event.target.value)
        if (pwd2=="") { setPwdEqual(""); }
        else if (event.target.value===pwd2) {
            setPwdEqual("true");
            console.log("true");
        } else {
            setPwdEqual("false");
            console.log("false");
        }
    }
    const handlePwd2Change = (event) => {
        setPwd2(event.target.value);
        console.log("Pwd2 : " + event.target.value)
        if (event.target.value=="") { setPwdEqual(""); }
        else if (pwd===event.target.value) {
            setPwdEqual("true");
            console.log("true");
        } else {
            setPwdEqual("false");
            console.log("false");
        }
    }

    const checkVoteName =async()=>{
        const url="http://localhost:8000/checkVoteName";

        await axios.post(url,{
        vote_name:document.getElementById('election_name').value
        })
        .then(function(response){
            if(response.status===200){
                 alert('존재하는 선거이름입니다.')
            }
            else if(response.status===201){
                 alert('선거이름을 입력해주세요.')
            }
            else {
                  alert('사용할수 있는 선거이름입니다.')
                  setOkName("T");
                  console.log(okName);
                  console.log("성공");
            }
        })
        .catch(function(error) {
             alert('서버 연결실패')
             console.log("실패");
         })
    };

    const checkIdAdmin = async() =>{
        const url="http://localhost:8000/checkIdAdmin";

        await axios.post(url,{
        admin_id:document.getElementById('admin_id').value
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
                  alert('사용할 수 있는 아이디입니다.')
                  setOkID("T");
                  console.log(okID);
                  console.log("성공");
            }
        })
        .catch(function(error) {
             alert('서버 연결실패')
             console.log("실패");
         })
    };

    return (
        <>
            <Nav Type={"Admin"}/>

            <div id="outer_form_signup">
            <div id="container">
            <div id="title2"><p id="title_signup">관리자 선거 개설</p></div>
                <div id="form_border_signup">
                    <div id="left_form_signup">
                       <div className="each_form_signup">
                            <div className="article_signup">선거 이름</div>
                            <Input placeholder="선거 이름을 입력하세요" id="election_name" className="input_form_signup"/>
                            <button className="signupPage_Button" id="checkInput_signup" onClick={checkVoteName}>중복확인</button>
                       </div>
                       <div className="each_form_signup">
                       <div className="article_signup">선거 종류 </div>
                            <NativeSelect id="select_election" default="select_election" className="input_form_signup">
                                <option value={"None"}>-- 선거 선택 --</option>
                                <option value={"0"}>  찬반 투표  </option>
                                <option value={"1"}>  후보자 투표  </option>
                            </NativeSelect>
                       </div>
                       <div className="each_form_signup">
                            <div className="article_signup">소속 기관</div>
                            <Input placeholder="소속기관을 입력하세요" id="institution" className="input_form_signup"/>
                       </div>
                       <div className="each_form_signup">
                            <p className="article_signup">선거 기간</p>
                            <div className="input_form_signup2">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateRangePicker
                                        disablePast
                                        startText="시작"
                                        endText="종료"
                                        value={value1}
                                        onChange={(newdate) => {
                                        setValue1(newdate);
                                        }}
                                    renderInput={(startProps, endProps) => (
                                    <React.Fragment>
                                        <TextField id="start"{...startProps} />
                                        <Box sx={{ mx: 2, fontSize:18 }}> to </Box>
                                        <TextField id="end"{...endProps} />
                                    </React.Fragment>
                                    )}
                                    />
                                </LocalizationProvider>
                            </div>
                       </div>
                       <div className="each_form_signup">
                            <p className="article_signup_candi">후보자 등록기간</p>
                            <div className="input_form_signup2">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateRangePicker
                                      disablePast
                                      startText="시작"
                                      endText="종료"
                                      maxDate={value1[0]}
                                      value={value}
                                      onChange={(newValue) => {
                                       setValue(newValue);
                                      }}
                                    renderInput={(startProps, endProps) => (
                                       <React.Fragment>
                                            <TextField id="enroll_start"{...startProps} />
                                            <Box sx={{ mx: 2,fontSize:18 }}> to </Box>
                                            <TextField id="enroll_end"{...endProps} />
                                        </React.Fragment>
                                    )}
                                    />
                                </LocalizationProvider>
                            </div>
                       </div>
                    </div>
                    <div id="middle_line_signup"></div>
                    <div id="right_form_signup">
                        <div className="each_form_signup">
                            <div className="article_signup">회원 ID</div>
                            <Input placeholder="아이디를 입력하세요.(영어 대소문자 구분)" id="admin_id" className="input_form_signup"/>
                            <button className="signupPage_Button" id="checkInput_signup" onClick={checkIdAdmin}>중복확인</button>
                        </div>
                        <div className="each_form_signup">
                            <div className="article_signup">비밀번호</div>
                            <Input type="password" placeholder="알파벳+숫자(영어 대소문자 구분)" id="admin_pwd" className="input_form_signup" onChange={handlePwdChange}/>
                        </div>
                        <div className="each_form_signup">
                            <div className="article_signup">비밀번호 재확인</div>
                            <Input type="password" placeholder="비밀번호를 다시 한번 입력하세요." id="admin_pwd2" className="input_form_signup" onChange={handlePwd2Change}/>
                            <div className="isPwdEqual">
                                { pwdEqual=="false" && <p id="pwdNotEqual">비밀번호가 일치하지 않습니다.</p> }
                                { pwdEqual=="true" && <p id="pwdEqual">비밀번호가 일치합니다.</p> }
                            </div>
                        </div>
                        <div className="each_form_signup">
                            <div className="article_signup">회원 이름</div>
                            <Input placeholder="이름를 입력하세요." id="admin_name" className="input_form_signup"/>
                        </div>
                        <div className="each_form_signup">
                            <div className="article_signup" id="backmargin_article_signup">주민등록번호</div>
                            <Input className="ssn_signup" placeholder="000000" id="admin_fssn"/>
                            &nbsp;&nbsp;- <Input className="ssn_signup" type="password" placeholder="1234567" id="admin_lssn"/>
                            <button className="signupPage_Button" id="checkInput_signup" onClick={checkSSN}>본인확인</button>
                        </div>
                        <div className="each_form_signup">
                            <div className="article_signup" id="backmargin_article_signup">전화번호</div>
                             <Input className="phone_signup" placeholder="010" id="admin_fphone"/>&nbsp;&nbsp;-
                             <Input className="phone_signup" placeholder="1234" id="admin_mphone"/>&nbsp;&nbsp;-
                             <Input className="phone_signup" placeholder="1234" id="admin_lphone"/>
                        </div>
                        <div className="each_form_signup">
                            <div className="article_signup">이메일</div>
                            <Input type="email" placeholder="dongguk@dgu.kr" className="input_form_signup" id="admin_email"/>
                        </div>
                    </div>
                    <div id="reg_button_signup">
                        <button className="signupPage_Button" id="requestSignup1" onClick={requestOpenElection}>선거 개설</button>
                    </div>
                </div>
                </div>

            </div>

        </>
  );
}
