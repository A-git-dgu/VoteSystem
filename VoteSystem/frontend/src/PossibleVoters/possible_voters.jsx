import React, {useState, useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'
import Button from '@mui/material/Button';
import Nav from '../Main/Main'

const columns = [
  { field: 'name', headerName: '이름', width: '200' },
  { field: 'user_ssn', headerName: '생년월일', width: '230' },
  { field: 'phonenumber', headerName: '전화번호', width: '220' },
  { field: 'address', headerName: '주소', width: '320' },
];


export default function DataTable() {
    let [users, setUsers] = useState([]);

    // 통신 메서드
    const searchApi = async()=> {
        const url = "http://localhost:8000/getUser";
        await axios.get(url)
        .then(function(response) {
            setUsers(response.data);
            console.log("성공");
        })
        .catch(function(error) {
            console.log("실패");
        })

    };

    useEffect(()=>{
        searchApi();
    }, [])

  return (
  <>
  <Nav/>
  <h3>유권자 명부 등록</h3>
    <div style={{ height: '100vh', width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
    <div>
        <Button variant="contained"
        style={{position: 'fixed', bottom: '10px', right:'10px'}}>유권자 명부 등록</Button>
    </div>
    </>
  );
}
