import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useState } from 'react';
import Timestamp from 'react-timestamp'
function preventDefault(event) {
  event.preventDefault();
}

export default function Stats({title,total}) {
  const [name,setName]=useState(title)
  const [tot,setTotal]=useState(total)
  
  return (
    <React.Fragment>
      <Title>{name}</Title>
      <Typography component="p" variant="h4">
        {tot}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
      <Timestamp /> 
      </Typography>
      
    </React.Fragment>
  );
}
