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

    const [okID, setOkID] = React.useState([]);
    const [okSSN, setOkSSN] = React.useState([]);

    React.useEffect(()=>{
        setOkID("T");
        setOkSSN("T");
    },[])

    function requestOpenElection() {
        const url = "http://localhost:8000/requestOpenElection";

        // 예외처리
        if (okID === "F") {
            alert("아이디 중복 확인을 해주세요.");
            return;
        }
        else if (document.getElementById('admin_pwd').value!==document.getElementById('admin_pwd2').value) {
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
        ||document.getElementById('admin_pwd').value===""||document.getElementById('admin_name').value===""||document.getElementById('admin_fphone').value===""
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
                            <button className="signupPage_Button" id="checkInput_signup">중복확인</button>
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
                                       startText="시작"
                                       endText="종료"
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
                            <button className="signupPage_Button" id="checkInput_signup">중복확인</button>
                        </div>
                        <div className="each_form_signup">
                            <div className="article_signup">비밀번호</div>
                            <Input type="password" placeholder="알파벳+숫자(영어 대소문자 구분)" id="admin_pwd" className="input_form_signup"/>
                        </div>
                        <div className="each_form_signup">
                            <div className="article_signup">비밀번호 재확인</div>
                            <Input type="password" placeholder="비밀번호를 다시 한번 입력하세요." id="admin_pwd2" className="input_form_signup"/>
                        </div>
                        <div className="each_form_signup">
                            <div className="article_signup">회원 이름</div>
                            <Input placeholder="이름를 입력하세요." id="admin_name" className="input_form_signup"/>
                        </div>
                        <div className="each_form_signup">
                            <div className="article_signup" id="backmargin_article_signup">주민등록번호</div>
                            <Input className="ssn_signup" placeholder="000000" id="admin_fssn"/>
                            &nbsp;&nbsp;- <Input className="ssn_signup" type="password" placeholder="1234567" id="admin_lssn"/>
                            <button className="signupPage_Button" id="checkInput_signup">본인확인</button>
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
