import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';

import styles_test from './twoSegInputForm.css';
import Nav from '../Main/main'

export default function ExampleInput() {
    return (
        <>
            <Nav/>
            <div id="title">후보자 등록</div>
            <div id="outer_form">
                <div id="form_border">
                    <div id="left_form">
                        <div className="each_form">예시 1
                        {/* 입력 예시 */}
                        </div>
                        <div className="each_form">예시 2
                        {/* 입력 예시 */}
                        </div>
                        <div className="each_form">예시 2
                        {/* 입력 예시 */}
                        </div>
                    </div>
                    <div id="right_form">
                        <div>

                        </div>
                        <div>

                        </div>
                        <div>

                        </div>
                    </div>
                </div>
                <div id="reg_button">
                    <Button variant="contained" type="button">후보자 등록</Button>
                </div>
            </div>
        </>
    );
}