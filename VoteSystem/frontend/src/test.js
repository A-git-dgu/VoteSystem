import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CandidateInfo from './Candidate/candidate_info';
//import Homepage from './Homepage/homepage'
function Test() {
  return (
    <CandidateInfo/>
  );
}
export default Test;