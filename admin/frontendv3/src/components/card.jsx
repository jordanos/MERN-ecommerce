import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


import { Image, Shimmer } from 'react-shimmer'


import react, { useEffect, useState } from "react"
import axios from 'axios'
import { CenterFocusWeakTwoTone } from '@mui/icons-material';

export default function ActionAreaCard() {
        const [products, setProducts] = useState([])
        const [isLoading, setLoading] = useState(true); 
        useEffect(() => {
           axios.get("http://192.168.1.2:9000/product")
                .then(res => {
                    console.log(res);
                    const mydata = res.data.data
                    setProducts(mydata);
                    setLoading(false);
                })
                }, []);
                // .catch(err => {
                //     console.log(err);
                // })


                if(isLoading) {
                  return (
                    
                    <Card sx={{ maxWidth: 150, maxHeight:350, display: "inline-block", borderSpacing:23  }}>
                        <CardActionArea >
                          <CardMedia
                            component="img"
                            height="64px"
                            image='https://source.unsplash.com/random/800x600'
                            alt="Picture"
                            fallback = {<Shimmer/>}
                            // sx={{  }}
                          />
                          <CardContent sx={{ height:50, paddingBottom:2}}>
                            <Typography gutterBottom  component="div" sx={{ fontSize:12 }}>
                              ......
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              .......
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ color: 'orange' }}>
                              .......$
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                                    //   <div>
                                    //     <Image
                                    //       src='https://source.unsplash.com/random/800x600'
                                    //       fallback={<Shimmer width={800} height={600} />}
                                    //     />
                                    // </div>
                                    )
                                  }
        
  return (
      <>
    {products.map((post) => (
        <Card sx={{ minWidth: 250, minHeight:250, display: "inline-block", columnGap:34 }}>
      <CardActionArea >
        <CardMedia
          component="img"
          height="174px"
          image={post.image}
          alt="Picture"
          // fallback = {<Shimmer/>}
          // sx={{ alignItems:CenterFocusWeakTwoTone }}
        />
        <CardContent sx={{ height:50, paddingBottom:2}}>
          <Typography gutterBottom  component="div" sx={{ fontSize:12 }}>
            {post.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.fullname}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ color: 'orange' }}>
            {post.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
        ))
}
    </>
  );
}
