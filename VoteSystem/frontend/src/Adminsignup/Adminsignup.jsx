import * as React from 'react';
import Button from '@mui/material/Button';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import Nav from '../Main/Main';

import styles from './Adminsignup.css';

function Adminsignup() {
    const [value, setValue] = React.useState([null, null]);
    const [value1, setValue1] = React.useState([null, null]);
    return (
    <>
    <Nav/>
    <h3 id="title">후보자 등록</h3>
        <form action="" method="post">
            <table id="table" width="100%">
                <tr>
                    <td width="50%" id="right_td">
                        <h2 id="right_td"> 선거 정보 입력</h2>
                        <p>선거 이름 <Input id="election_name" placeholder="선거 이름을 입력하세요." />
                        <Button size="small" variant="contained">중복확인</Button></p>
                        <p>선거 선택
                            <NativeSelect default="select_election">
                                <option value={"select_election"}>-- 선거 선택 --</option>
                            </NativeSelect>
                         </p>
                        <p>소속 기관 <Input id="institution" placeholder="소속 기관을 입력하세요" /></p>
                        <p>후보자 등록 기간</p>
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
                                     <TextField {...startProps} />
                                     <Box sx={{ mx: 2 }}> to </Box>
                                     <TextField {...endProps} />
                                 </React.Fragment>
                             )}
                         />
                     </LocalizationProvider>
                     <p>선거 기간</p>
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
                                    <TextField {...startProps} />
                                    <Box sx={{ mx: 2 }}> to </Box>
                                    <TextField {...endProps} />
                                </React.Fragment>
                            )}
                          />
                     </LocalizationProvider>
                     </td>
                <td width="50%" id="right_td">
                <h2 id="right_td"> 관리자 정보 입력</h2>
                    <p>관리자명<Input id="admin_name" placeholder="이름을 입력하세요." /></p>
                    <p>관리자 e-mail<Input id="email" placeholder="dongguk@dgu.kr" /></p>
                    <p>관리자 ID<Input id="admin_id" placeholder="아이디를 입력하세요(영어 대소문자 구분)" />
                     <Button size="small" variant="contained">중복확인</Button></p>
                    <p>비밀번호<Input id="pwd" placeholder="알파벳+숫자 (영어 대소문자 구분)" /></p>
                    <p>비밀번호 재확인<Input placeholder="" helperText="1000자 이내로 작성하세요."/></p>

                </td>
          </tr>
        </table>
        <div id="bottom_button">
        <Button variant="contained" type="submit">선거 개설</Button>
        </div>
      </form>
    </>
  );
}

export default Adminsignup;