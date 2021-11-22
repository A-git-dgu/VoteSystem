import React, {useState, useEffect} from 'react';
import styles from './login.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import getSessionCookie, { setSessionCookie } from './cookies';

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

    // Login
    let [ID, setID] = useState([])

    // Admin Login
    async function requestAdminLogin() {
        const url = "http://localhost:8000/checkAdminLogin";
        let ID = document.getElementById('id').value;

        await axios.post(url, {
            id:document.getElementById('id').value,
            pwd:document.getElementById('pwd').value
        })
        .then(function(response) {
            if (response.status==200) {
                setSessionCookie('id', ID, 1/48);
                setSessionCookie('type', Type, 1/48);
                document.location.href='/mainAdmin';
            }
            else if (response.status==204) {
                alert('아이디 혹은 비밀번호를 확인하세요.')
                document.location.href='/loginAdmin';
            }
            else if (response.status=400) {
                alert(response.data.msg)
            }
        })
        .catch(function(error) {
            alert('서버연결 실패')
        })
    }

    // Voter Login
    async function requestVoterLogin() {
        const url = "http://localhost:8000/checkVoterLogin";
        let ID = document.getElementById('id').value;

        await axios.post(url, {
            id:document.getElementById('id').value,
            pwd:document.getElementById('pwd').value
        })
        .then(function(response) {
            if (response.status==200) {
                setSessionCookie('id', ID, 1/48);
                setSessionCookie('type', Type, 1/48);
                document.location.href='/mainVoter';
            }
            else if (response.status==204) {
                alert('아이디 혹은 비밀번호를 확인하세요.')
                document.location.href='/';
            }
            else if (response.status=400) {
                alert(response.data.msg)
            }
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
                Type=="Admin" && (<Link to='/signupAdmin'><button className={buttonColor} id="SignUpButton">선거개설</button></Link>)
            }
            {
                Type=="Voter" && (<Link to='/signupVoter'><button className={buttonColor} id="SignUpButton">회원가입</button></Link>)
            }
        </div>
    );
}

export default Login;