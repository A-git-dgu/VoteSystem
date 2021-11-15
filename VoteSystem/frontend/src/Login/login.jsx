import React, {useState, useEffect} from 'react';
import styles from './login.css';
import axios from 'axios';

import { Link } from 'react-router-dom';

function Login({Type}) {
    // Manager or Voter PageType
    const [color, setColor] = useState([]);
    const [buttonColor, setButtonColor] = useState([]);

    function setPageColor() {
        if (Type=="Admin") {
            setColor("M");
            setButtonColor("Button_M");
        }
        else if (Type=="Voter") {
            setColor("V");
            setButtonColor("Button_V");
        }
    }
    useEffect(()=>{
        setPageColor();
    }, [])

    // Admin Login
    async function requestAdminLogin() {
        const url = "http://localhost:8000/checkAdminLogin";
        await axios.post(url, {
            id:document.getElementById('id').value,
            pwd:document.getElementById('pwd').value
        })
        .then(function(response) {
            alert(response.data.msg)
        })
        .catch(function(error) {
            alert('서버연결 실패')
        })
    }

    // Voter Login
    async function requestVoterLogin() {
        const url = "http://localhost:8000/checkVoterLogin";
        await axios.post(url, {
            id:document.getElementById('id').value,
            pwd:document.getElementById('pwd').value
        })
        .then(function(response) {
            alert(response.data.msg)
        })
        .catch(function(error) {
            alert('서버연결 실패')
        })
    }

    return (
        <div className="Outer" id={color}>
            <div className="Inter">
                {
                    Type=="Admin" && (<p id="Login_Title">관리자로 입장</p>)
                }
                {
                    Type=="Voter" && (<p id="Login_Title">투표자로 입장</p>)
                }

                <br/><br/><br/>
                <div className={buttonColor} id="mark">ID</div>
                <input id="id" className="input" Type="text" placeholder="아이디를 입력하세요."/>
                <br/><br/><br/><br/>
                <div className={buttonColor} id="mark">PWD</div>
                <input id="pwd" className="input" Type="password" placeholder="비밀번호를 입력하세요."/>
                <br/><br/><br/><br/>
                {
                    Type=="Admin" && <button className={buttonColor} id="loginButton" onClick={requestAdminLogin}>입장</button>
                }
                {
                    Type=="Voter" && <button className={buttonColor} id="loginButton" onClick={requestVoterLogin}>입장</button>
                }

            </div>
            {
                Type=="Admin" && (<Link to='/adminSignup'><button className={buttonColor} id="SignUpButton">선거개설</button></Link>)
            }
            {
                Type=="Voter" && (<button className={buttonColor} id="SignUpButton">회원가입</button>)
            }
        </div>
    );
}

export default Login;