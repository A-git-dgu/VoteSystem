import React from 'react';
import styles from './loginVoter.css'

function loginVoter() {
    return (
        <div className="Outer_V">
            <div className="Inter_V">
                <p id="Login_Title_V">투표자로 입장</p>
                <br/><br/><br/>
                <form>
                    <div className="Button_V" id="mark_V">ID</div>
                    <input name="ID" className="input_V" Type="text" placeholder="아이디를 입력하세요."/>
                    <br/><br/><br/><br/>
                    <div className="Button_V" id="mark_V">PWD</div>
                    <input name="PWD" className="input_V" Type="password" placeholder="비밀번호를 입력하세요."/>
                    <br/><br/><br/><br/>
                    <button type="submit" className="Button_V" id="loginButton_V">입장</button>
                </form>
            </div>
            <button className="Button_V" id="SignUpButton_V">회원가입</button>

        </div>
    );
}

export default loginVoter;