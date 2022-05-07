import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FormControl,InputLabel ,Select,MenuItem} from '@mui/material';
import Title from './Title';
import  axios from 'axios';
import url from '../../config';
import { useState,useEffect } from 'react';
import Timestamp from 'react-timestamp'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FilledInput from '@mui/material/FilledInput';

import InputAdornment from '@mui/material/InputAdornment';

export default function Orders() {
  var [pendingPakages,setPendingPackages]=useState([])
  var [status,setStatus]=useState("all")
  var [restart,setRestart]=useState(0)
  var [timenow,setTimeNow]=useState(new Date())
  var [search,setSearch]=useState('')
  var [VariablePakages,setVariablePackages]=useState([])
  
 
  
  useEffect(()=>{
    var data={
      userid:1,
      status:status,
      token: localStorage.getItem('admin')
    }
    axios.post(`${url}/package/status`,data).then((res)=>{
      res.data.data.forEach(element => {
          element.phonenumber=`0${element.phonenumber}`
      });
      setPendingPackages('')
      setPendingPackages(res.data.data)
      setVariablePackages('')
      setVariablePackages(res.data.data)
      

     
    })
  },[restart,status])

  function handeldeApprove (PlanID,SubscriptionId,UserId){
    var data={
      planid:PlanID,
      subscriptionid:SubscriptionId,
      token: localStorage.getItem('admin'),
      userid:UserId
    }
    axios.post(`${url}/package/approve`,data).then((res)=>{
      console.log(res)
     setRestart(restart+1)
    })
  }
  function handelDeny (PlanID,SubscriptionId,UserId){
    var data={
      planid:PlanID,
      subscriptionid:SubscriptionId,
      token:localStorage.getItem('admin'),
      userid:UserId
    }
    axios.post(`${url}/package/deny`,data).then((res)=>{
     
      setRestart(restart+1)
    })
  }
  function handledelete(SubscriptionId){
    var data={
      
      subscriptionid:SubscriptionId,
      token:localStorage.getItem('admin'),
     
    }
    axios.delete(`${url}/package/delete`,{data}).then((res)=>{
     
      setRestart(restart+1)
    })
   
  }
  function handleSearch(e){
    
    setVariablePackages(pendingPakages)
    
    setSearch(e.target.value)
   
    var result=pendingPakages.filter(result => {
      return result.phonenumber.match(new RegExp(`${e.target.value}`, 'i')) || result.fullname.match(new RegExp(`${e.target.value}`, 'i')) ;
    })
    setVariablePackages(result)
    
  }
  return (
    <React.Fragment>
     <Title>All Package Requests</Title>
    
    <FilledInput 
      sx={{margin:'20px 0px 20px 0px'}}
      value={search}
      onChange={(e)=>handleSearch(e)}
      placeholder='Search'
       endAdornment={
        <InputAdornment position="end">
          <IconButton
           
            // onClick={}
            // onMouseDown={}
            edge="start"
          >
            < SearchIcon/>
          </IconButton>
        </InputAdornment>
      }
    />
     
      
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>FullName</TableCell>
            <TableCell>Phonenumber</TableCell>
            <TableCell>plan</TableCell>
            <TableCell>Expire date</TableCell>
            <TableCell>status</TableCell>
            <TableCell><FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Status</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={status}
        label="Status"
        onChange={(e)=>setStatus(e.target.value)}
      >
        <MenuItem value={"all"}>All</MenuItem>
        <MenuItem value={"pending"}>pending</MenuItem>
        <MenuItem value={"denied"}>denied</MenuItem>
      </Select>
    </FormControl></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {VariablePakages && VariablePakages.map((row) => (
            <TableRow key={row.planid  }>
              <TableCell>{row.fullname}</TableCell>
              <TableCell>{row.phonenumber}</TableCell>
              <TableCell>{row.planid==1 ? 'free' :  row.planid==2 ? 'basic' :  row.planid==3 ? 'premium':  row.planid==4 ? 'vip':"" }</TableCell>
              <TableCell><Timestamp relative date={row.subscription_end_timestamp } /></TableCell>
              
              <TableCell>{row.status == 0 ||row.status == 1 || row.status == 3? 
                    <><Button onClick={(e)=>handeldeApprove(row.planid,row.subscriptionid,row.userid)} variant="outlined"  color="success">
                Approve
              </Button> </>:<> <Button onClick={(e)=>handelDeny(row.planid , row.subscriptionid,row.userid)} variant="outlined" color="error" >
                Deny
              </Button></>

              }</TableCell>
              <TableCell>{row.status == 2 && row.subscription_end_timestamp < timenow.toISOString() ? 
                    <> <Button onClick={(e)=>handledelete(row.subscriptionid)} variant="contained" color="error" >
                Delete
              </Button></>:<></>

              }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </React.Fragment>
  );
}
