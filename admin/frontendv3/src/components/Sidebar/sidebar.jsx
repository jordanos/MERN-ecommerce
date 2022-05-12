import "./sidebar.css";
import SidebarLink from "./sidebarlink";
import Electetronics from "@mui/icons-material/ElectricalServices";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Game from "@material-ui/icons/SportsEsports"
import Sport from "@material-ui/icons/SportsBasketball"
import Category from "@mui/icons-material/Category";
import Car from "@mui/icons-material/CarRental";
import Arrow from "@mui/icons-material/ArrowForwardIos";
function Sidebar(){
  return(
    <div className="sidebar">
      <h1>Catagories</h1>
      <hr/> 
      
    <SidebarLink text="Electronics" Icon={Electetronics} />
    <SidebarLink text="Vehicle" Icon={Car} />
    <SidebarLink text="Game" Icon={Game} />
    <SidebarLink text="Cloth" Icon={MailOutlineIcon} />
    <SidebarLink text="Sport" Icon={Sport} />
    <SidebarLink text="All Catagories" Icon={Category} />
    </div>
  );
}

export default Sidebar;