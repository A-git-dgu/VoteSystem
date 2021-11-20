import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { useTheme } from '@mui/material/styles';
import Nav from '../Main/nav';
import styles from './viewCandidate.css';

export default function MainAdmin() {
  return (
       <>
            <Nav Type={"Admin"}/>

            <div id="outer_form_signup">
              <div id="container">

                <p id="title_signup_admain">후보자 상세정보</p>
                <div id="form_border_signup">
                    <div id="left_form_signup_admain">
                       <div className="each_form_signup_admain">
                            <div className="article_signup_admain">대표자 이름 : </div>
                       </div>
                       <div className="each_form_signup_admain">
                            <div className="article_signup_admain">주민등록번호 : </div>
                       </div>
                       <div className="each_form_signup_admain">
                            <div className="article_signup_admain">소속 : </div>
                       </div>
                    </div>
                    <div id="middle_line_signup_viewCandidate"></div>
                    <div id="right_form_signup_admain">
                        <div className="each_form_signup_admain">
                            <div className="article_signup_admain">전화번호 : </div>
                        </div>
                        <div className="each_form_signup_admain">
                            <div className="article_signup_admain">e-mail : </div>
                        </div>
                    </div>
                    <div id="bottom_form">

                        <div className="each_form_signup_admain">
                            <div className="article_viewCandidate">소개: </div>
                            <TextField multiline maxRows={4} rows="5"
                            placeholder="자유롭게 본인을 소개하세요."
                            id="introduceself"
                            fullWidth></TextField>
                        </div>
                        <div className="each_form_signup_admain">
                            <div className="article_viewCandidate">이력: </div>
                            <TextField multiline maxRows={4} rows="5"
                            placeholder="자유롭게 본인을 소개하세요."
                            id="introduceself"
                            fullWidth></TextField>
                        </div>
                        <div className="each_form_signup_admain2">
                            <div className="article_viewCandidate">공약: </div>
                            <TextField multiline maxRows={4} rows="5"
                            placeholder="자유롭게 본인을 소개하세요."
                            id="introduceself"
                            fullWidth></TextField>
                        </div>
                        <div className="each_form_signup_admain">
                            모든서류의 제출을 확인하였습니다:
                            <Checkbox  />
                        </div>
                    </div>

                     <div id="reg_button_viewCandidate">
                        <button id="request_button" className="signupPage_Button">승인</button>
                        <button id="reject_button" className="signupPage_Button">거절</button>
                     </div>
                </div>
              </div>
            </div>

        </>
);
}