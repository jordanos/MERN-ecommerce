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
const properties ={
  duration:5000,
  transitionDuration:500,
  infinite:true,
  indicators:true,
  arrows:false,
  pauseOnHover:true
}
function AllTrendingProducts() {
  var [AllTrendingProductsData,setAllTrendingProductsData]=useState("")
  var [Reload,setReload]=useState(0)
  useEffect(() => {
   
    axios.post(`${url}/product/trendingproduct`).then((res) => {
     
      setAllTrendingProductsData(res.data.data)
      
     
    })
  }, [Reload]);

  function handleRemove(ProductId){
    var data = {
      token: localStorage.getItem('admin')
           ,trendingproductid:ProductId
    }
    axios.delete(`${url}/product/trendingproduct`, {data}).then((res) => {
      
      setReload(Reload+1)
     
    })
  }

  return (
    <>
    {AllTrendingProductsData && AllTrendingProductsData.map((row) => (
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
             
            <Button onClick={(e)=>handleRemove(row.productid)} variant="outlined" color="error">
                Remove from Trending
              </Button> 
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



export default AllTrendingProducts;
