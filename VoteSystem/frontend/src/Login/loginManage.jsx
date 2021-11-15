import React from 'react';
import styles from './loginManage.css'

import { Link } from 'react-router-dom';

function loginManage() {
     return (
        <div className="Outer_M">
            <div className="Inter_M">
                <p id="Login_Title_M">관리자로 입장</p>
                <br/><br/><br/>
                <div className="Button_M" id="mark_M">ID</div>
                <input className="input_M" Type="text_M" placeholder="아이디를 입력하세요."/>
                <br/><br/><br/><br/>
                <div className="Button_M" id="mark_M">PWD</div>
                <input className="input_M" Type="text_M" placeholder="비밀번호를 입력하세요."/>
                <br/><br/><br/><br/>
                <button className="Button_M" id="loginButton_M">입장</button>
            </div>
            <Link to="/adminSignup">
            <button className="Button_M" id="SignUpButton_M">선거개설</button>
            </Link>
        </div>
    );
}

export default loginManage;
