import React from 'react';
import styles from './HomePage.css';

import Logo from '../Img/Logo.png';
import ManageImg from '../Img/Home_Manage.png';
import VoteImg from '../Img/Home_Vote.png';

import { Link } from 'react-router-dom';

function HomePage() {
    return (
    <body>
        <Link to="/loginManage">
            <div className="Home_Manage">
                <Link to="/">
                    <div className="Home_Nav">
                        <img src={Logo} className="Home_Logo"/>
                        <p className="Home_Title">투표 아지트</p>
                    </div>
                </Link>
                <div className="Home_Middle">
                    <div className="Manage_Cando">
                        <p className="Cando">선거 생성</p>
                        <p className="Cando">입후보자 관리</p>
                        <p className="Cando">선거정보 관리</p>
                        <p className="Cando">선거 종료</p>
                        <p className="Cando">개표</p>
                        <p className="Cando..">.</p>
                        <p className="Cando..">.</p>
                    </div>
                    <img src={ManageImg} className="ManageImg"/>
                </div>
                <div className="Home_Manage_tri"></div>
                <h1 className="Enter_Manager">관리자로 입장하기 &lt;&lt;</h1>
            </div>
        </Link>
        <Link to="/loginVoter">
            <div className="Home_Vote">
                <div className="Home_Middle">
                    <img src={VoteImg} className="VoteImg"/>
                    <div className="Vote_Cando">
                        <p className="Cando">투표하기</p>
                        <p className="Cando">선거조회</p>
                        <p className="Cando">선거정보 보기</p>
                        <p className="Cando">선거결과 보기</p>
                        <p className="Cando">입후보자 등록</p>
                        <p className="Cando..">.</p>
                        <p className="Cando..">.</p>
                    </div>
                </div>
                <div className="Home_Vote_tri"></div>
                <h1 className="Enter_Voter">&gt;&gt; 투표자로 입장하기</h1>
            </div>
        </Link>
    </body>
    );
}

export default HomePage;