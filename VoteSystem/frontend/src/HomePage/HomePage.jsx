import React from 'react';
import styles from './HomePage.css';
import Img from '../Img/Logo.png'

import { Link } from 'react-router-dom';

function HomePage() {
    return (
    <body>
        <Link to="/loginManage">
        <div className="Home_Manage">
            <p>Manage</p>

        </div>
        </Link>
        <Link to="/loginVoter">
        <div className="Home_Vote">
                <p>Vote</p>
        </div>
        </Link>
    </body>
    );
}

export default HomePage;