import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CandidateInfo from './Candidate/candidateInput';
import PossibleVoters from './PossibleVoters/possible_voters';

function Test() {
  return (
    <CandidateInfo/>
  );
}
export default Test;