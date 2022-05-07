import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from 'axios';
import url from '../../config';
import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';

import SearchIcon from '@mui/icons-material/Search';
import FilledInput from '@mui/material/FilledInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';




export default function AllUsers() {
  var [allUsersData, setAllUsersData] = useState("")
  var [search,setSearch]=useState('')
  var [VariablealluserData,setVariablealluserData]=useState([])
  var [reload,setReload]=useState(0)
  var data = {
    token: localStorage.getItem('admin') }

  useEffect(() => {


    axios.post(`${url}/admin/allusers`, data).then((res) => {

      setAllUsersData(res.data.data)
      setVariablealluserData(res.data.data)
    })
  }, [reload]);

  function handeldeActivate(e,UserId){
    e.preventDefault()
    var data = {
      token: localStorage.getItem('admin')   ,userid:UserId
    }
    axios.post(`${url}/admin/deactivateuser`, data).then((res) => {
      setReload(reload+1)
     
    })
  }
  function handelActivate(e,UserId){
    e.preventDefault()
    var data = {
      token: localStorage.getItem('admin')  ,userid:UserId
    }
    axios.post(`${url}/admin/activateuser`, data).then((res) => {
      setReload(reload+1)
     
    })
  }
  function handleSearch(e){
    
    setVariablealluserData(allUsersData)
    
    setSearch(e.target.value)
   
    var result=allUsersData.filter(result => {
      return result.fullname.match(new RegExp(`${e.target.value}`, 'i') ) ;
    })
   
    setVariablealluserData(result)
    console.log(result)
    
  }
  return (
    <React.Fragment>
      <Title> All Users</Title>
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
      ></FilledInput>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell>FullName</TableCell>
            <TableCell>PhoneNumber</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Status</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {VariablealluserData && VariablealluserData.map((row) => (
            <TableRow key={row.userid}>
              <TableCell>{row.userid}</TableCell>
              <TableCell>{row.fullname}</TableCell>
              <TableCell>{row.phonenumber}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.status == 0 ? 
                    <><Button onClick={(e)=>{handeldeActivate(e,row.userid)}} variant="outlined" color="error">
                Deactivate
              </Button> </>:<> <Button onClick={(e)=>{handelActivate(e,row.userid)}} variant="contained" color="success">
                Activate
              </Button></>

              }</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      


    </React.Fragment>
  );
}
