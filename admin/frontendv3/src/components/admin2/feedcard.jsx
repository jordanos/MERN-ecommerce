import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import { Card } from '@material-ui/core';
import { CardActionArea } from '@mui/material';
import { CardContent } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
import { Shimmer } from 'react-shimmer';

import react, { useEffect, useState } from "react"
import axios from 'axios'


// function refreshMessages() {
//   const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

//   return Array.from(new Array(50)).map(
//     () => messageExamples[getRandomInt(messageExamples.length)],
//   );
// }

export default function FixedBottomNavigation() {
//   const [value, setValue] = React.useState(0);
//   const ref = React.useRef(null);
//   const [messages, setMessages] = React.useState(() => refreshMessages());

//   React.useEffect(() => {
//     ref.current.ownerDocument.body.scrollTop = 0;
//     setMessages(refreshMessages());
//   }, [value, setMessages]);
  const [feed, setFeed] = useState([])
  const [isLoading, setLoading] = useState(true); 
 
  useEffect(() => {
     axios.get("http://192.168.1.3:9000/feed")
          .then(res => {
              
              const mydata = res.data.data
              setFeed(mydata);
              setLoading(false);
          })
          }, []);
          // .catch(err => {
          //  
          // })


          if(isLoading) {
            return (
              
              <Card sx={{ width: 200, height:350, display: "inline-block", borderSpacing:23,  }}>
                  <CardActionArea >
                    <CardMedia
                      component="img"
                      height="220px"
                      image='https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png'
                      alt="Picture"
                      fallback = {<Shimmer/>}
                      // sx={{  }}
                    />
                    <CardContent sx={{height:50}}>
                    <CardMedia
                    alignSelf="left"
                      borderRadius= '100pc'
                      component="img"
                      height="15px"
                      image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsRoXjTiI9izSGkiycn6lz-PjIAex1I0jFgg&usqp=CAU'                            alt="Picture"
                      fallback = {<Shimmer/>}
                      sx={{ alignSelf: 'left' ,paddingBottom: 1  }}
                    />
                    <CardMedia
                      component="img"
                      height="15px"
                      image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsRoXjTiI9izSGkiycn6lz-PjIAex1I0jFgg&usqp=CAU'                            alt="Picture"
                      alt="Picture"
                      fallback = {<Shimmer/>}
                      sx={{ paddingBottom: 1 }}
                    />
                    <CardMedia
                      component="img"
                      height="15px"
                      image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsRoXjTiI9izSGkiycn6lz-PjIAex1I0jFgg&usqp=CAU'                            alt="Picture"
                      alt="Picture"
                      fallback = {<Shimmer/>}
                      // sx={{  }}
                    />
                      {/* <Typography gutterBottom  component="div" sx={{ fontSize:12 }}>
                        ......
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        .......
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ color: 'orange' }}>
                        .......$
                      </Typography> */}
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
                            // ref={ref}
  return (
    <Box   sx={{pb: 7, marginTop:"0px", float:'left'}}>
      <CssBaseline />
      <List>
        {feed.map((feeds) => (
          <ListItem button>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" src={feeds.profileimage} />
            </ListItemAvatar>
            <ListItemText primary={feeds.fullname} secondary={feeds.date} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

// const messageExamples = [
//   {
//     primary: 'Brunch this week?',
//     secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
//     person: '/static/images/avatar/5.jpg',
//   },
//   {
//     primary: 'Birthday Gift',
//     secondary: `Do you have a suggestion for a good present for John on his work
//       anniversary. I am really confused & would love your thoughts on it.`,
//     person: '/static/images/avatar/1.jpg',
//   },
//   {
//     primary: 'Recipe to try',
//     secondary: 'I am try out this new BBQ recipe, I think this might be amazing',
//     person: '/static/images/avatar/2.jpg',
//   },
//   {
//     primary: 'Yes!',
//     secondary: 'I have the tickets to the ReactConf for this year.',
//     person: '/static/images/avatar/3.jpg',
//   },
//   {
//     primary: "Doctor's Appointment",
//     secondary: 'My appointment for the doctor was rescheduled for next Saturday.',
//     person: '/static/images/avatar/4.jpg',
//   },
//   {
//     primary: 'Discussion',
//     secondary: `Menus that are generated by the bottom app bar (such as a bottom
//       navigation drawer or overflow menu) open as bottom sheets at a higher elevation
//       than the bar.`,
//     person: '/static/images/avatar/5.jpg',
//   },
//   {
//     primary: 'Summer BBQ',
//     secondary: `Who wants to have a cookout this weekend? I just got some furniture
//       for my backyard and would love to fire up the grill.`,
//     person: '/static/images/avatar/1.jpg',
//   },
// ];
