import React, { Component } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function Test() {
  return (
      <Stack direction="row" spacing={2}>
        <Button>Primary</Button>
        <Button disabled>Disabled</Button>
        <Button href="#text-buttons">Link</Button>
      </Stack>
  );
}
export default Test;