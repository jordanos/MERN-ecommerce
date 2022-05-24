import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import axios from "axios";
import url from "../../config";
import { useState, useEffect } from "react";

import Button from "@mui/material/Button";

import SearchIcon from "@mui/icons-material/Search";
import FilledInput from "@mui/material/FilledInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

export default function AllUsers() {
  var [allUsersData, setAllUsersData] = useState("");
  var [search, setSearch] = useState("");
  var [VariablealluserData, setVariablealluserData] = useState([]);
  var [reload, setReload] = useState(0);
  /*   var data = {
    token: localStorage.getItem('admin') } */

  const [Data, setData] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${url}/api/v1/users/`)
      .then((res) => {
        setData(res.data.data);

        setVariablealluserData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  /*  const loadData = async () => {
    const response = await axios.get(`${url}/api/v1/users/`);
    setData(response);
    console.log(response.data);
  };

  useEffect(() => {
    loadData();
  }, []); */

  /*  useEffect(() => {


    axios.get(`${url}/api/v1/users`, data).then((res) => {
      setAllUsersData(res.data.data)
     //  setVariablealluserData(res.data.data)
    })
  }, [reload]); */

  /*   function handeldeActivate(e,UserId){
    e.preventDefault()
    var data = {
      token: localStorage.getItem('admin')   ,userid:UserId
    }
    axios.post(`${url}/admin/deactivateuser`, data).then((res) => {
      setReload(reload+1)
     
    })
  } */

  /*   function handelActivate(e,UserId){
    e.preventDefault()
    var data = {
      token: localStorage.getItem('admin')  ,userid:UserId
    }
    axios.post(`${url}/admin/activateuser`, data).then((res) => {
      setReload(reload+1)
     
    })
  } */

  function handleSearch(e) {
    setVariablealluserData(Data);

    setSearch(e.target.value);

    var result = Data.filter((result) => {
      return result.name.match(new RegExp(`${e.target.value}`, "i"));
    });

    setVariablealluserData(result);
    console.log(result);
  }

  return (
    <React.Fragment>
      <Title> All Users</Title>
      <FilledInput
        sx={{ margin: "20px 0px 20px 0px" }}
        value={search}
        onChange={(e) => handleSearch(e)}
        placeholder="Search"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              // onClick={}
              // onMouseDown={}
              edge="start"
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      ></FilledInput>
      <Table size="small">
        <tbody>
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
          {VariablealluserData &&
            VariablealluserData.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>{item.status}</td>
                </tr>
              );
            })}
          ;
        </tbody>
      </Table>
    </React.Fragment>
  );
}
