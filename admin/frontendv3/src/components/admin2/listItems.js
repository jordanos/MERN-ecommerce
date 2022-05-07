import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Link } from 'react-router-dom';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FeedIcon from '@mui/icons-material/Feed';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
export const mainListItems = (
  <div>
    <Link to="/admin/home" style={{textDecoration:"none",color:"black"}}>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    </Link>
    <Link to="/admin/users" style={{textDecoration:"none",color:"black"}}>
    <ListItem button >
      <ListItemIcon>
        
        <PeopleIcon />

      </ListItemIcon>

      <ListItemText primary="Users" />
    </ListItem>
    </Link>
    <Link to="/admin/products" style={{textDecoration:"none",color:"black"}}>
    <ListItem button>
      <ListItemIcon>
      <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Products" />
    </ListItem>
    </Link>
    <Link to="/admin/Feeds" style={{textDecoration:"none",color:"black"}}>
    <ListItem button>
      <ListItemIcon>
        <FeedIcon></FeedIcon>
      </ListItemIcon>
      <ListItemText primary="Feeds" />
    </ListItem>
    </Link>
    <Link to="/admin/packages" style={{textDecoration:"none",color:"black"}}>
    <ListItem button>
      <ListItemIcon>
     <CardMembershipIcon></CardMembershipIcon>
      </ListItemIcon>
      <ListItemText primary="Packages" />
    </ListItem>
    </Link>
    <Link to="/admin/heroproducts" style={{textDecoration:"none",color:"black"}}>
    <ListItem button>
      <ListItemIcon>
      <ArtTrackIcon></ArtTrackIcon>
      </ListItemIcon>
      <ListItemText primary="Hero Products" />
    </ListItem>
    </Link>
    <Link to="/admin/trendingproducts" style={{textDecoration:"none",color:"black"}}>
    <ListItem button>
      <ListItemIcon>
      <TrendingUpIcon></TrendingUpIcon>
      </ListItemIcon>
      <ListItemText primary="Trending Products" />
    </ListItem>
    </Link>
    
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
