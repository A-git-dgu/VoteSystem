import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Nav from '../Main/main';

import styles from './possibleVoters.css';

// 주민등록번호에 입력 가능한 문자인지 확인 (숫자와 '-'만 가능)
function CharCanType(ch) {
    if ({ch} == '0' || {ch} == '1' || {ch} == '2' || {ch} == '3' || {ch} == '4' || {ch} == '5'
        || {ch} == '6' || {ch} == '7' || {ch} == '8' || {ch} == '9' || {ch} == '-') {
        return true;
    }
    else { return false; }
}

// 잘못된 입력 에러 메시지를 띄우는 함수
function ErrorMsgForWrongInput() {
    alert("주민등록번호의 입력이 잘못되었습니다.");
    document.getElementById("possibleVoters_ssn").value = ""
}

export default function PossibleVoters() {
    let [possibleVoter, setPossibleVoter] = useState([]);

    // 통신 메서드
    const searchApi = async()=> {
        const url = "http://localhost:8000/insertPossibleVoter";
        await axios.get(url)
        .then(function(response) {
            setPossibleVoter(response.data);
            console.log("성공");
        })
        .catch(function(error) {
            console.log("실패");
        })

    };

    useEffect(()=>{
        searchApi();
    }, [])

    function insertApi(){
        const url = "http://localhost:8000/insertPossibleVoter";
        axios.put(url,{
                election_num: 0,
                voter_ssn: document.querySelector(".newTd").textContent,
                voting_status: 0
            }
        )
        .then(function(response) {
            if(response.status==204){
                alert('실패했습니다.')
            }
            else {
                alert('성공했습니다.')
                console.log("성공");
            }
        })
        .catch(function(error) {
            alert('실패했습니다.')
            console.log("실패: ",error);
        })
    };

    return (
    <>
        <Nav Type={"Admin"}/>
        <div id="outer_form_possibleVoters">
            <div id="container_possibleVoters">
                <div><p id="title_possibleVoters">유권자 명부 등록</p></div>
                <div id="form_border_possibleVoters">
                    <div id="inner_each_possibleVoters">
                        <div className="possibleVotersSsn">등록할 유권자의 주민등록번호를 입력하세요.</div>
                        <table id="new_table">
                            <button className="" id="add_possibleVoter" className="possibleVoters_Button"
                            onClick={() => {
                                /******* 예외 처리 **********/
                                var tmp_input_id = document.getElementById("possibleVoters_ssn")
                                var input_id = ""
                                // 입력에 '-'가 포함된 경우 (예. 000000-1111111)
                                if (tmp_input_id.value[6] == '-') {
                                    if (tmp_input_id.value.length != 14) {
                                        ErrorMsgForWrongInput();
                                        return;
                                    }
                                    input_id = tmp_input_id;
                                }
                                // 입력에 '-'가 포함되지 않은 경우 (예. 0000001111111)
                                else if (tmp_input_id.value[6] != '-') {
                                    if (tmp_input_id.value.length != 13) {
                                        ErrorMsgForWrongInput();
                                        return;
                                    }
                                    tmp_input_id.value = tmp_input_id.value.slice(0, 6) + '-' + tmp_input_id.value.slice(6, 13);
                                    input_id = tmp_input_id;
                                }

                                var dashNum = 0; // '-'의 개수
                                for (var i=0; i<input_id.value.length; i++) {
                                    // 주민등록번호에 입력 가능한 문자인지 확인
                                    if (CharCanType(input_id.value[i])) {
                                        ErrorMsgForWrongInput();
                                        return;
                                    }
                                    if (input_id.value[i] == '-') { dashNum += 1; }
                                    // '-'의 개수가 2개 이상이면 잘못된 입력
                                    if (dashNum > 2) {
                                        ErrorMsgForWrongInput();
                                        return;
                                    }
                                }
                                /************************************/

                                input_id.focus()
                                var new_td = document.querySelectorAll('.newTd')
                                // 중복되는 주민등록번호 확인
                                for (var i=0; i<new_td.length; i++) {
                                    if (tmp_input_id.value == new_td[i].textContent) {
                                        alert("이미 등록된 주민등록번호입니다.")
                                        document.getElementById("possibleVoters_ssn").value = ""
                                        return
                                    }
                                }
                                var newTable = document.getElementById("new_table")
                                var newTr = document.createElement("tr")
                                var newTd = document.createElement("td")
                                var newBtn = document.createElement("button")
                                newTable.appendChild(newTr)
                                newTr.appendChild(newTd)
                                newTr.appendChild(newBtn)
                                // 클릭하면 삭제
                                newBtn.onclick = function removeNode() {
                                    newTable.removeChild(this.parentNode)
                                }

                                newBtn.textContent = "삭제"
                                newTd.textContent = document.getElementById("possibleVoters_ssn").value
                                newTd.className = "newTd"
                                newBtn.className = "newBtn"
                                document.getElementById("possibleVoters_ssn").value = ""
                                newBtn.id = document.querySelectorAll('.newBtn').length
                                newTr.id = "trNum_" + (document.querySelectorAll('.newBtn').length)

                            }}>추가</button>

                            <Input placeholder="000000-123456789"
                            className="possibleVoters_ssn" id="possibleVoters_ssn"/>
                        </table>
                    </div>
                    <div id="reg_button_possibleVoters">
                        <button className="possibleVoters_Button" id="requestPossibleVoters"
                        onClick={insertApi}>유권자 명부 등록</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}
