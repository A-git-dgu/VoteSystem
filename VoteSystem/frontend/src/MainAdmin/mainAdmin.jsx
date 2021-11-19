import * as React from 'react';
import Button from '@mui/material/Button';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Nav from '../Main/nav';
import axios from 'axios';
import { Link } from 'react-router-dom';
import getSessionCookie, {isLogin, removeSessionCookie} from '../Login/cookies';
import styles from './mainAdmin.css';

export default function MainAdmin() {
    const [value, setValue] = React.useState([null, null]);
    const [value1, setValue1] = React.useState([null, null]);
    const [election, setElection] = React.useState([]);
    const [candidates, setCandidates] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const getAdminElection = async() => {
        const url = "http://localhost:8000/getAdminElection";
        await axios.post(url,{
            id:getSessionCookie('id')
        })
        .then(function(response) {
            setElection(response.data);
            console.log("성공");
        })
        .catch(function(error) {
            console.log("실패");
        })
    };

    const getAdminCandidate = async() => {
        const url = "http://localhost:8000/getAdminCandidate";
        await axios.post(url,{
            id:getSessionCookie('id')
        })
        .then(function(response) {
            setCandidates(response.data);
            console.log("성공");
        })
        .catch(function(error) {
            console.log("실패");
        })
    };

    React.useEffect(()=>{
        isLogin("Admin");
        getAdminElection();
        getAdminCandidate();
    },[])

    function deleteElection(){
        setOpen(false);
        const url = "http://localhost:8000/deleteElection";
        axios.post(url,{ admin_id: getSessionCookie('id')}
        )
        .then(function(response) {
            if(response.status==400){
                alert('실패했습니다.')
            }
            else {
                alert('선거 강제 종료에 성공했습니다.')
                window.location.href="/"
                //로그인 세션 만료
                removeSessionCookie();
            }
        })
        .catch(function(error) {
            alert('실패했습니다.')
            console.log("실패");
        })


    };

    return (
        <>
            <Nav Type={"Admin"}/>

            <div id="outer_form_signup">
              <div id="container">

                <p id="title_signup_admain">선거 정보
                        <button className="signupPage_Button" id="requestSignup_admain"> 정보 수정 </button></p>
                <div id="form_border_signup">
                    <div id="left_form_signup_admain">
                       <div className="each_form_signup_admain">
                            <div className="article_signup_admain">선거 이름 : </div>
                            <Input placeholder="선거 이름을 입력하세요" id="election_name" className="input_form_signup"/>
                       </div>
                       <div className="each_form_signup_admain">
                       <div className="article_signup_admain">선거 종류 : </div>
                            <NativeSelect default="select_election" className="input_form_signup_admain">
                                <option value={"select_election"}>-- 선거 선택 --</option>
                                <option id="TF" value={"select_election"}>  찬반 투표  </option>
                                <option id="who" value={"select_election"}>  후보자 투표  </option>
                            </NativeSelect>
                       </div>
                       <div className="each_form_signup_admain">
                            <div className="article_signup_admain">선거 번호 : </div>
                       </div>
                       <div className="each_form_signup_admain">
                            <div className="article_signup_admain">소속 기관 : </div>
                            <Input placeholder="소속기관을 입력하세요" id="institution" className="input_form_signup"/>
                       </div>
                    </div>
                    <div id="middle_line_signup_admain"></div>
                    <div id="right_form_signup_admain">
                        <div className="each_form_signup_admain">
                            <div className="article_signup_admain">회원 이름 : </div>
                            <Input placeholder="이름를 입력하세요." id="admin_name" className="input_form_signup"/>
                        </div>
                        <div className="each_form_signup_admain">
                            <div className="article_signup_admain">관리자 e-mail : </div>
                            <Input type="email" placeholder="dongguk@dgu.kr" className="input_form_signup" id="admin_email"/>
                        </div>
                        <div className="each_form_signup_admain">
                            <div className="article_signup_admain">선거 기간 : </div>
                            <div className="input_form_signup2">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateRangePicker
                                        startText="시작"
                                        endText="종료"
                                        value={value1}
                                        onChange={(newdate) => {
                                        setValue1(newdate);
                                        }}
                                    renderInput={(startProps, endProps) => (
                                    <React.Fragment>
                                        <TextField size="small" id="start"{...startProps} />
                                        <Box sx={{ mx: 2, fontSize:18 }}> to </Box>
                                        <TextField size="small" id="end"{...endProps} />
                                    </React.Fragment>
                                    )}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>
                        <div className="each_form_signup_admain">
                            <div className="article_signup_admain">후보자 등록기간 : </div>
                            <div className="input_form_signup2">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateRangePicker
                                       startText="시작"
                                       endText="종료"
                                      value={value}
                                      onChange={(newValue) => {
                                       setValue(newValue);
                                      }}
                                    renderInput={(startProps, endProps) => (
                                       <React.Fragment>
                                            <TextField size="small" id="enroll_start"{...startProps} />
                                            <Box sx={{ mx: 2,fontSize:18 }}> to </Box>
                                            <TextField size="small"  id="enroll_end"{...endProps} />
                                        </React.Fragment>
                                    )}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>
                    </div>
                        <div id="reg_button_signup_admain"></div>
                </div>
                <p id="title_signup_admain">후보자 정보</p>
                    <div id="form_border_signup_view">
                        <div id="form_view_candidate">
                         <div id="candidate_num">1</div>
                            <div id="candidate_info_view">
                             후보자 명
                             <div id="candidate_button">승인여부:
                                <button id="finish_button" className="signupPage_Button">승인완료</button>
                              </div>
                           </div>
                        </div>
                        <div id="form_view_candidate">
                            <div id="candidate_num">2</div>
                            <div id="candidate_info_view">
                             후보자 명
                              <div id="candidate_button">승인여부:
                                <button id="request_button" className="signupPage_Button">요청중</button>
                              </div>
                           </div>

                        </div>
                         <div id="form_view_candidate">
                         <div id="candidate_num">3</div>
                            <div id="candidate_info_view">
                             후보자 명
                             <div id="candidate_button">승인여부:
                             <button id="reject_button" className="signupPage_Button">승인거절</button>
                             </div>
                           </div>
                        </div>

                   </div>
                    <div id="button_site">
                            <button id="finish_election" className="signupPage_Button">개표하기</button>
                            <button id="delete_election" className="signupPage_Button" onClick={handleClickOpen}>선거종료</button>
                            <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                        >
                        <DialogTitle id="responsive-dialog-title">
                          {"------- 정말로 선거를 강제종료 하시겠습니까? -------"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            지금 선거를 종료하면 선거가 완전히 삭제되며 되돌릴 수 없습니다.
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button autoFocus onClick={handleClose} className="signupPage_Button">
                            취소
                          </Button>
                          <Button onClick={deleteElection} color="error" className="signupPage_Button" >
                            선거 삭제
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
               <div id="reg_button_signup_admain"></div>
              </div>
              <p>{election.election_name}</p>
              <p>{election.election_type}</p>
              <p>{election.election_num}</p>
              <p>{election.institution}</p>
              <p>{election.admin_name}</p>
              <p>{election.admin_email}</p>
              <p>{election.start_date}</p>
              <p>{election.end_date}</p>
              <p>{election.enroll_start}</p>
              <p>{election.enroll_end}</p>
              {candidates.map(candidate => (
                    <div>
                        {candidate.index} , {candidate.candidate_name}, {candidate.approval_state}
                    </div>
              ))}


            </div>

        </>
  );
}

