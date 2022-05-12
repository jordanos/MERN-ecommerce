import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AllProducts from "./AllProducts"
import { mainListItems, secondaryListItems } from './listItems';
import { useState,useEffect } from 'react';
import { Input, Button } from '@mui/material';
import { PhotoCamera } from '@material-ui/icons';
import axios from 'axios';
import url from '../../config';
import { Logout } from '@mui/icons-material';
import useLogOut from './LogOut';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Rica Shopping
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [HeroProductName, setHeroProductName] = useState("");
  const [HeroProductDescription, setHeroProductDescription] = useState("");
  const [Image, setImage] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
 
  function handleSubmit(){
    var data = {
      token: localStorage.getItem('admin') ,
      name:HeroProductName,
      description:HeroProductDescription,
      image:Image
    }
    const formData = new FormData();
        formData.append("image", file);
        formData.append("name", HeroProductName);
        formData.append("description", HeroProductDescription);
        formData.append("token", localStorage.getItem('admin'));
       
       
    axios.post(`${url}/product/heroproducts`, formData).then((res) => {
      
    if(res.data.status===404){
      setErrorMessage("Hero product creation failed")
      }
        else if(res.data.status===200){
      
          setSuccessMessage("Hero Product Creation succesful!")
       }
     
    })
  }
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Create Hero Products
            </Typography>
            <IconButton onClick={useLogOut}  color="inherit">
              
                <Logout></Logout>
              
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>{mainListItems}</List>
         
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              
              
              {/* All Products */}
              <Grid item xs={4} >
              
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                { errorMessage &&
                    <>
                        <div className="alert alert-danger"  sx={{width:"100%",margin:"10px"}} role="alert">
                            <span>{errorMessage}</span>
                    </div>
                    </>
              }
              { successMessage &&
                    <>
                        <div className="alert alert-success"  sx={{width:"100%",margin:"10px"}} role="alert">
                            <span>{successMessage}</span>
                    </div>
                    </>
              }
                <TextField id="outlined-basic" value={HeroProductName} onChange={(e)=>setHeroProductName( e.target.value)} label="Name" sx={{width:"100%",margin:"10px"}} variant="outlined" />
                <TextField id="multiline"  value={HeroProductDescription} onChange={(e)=>setHeroProductDescription( e.target.value)} label="Description" minRows={5} multiline style={{width:"100%",margin:"10px",}} variant="outlined" />
                <label htmlFor="icon-button-file" >
                  <Input accept="image/*"  id="icon-button-file" onChange={saveFile } type="file" sx={{width:"100%",margin:"10px"}} />
                  
                </label>
               
                  
               
                <Button variant="contained"  sx={{width:"100%",margin:"10px"}} onClick={handleSubmit} component="span">
                  Create
                </Button>
                </Paper>
              
            
              
                
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

 const Products = () => {
    return (  
     
    <DashboardContent></DashboardContent>
    
     );
}
 
export default Products;