import React, {useState, useEffect} from 'react';
import './nav.css';
import Logo from '../Img/logo.png'

import { Link } from 'react-router-dom';
import getSessionCookie, { removeSessionCookie } from '../Login/cookies';

export default function Nav({Type}) {
    const [checkLogin, setCheckLogin] = useState([]);

    function isLogin() {
        if (getSessionCookie('id')==null) {
            setCheckLogin(0);
        }
        else {
            setCheckLogin(1);
        }
    }

    function Logout() {
        removeSessionCookie();
        document.location.href='/';
    }

    useEffect(()=>{
        isLogin();
    },[])

    return (
        <div className={Type}>
            {
            Type==="Voter" && (checkLogin==1 ?
            <Link to='/mainVoter'>
                <img src={Logo} className="Logo"/>
                <p className="Title">투표 아지트</p>
            </Link>
            :
            <Link to='/'>
                <img src={Logo} className="Logo"/>
                <p className="Title">투표 아지트</p>
            </Link>)
            }
            {
            Type==="Admin" && (checkLogin==1 ?
            <Link to='/mainAdmin'>
                <img src={Logo} className="Logo"/>
                <p className="Title">투표 아지트</p>
            </Link>
            :
            <Link to='/'>
                <img src={Logo} className="Logo"/>
                <p className="Title">투표 아지트</p>
            </Link>)
            }
            { checkLogin===1 &&
            <div class="Nav_right">
                {
                    Type==="Voter" && <Link to={'/voterModify'}><button className="button_nav" id="modifyUserInfo">회원정보 수정</button></Link>
                }
                <button className="button_nav" id="logoutButton" onClick={Logout}>로그아웃</button>
                {
                    Type==="Voter" && <p id="welcomeMsg">{getSessionCookie('id')}님, 올바른 투표하세요~</p>
                }
                {
                    Type==="Admin" && <p id="welcomeMsg">{getSessionCookie('id')} 선거 관리자님, 반갑습니다!</p>
                }
            </div>
            }
        </div>
    );
}