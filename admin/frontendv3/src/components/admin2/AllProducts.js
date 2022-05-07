import * as React from 'react';
import PropTypes from 'prop-types';
import {format} from "timeago";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import axios from "axios";
import url from "../../config";
import { useState,useEffect } from 'react';
import {slide} from "react-slideshow-image";
import Button from '@mui/material/Button';
import Timestamp from 'react-timestamp'

import SearchIcon from '@mui/icons-material/Search';
import FilledInput from '@mui/material/FilledInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
const properties ={
  duration:5000,
  transitionDuration:500,
  infinite:true,
  indicators:true,
  arrows:false,
  pauseOnHover:true
}
function AllProducts() {
  var [allProductsData,setAllProductsData]=useState("")
  var [Reload,setReload]=useState(0)
  var [search,setSearch]=useState('')
  var [VariableProductData,setVariableProductData]=useState([])

  useEffect(() => {
   
    axios.post(`${url}/product`).then((res) => {

      setAllProductsData(res.data.data)

      setVariableProductData(res.data.data)
     
    })
  }, [Reload]);

  function handeldeDelete(ProductId){
    var data = {
      token: localStorage.getItem('admin')
      ,productid:ProductId
    }
    axios.post(`${url}/admin/removeproduct`, data).then((res) => {
      setReload(Reload+1)
     
    })
  }
  function handelesetasTrending(ProductId){
    var data = {
      token: localStorage.getItem('admin')
       ,trendingproductid:ProductId
    }
    axios.post(`${url}/product/settrendingproduct`, data).then((res) => {
      
      setReload(Reload+1)
     
    })
  }
  function handeleremoveasTrending(ProductId){
    var data = {
      token: localStorage.getItem('admin')
      ,trendingproductid:ProductId
    }
    axios.delete(`${url}/product/trendingproduct`, {data}).then((res) => {
      setReload(Reload+1)
      
     
    })
  }
  function handleSearch(e){
    
    setVariableProductData(allProductsData)
    
    setSearch(e.target.value)
   
    var result=allProductsData.filter(result => {
      return result.fullname.match(new RegExp(`${e.target.value}`, 'i')) || result.name.match(new RegExp(`${e.target.value}`, 'i')) ;
    })
    setVariableProductData(result)
    
  }
  return (
    <>
    <FilledInput 
      sx={{margin:'20px 0px 20px 0px',width:'91.7%'}}
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
    {VariableProductData && VariableProductData.map((row) => (
    <Grid item xs={12} md={11} mb={5}>
      <CardActionArea component="a" href="#">
       
        <Card sx={{ display: 'flex' }}>
        
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
             {row.name}
            </Typography>
            <br />
            <Typography variant="subtitle1" color="text.secondary">
             Productid:  {row.productid}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Postedby :  {row.fullname}
            </Typography>
            
            <Typography variant="subtitle1" color="text.secondary">
             Phonenumber:  {row.phonenumber}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Price:  {row.price}
            </Typography>
            
            <Typography variant="subtitle1" color="text.secondary">
             Quantity: {row.quantity}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Description:  {row.description}
            </Typography>
           
            <Typography variant="subtitle1" color="text.secondary">
             Category:  {row.category}
            </Typography>
            
            
          </CardContent>
          <CardContent sx={{ flex: 1 }}>
         
            <br />
            <br />
            
            <Typography variant="subtitle1" color="text.secondary">
              Posted Date: <Timestamp relative date={row.date } /> 
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
             Condition:  {row.productcondition}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
             Brand:  {row.brand}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              PeopleRated:  {row.ratecount}
            </Typography>
            
            <Typography variant="subtitle1" color="text.secondary">
             Rate:  {row.rate}
            </Typography>
           
            <Typography>
              <br />
             
            <Button onClick={(e)=>handeldeDelete(row.productid)} variant="outlined" color="error">
                Delete
              </Button> 
              
            </Typography>
            <Typography>
              <br />
             {row && row.istrendingproduct==0 ?
            <>
            <Button onClick={(e)=>handelesetasTrending(row.productid)} variant="outlined" color="success">
               Set As Trending
              </Button></>: <><Button onClick={(e)=>handeleremoveasTrending(row.productid)} variant="outlined" color="error">
               Remove From Trending
              </Button>
              </>
              }
            </Typography>
            
          </CardContent>
         
          
            
            <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={row.image[0]}
            alt={row.name}
          />
          

        </Card>
      </CardActionArea>
    </Grid> ))
    
  }
  </>
  );
}



export default AllProducts;
