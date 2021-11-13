import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';

import styles from './candidate_info.css';
import Nav from '../Main/Main'
import axios from 'axios'

export default function CandidateInfo() {

    let [elections, setElections] = useState([]);

    // 통신 메서드
    const searchApi = async()=> {
        const url = "http://localhost:8000/getElection";
        await axios.get(url)
        .then(function(response) {
            setElections(response.data);
            console.log("성공");
        })
        .catch(function(error) {
            console.log("실패");
        })

    };

    useEffect(()=>{
        searchApi();
    }, [])
    console.log(elections)

    function insertApi(){
        const url = "http://localhost:8000/insertCandidate";
        axios.put(url,{
                election_id: document.getElementById('election').value,
                candidate_ssn: document.getElementById('fssn').value+'-'+document.getElementById('lssn').value,
                email: document.getElementById('email').value,
                introduceself: document.getElementById('introduceself').value,
                electionpledge:document.getElementById('electionpledge').value,
                carrer: document.getElementById('carrer').value


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
            console.log("실패");
        })

    };

  return (
  <>
    <Nav/>
    <h3 id="title">후보자 등록</h3>
      <form action="" method="post">
        <table id="table" width="100%">
            <tr>
                <td width="50%" id="left_td">
                    <p>선거 선택
                        <NativeSelect default="select_election" id="election">
                            <option value={"select_election"}>-- 선거 선택 --</option>
                            if(elections.length>0){
                                elections.map((election) => (
                                <option value={election.electionnumber}>{election.name}</option>

                                ))
                            }
                        </NativeSelect>
                    </p>
                    <p>이름 <Input placeholder="내용을 입력하세요." id="name"/></p>
                    <p>주민등록번호 <Input className="ssn" placeholder="000000" id="fssn"/>
                        - <Input className="ssn" type="password" placeholder="1234567" id="lssn"/></p>
                    <p>전화번호 <Input type="tel" placeholder="010-0000-0000" id="phonenumber"/></p>
                    <p>이메일 <Input type="email" placeholder="dongguk@dgu.kr" id="email"/></p>
                    <p>주소 <TextField multiline cols="22px" placeholder="주소를 입력하세요." id="address"></TextField></p>
                </td>
                <td width="50%" id="right_td">
                    <p>
                        소개 <TextField multiline maxRows={4} rows="5"
                        placeholder="자유롭게 본인을 소개하세요."
                        helperText="500자 이내로 작성하세요." id="introduceself"
                        fullWidth></TextField>
                    </p>
                    <p>
                        이력 <TextField multiline maxRows={4} rows="5"
                        placeholder="예)20xx년~20xx년 학생회 집행부"
                        helperText="1000자 이내로 작성하세요." id="carrer"
                        fullWidth></TextField>
                    </p>
                    <p>
                        공약 <TextField multiline maxRows={4} rows="5"
                        placeholder="본인의 공약을 자세히 작성하세요."
                        helperText="1000자 이내로 작성하세요." id="electionpledge"
                        fullWidth></TextField>
                    </p>
                </td>
          </tr>
        </table>
        <div id="bottom_button">
        <Button variant="contained" type="button" onClick={insertApi}>후보자 등록</Button>
        후보자 등록 정보는 "회원정보 수정"에서 수정 가능합니다.</div>
      </form>
    </>
  );
}