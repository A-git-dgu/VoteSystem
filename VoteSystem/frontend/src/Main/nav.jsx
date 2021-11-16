import React from 'react';
import styles from './nav.css';
import Logo from '../Img/logo.png'

import { Link } from 'react-router-dom';

function nav({Type}) {
    return (
        <div className={Type}>
            <Link to='/'>
                <img src={Logo} className="Logo"/>
                <p className="Title">투표 아지트</p>
            </Link>
        </div>
    );
}

export default nav;