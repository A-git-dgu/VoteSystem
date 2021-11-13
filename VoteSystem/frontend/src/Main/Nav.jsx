import React from 'react';
import styles from './Nav.css';
import Img from '../Img/Logo.png'

function Nav({Type}) {
    return (
        <div className={Type}>
            <img src={Img} className="Logo"/>
            <p className="Title">투표 아지트</p>
        </div>
    );
}

export default Nav;