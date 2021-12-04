import * as React from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Nav from '../Main/nav';
import './viewCandidate.css';
import getSessionCookie, { isLogin } from '../Login/cookies';

import axios from 'axios';

export default function MainAdmin({match}) {
    const { electionNum } = useParams();
    const { candidateId } = useParams();
    let [candidate, setCandidate] = React.useState([]);
    const [isChecked, setCheck] = React.useState(false);

    // 후보자 정보 불러오기
    const getAdminCandidateInfo = async() => {
        const url = "http://localhost:8000/getAdminCandidateInfo";
        await axios.post(url,{
            election_num:electionNum,
            candidate_id:candidateId
        })
        .then(function(response) {
            setCandidate(response.data);
            console.log("성공");
        })
        .catch(function(error) {
            console.log("실패");
        })
    };
    function requestApproval() {
        const url = "http://localhost:8000/requestApproval";
        if (isChecked===false) {
            alert("모든 서류의 제출을 확인하세요.");
            return;
        }
        // 삽입
        axios.put(url,{
            election_num:electionNum,
            candidate_id:candidateId
        })
        .then(function(response) {
            console.log("성공");
            alert('승인이 완료되었습니다.');
            document.location.href='/mainAdmin';
        })
        .catch(function(error) {
            alert('서버 연결실패')
            console.log("실패");
        })
    };
    function requestReject() {
        const url = "http://localhost:8000/requestReject";
        if (isChecked===false) {
            alert("모든 서류의 제출을 확인하세요.");
            return;
        }
        // 삽입
        axios.put(url,{
            election_num:electionNum,
            candidate_id:candidateId
        })
        .then(function(response) {
            console.log("성공");
            alert('승인이 거절되었습니다.');
            document.location.href='/mainAdmin';
        })
        .catch(function(error) {
            alert('서버 연결실패')
            console.log("실패");
        })
    };
    function changeCheck() {
        if (isChecked===true) {
            setCheck(false);
            console.log(isChecked);
        }
        else if (isChecked===false) {
            setCheck(true);
            console.log(isChecked);
        }
    }
    React.useEffect(()=>{
        isLogin("Admin");
        getAdminCandidateInfo();
    },[])

    return (
        <>
            <Nav Type={"Admin"}/>

            <div id="outer_form_viewCandidate">
                <div id="container">

                    <p id="title_viewCandidate">후보자 상세정보</p>
                    <div id="form_border_viewCandidate">
                        <div id="left_form_viewCandidate">
                           <div className="each_form_viewCandidate">
                                <div className="article_viewCandidate">대표자 이름 : {candidate.name}</div>
                           </div>
                           <div className="each_form_viewCandidate">
                                <div className="article_viewCandidate">주민등록번호 : {candidate.ssn}</div>
                           </div>
                        </div>
                        <div id="middle_line_viewCandidate"></div>
                        <div id="right_form_viewCandidate">
                            <div className="each_form_viewCandidate">
                                <div className="article_viewCandidate">전화번호 : {candidate.phonenumber}</div>
                            </div>
                            <div className="each_form_viewCandidate">
                                <div className="article_viewCandidate">e-mail : {candidate.email}</div>
                            </div>
                        </div>
                        <div id="bottom_form">
                            <div className="each_form_viewCandidate">
                                <div className="article_viewCandidate">소개: </div>
                                <div className="introduce">{candidate.introduce}</div>
                            </div>
                            <div className="each_form_viewCandidate">
                                <div className="article_viewCandidate">이력: </div>
                                <div className="introduce">{candidate.career}</div>
                            </div>
                            <div className="each_form_viewCandidate2">
                                <div className="article_viewCandidate">공약: </div>
                                <div className="introduce">{candidate.pledge}</div>
                            </div>
                           {candidate.approval_state=="0" && <div id="checkDocument" className="each_form_viewCandidate">
                                모든서류의 제출을 확인하였습니다:
                                <Checkbox onClick={changeCheck}/>
                            </div>}
                           {candidate.approval_state=="-1" && <div id="checkDocument" className="each_form_viewCandidate">
                                &nbsp;
                            </div>}
                           {candidate.approval_state>="1" && <div id="checkDocument" className="each_form_viewCandidate">
                                &nbsp;
                            </div>}
                        </div>
                        <div id="bottom_viewCandidate">
                            { candidate.approval_state=="0" && <button id="request_button_viewCandidate" className="viewCandidate_Button" onClick={requestApproval}>승인</button>}
                            { candidate.approval_state=="0" && <button id="reject_button_viewCandidate" className="viewCandidate_Button" onClick={requestReject}>거절</button>}
                            { candidate.approval_state=="-1" && <button id="finish_button_viewCandidate" className="viewCandidate_Button">승인거절</button>}
                            { candidate.approval_state>="1" && <button id="finish_button_viewCandidate" className="viewCandidate_Button">승인완료</button>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}