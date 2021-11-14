import React from 'react';
import styles from './nav.css';
import Logo from '../Img/logo.png'

function nav({Type}) {
    return (
        <div className={Type}>
            <img src={Logo} className="Logo"/>
            <p className="Title">투표 아지트</p>
        </div>
    );
}

export default nav;