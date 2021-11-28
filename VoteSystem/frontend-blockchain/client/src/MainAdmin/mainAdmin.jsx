import * as React from 'react';
import Button from '@mui/material/Button';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
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
import './mainAdmin.css';

export default function MainAdmin() {
    const [value, setValue] = React.useState([null, null]);
    const [value1, setValue1] = React.useState([null, null]);
    const [election, setElection] = React.useState([]);
    const [candidates, setCandidates] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [modifyMode, setModifyMode] = React.useState(false);
    const [name, setName] = React.useState("");
    const [type, setType] = React.useState("");
    const [institution, setInstitution] = React.useState("");
    const [adminName, setAdminName] = React.useState("");
    const [email, setEmail] = React.useState("");

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleChangeName = (event) => { setName(event.target.value); if(event.target.value=="") {setName(election.election_name);} }
    const handleChangeInstitution = (event) => { setInstitution(event.target.value); if(event.target.value=="") {setInstitution(election.institution);} }
    const handleChangeAdminName = (event) => { setAdminName(event.target.value); if(event.target.value=="") {setAdminName(election.admin_name);} }
    const handleChangeEmail = (event) => { setEmail(event.target.value); if(event.target.value=="") {setEmail(election.admin_email);}}

   const ToModify = () => {
        setModifyMode(true);
    }
    const Cancel = () => {
        setName(election.election_name);
        setType(election.election_type);
        setInstitution(election.institution);
        setAdminName(election.admin_name);
        setEmail(election.admin_email);
        setModifyMode(false);
    }
    const Save = () => {
        const url = "http://localhost:8000/setElectionModify";
        // 날짜 정보 입력
        let voteStart, voteEnd, enrollStart, enrollEnd;
        if (document.getElementById('start').value=="") {voteStart=election.start_date;}
        else {voteStart=document.getElementById('start').value;}
        if (document.getElementById('end').value=="") {voteEnd=election.end_date;}
        else {voteEnd=document.getElementById('end').value;}
        if (document.getElementById('enroll_start').value=="") {enrollStart=election.enroll_start;}
        else {enrollStart=document.getElementById('enroll_start').value;}
        if (document.getElementById('enroll_end').value=="") {enrollEnd=election.enroll_end;}
        else {enrollEnd=document.getElementById('enroll_end').value;}

        axios.put(url,{
            num: election.election_num,
            name: name,
            type: document.getElementById('type').value,
            institution: institution,
            admin_name: adminName,
            email: email,
            start_date: voteStart,
            end_date: voteEnd,
            enroll_start: enrollStart,
            enroll_end: enrollEnd
        })
        .then(function(response) {
            console.log("성공");
            window.location.href = "/mainAdmin";
        })
        .catch(function(error) {
            console.log("실패");
        })
    }
    const getAdminElection = async() => {
        const url = "http://localhost:8000/getAdminElection";
        await axios.post(url,{
            id:getSessionCookie('id')
        })
        .then(function(response) {
            setElection(response.data);
            setName(response.data.election_name);
            setType(response.data.election_type);
            setInstitution(response.data.institution);
            setAdminName(response.data.admin_name);
            setEmail(response.data.admin_email);
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
            if(response.status===400){
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

    function electionType(elec_type) {
        if (elec_type==0) { return "찬반 투표";}
        else { return "후보자 투표"}
    }

    function ballotCount() {
        window.location.href="/ballotCount/"+election.election_num;
    }

    return (
        <>
            <Nav Type={"Admin"}/>

            <div id="outer_form_mainadmin">
                <div id="container">
                    <p id="title_mainadmin">선거 정보
                        { modifyMode==false && <button className="mainadmin_Page_Button" id="requestSignup_admain" onClick={ToModify}> 정보 수정 </button> }
                        { modifyMode==true && <button className="mainadmin_Page_Button" id="cancel_admin" onClick={Cancel}> 취소 </button> }
                        { modifyMode==true && <button className="mainadmin_Page_Button" id="requestSignup_admain" onClick={Save}> 저장 </button> }
                    </p>
                    <div id="form_border_mainadmin">
                        <div id="left_form_mainadmin">
                            <div className="each_form_mainadmin">
                                <div className="article_mainadmin">선거 이름 : </div>
                                { modifyMode==false && <div className="article_print_election4user" id="election_type">
                                                        {election.election_name} </div> }
                                { modifyMode==true && <Input placeholder = {election.election_name} id="election_name" className="input_form_mainadmin" onChange={handleChangeName}/> }
                            </div>
                            <div className="each_form_mainadmin">
                            <div className="article_mainadmin">선거 종류 : </div>
                            { modifyMode==false && <div className="article_print_election4user" id="election_type">
                                                    {electionType(election.election_type)} </div> }
                            { modifyMode==true &&
                                <NativeSelect id="type" defaultValue={election.election_type} className="input_form_mainadmin">
                                    <option id="TF" value={0}>  찬반 투표  </option>
                                    <option id="who" value={1}>  후보자 투표  </option>
                                </NativeSelect> }
                            </div>
                            <div className="each_form_mainadmin">
                                <div className="article_mainadmin">선거 번호 : </div>
                                { modifyMode==false && <div className="article_print_election4user" id="election_type">
                                                        {election.election_num} </div> }
                                { modifyMode==true && <Input disabled value = {election.election_num} className="input_form_mainadmin"/> }
                            </div>
                            <div className="each_form_mainadmin">
                                <div className="article_mainadmin">소속 기관 : </div>
                                { modifyMode==false && <div className="article_print_election4user" id="election_type">
                                                        {election.institution} </div> }
                                { modifyMode==true && <Input placeholder = {election.institution} id="institution" className="input_form_mainadmin" onChange={handleChangeInstitution}/> }
                            </div>
                        </div>
                        <div id="middle_line_mainadmin"></div>
                        <div id="right_form_mainadmin">
                            <div className="each_form_mainadmin">
                                <div className="article_mainadmin">관리자 이름 : </div>
                                { modifyMode==false && <div className="article_print_election4user" id="election_type">
                                                        {election.admin_name} </div> }
                                { modifyMode==true && <Input placeholder = {election.admin_name} id="admin_name" className="input_form_mainadmin" onChange={handleChangeAdminName}/> }
                            </div>
                            <div className="each_form_mainadmin">
                                <div className="article_mainadmin">관리자 e-mail : </div>
                                { modifyMode==false && <div className="article_print_election4user" id="election_type">
                                                        {election.admin_email} </div> }
                                { modifyMode==true && <Input type="email" placeholder = {election.admin_email} className="input_form_mainadmin" id="admin_email" onChange={handleChangeEmail}/> }
                            </div>
                            <div className="each_form_mainadmin">
                                <div className="article_mainadmin">선거 기간 : </div>
                                { modifyMode==false && <div className="article_print_election4user" id="election_period">
                                                        {election.start_date} ~ {election.end_date}</div> }
                                { modifyMode==true &&
                                <div className="input_form_mainadmin2">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateRangePicker
                                            startText={election.start_date}
                                            endText={election.end_date}
                                            value={value1}
                                            onChange={(newdate) => {
                                            setValue1(newdate);
                                            }}
                                        renderInput={(startProps, endProps) => (
                                        <React.Fragment>
                                            <TextField size="small" id="start" {...startProps} />
                                            <Box sx={{ mx: 2, fontSize:18 }}> to </Box>
                                            <TextField size="small" id="end"{...endProps} />
                                        </React.Fragment>
                                        )}
                                        />
                                    </LocalizationProvider>
                                </div> }
                            </div>
                            <div className="each_form_mainadmin">
                                <div className="article_mainadmin">후보자 등록기간 : </div>
                                { modifyMode==false && <div className="article_print_election4user" id="reg_candidate_period">
                                                        {election.enroll_start} ~ {election.enroll_end}</div> }
                                { modifyMode==true &&
                                <div className="input_form_mainadmin2">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateRangePicker
                                           startText={election.enroll_start}
                                           endText={election.enroll_end}
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
                                </div> }
                            </div>
                        </div>
                        <div id="reg_button_mainadmin"></div>
                    </div>
                    <p id="title_mainadmin">후보자 정보</p>
                    <div id="form_border_mainadmin2">
                        {candidates.map(candidate => (
                        <Link to={"/viewCandidate/"+election.election_num+"/"+candidate.candidate_id} style={{textDecoration: 'none'}}>
                            <div className="form_view_candidate">
                                <div className="Count_mainAdmin">{candidate.index}. </div>
                                <div className="candidate_mainAdmin">{candidate.candidate_name}
                                    <div id="candidate_button"> 승인여부:
                                        {candidate.approval_state=="0" && <button id="request_button" className="signupPage_Button">승인중</button>}
                                        {candidate.approval_state>="1" && <button id="finish_button" className="signupPage_Button">승인완료</button>}
                                        {candidate.approval_state=="-1" && <button id="reject_button" className="signupPage_Button">승인거절</button>}
                                    </div>
                                </div>
                            </div>
                        </Link>
                        ))}
                    </div>
                    <div id="button_site">
                        { election.isBallotCount==1 ?
                            <Link to={'/electionResultAdmin/'+election.election_num}><button id="result_mainAdmin" className="mainadmin_Page_Button">결과보기</button></Link>
                            : <button id="result_mainAdmin" className="mainadmin_Page_Button" onClick={ballotCount}>개표하기</button> }
                        <button id="delete_election" className="mainadmin_Page_Button" onClick={handleClickOpen}>선거삭제</button>
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
                            <Button autoFocus onClick={handleClose} className="mainadmin_Page_Button">
                                취소
                            </Button>
                            <Button onClick={deleteElection} color="error" className="mainadmin_Page_Button" >
                                선거 삭제
                            </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                    <div id="reg_button_mainadmin"></div>
                </div>
            </div>
        </>
  );
}