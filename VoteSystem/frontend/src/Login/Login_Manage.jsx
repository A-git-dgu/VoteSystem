import React from 'react';
import styles from './Login_Manage.css'
import Img from '../Img/Logo.png'

function Login_Manage() {
    return (
        <div className="Outer_M">
            <div className="Inter_M">
                <h1>관리자로 입장</h1>
                <br/><br/><br/>
                <button className="Button_M" id="mark_M">ID</button>
                <input className="input_M" Type="text_M" placeholder="아이디를 입력하세요."/>
                <br/><br/>
                <button className="Button_M" id="mark_M">PWD</button>
                <input className="input_M" Type="text_M" placeholder="비밀번호를 입력하세요."/>
                <br/><br/><br/><br/>
                <button className="Button_M" id="loginButton_M">입장</button>
            </div>
            <button className="Button_M" id="SignUpButton_M">선거개설</button>

        </div>
    );
}

export default Login_Manage;