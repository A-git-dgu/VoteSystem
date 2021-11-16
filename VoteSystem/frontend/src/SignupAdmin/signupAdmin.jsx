
import * as React from 'react';
import Button from '@mui/material/Button';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Nav from '../Main/nav';

import styles from './signupAdmin.css';

export default function SignupAdmin() {
    const [value, setValue] = React.useState([null, null]);
    const [value1, setValue1] = React.useState([null, null]);
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
                            <NativeSelect default="select_election" className="input_form_signup">
                                <option value={"select_election"}>-- 선거 선택 --</option>
                                <option id="TF" value={"select_election"}>  찬반 투표  </option>
                                <option id="who" value={"select_election"}>  후보자 투표  </option>
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
                        <button className="signupPage_Button" id="requestSignup1">선거 개설</button>
                    </div>
                </div>
                </div>

            </div>

        </>
  );
}
