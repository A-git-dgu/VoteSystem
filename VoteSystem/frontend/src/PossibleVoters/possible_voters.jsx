import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

import Nav from '../Main/Main'

const columns = [
  { field: 'name', headerName: '이름', width: '200' },
  { field: 'birthDate', headerName: '생년월일', width: '230' },
  { field: 'phoneNumber', headerName: '전화번호', width: '220' },
  { field: 'address', headerName: '주소', width: '320' },
];

const rows = [
  { id: 1, name: 'Snow', birthDate: 'Jon', phoneNumber: 35, address: "" },
  { id: 2, name: 'Lannister', birthDate: 'Cersei', phoneNumber: 42, address: "" },
  { id: 3, name: 'Lannister', birthDate: 'Jaime', phoneNumber: 45, address: "" },
  { id: 4, name: 'Stark', birthDate: 'Arya', phoneNumber: 16, address: "" },
  { id: 5, name: 'Targaryen', birthDate: 'Daenerys', phoneNumber: null, address: "" },
  { id: 6, name: 'Melisandre', birthDate: null, phoneNumber: 150, address: "" },
  { id: 7, name: 'Clifford', birthDate: 'Ferrara', phoneNumber: 44, address: "" },
  { id: 8, name: 'Frances', birthDate: 'Rossini', phoneNumber: 36, address: "" },
  { id: 9, name: 'Roxie', birthDate: 'Harvey', phoneNumber: 65, address: "" },
];

export default function DataTable() {
  return (
  <>
  <Nav/>
  <h3>유권자 명부 등록</h3>
    <div style={{ height: '100vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
    </>
  );
}
