import React from "react";

// import "./App.scss";

import Navbars from './components/Navbar/Navbars';
// import Navbarl from './components/Navbar/Navbars'

import Register  from "./pages/Register";

import PageNotfound from './components/admin2/404'

import SigninSide from './pages/SignInSide'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminLogin from "./pages/adminLogin";
import Users from "./components/admin2/Users";
import Feeds from "./components/admin2/Feeds";
import Products from "./components/admin2/Products";
import Packages from "./components/admin2/Packages";
import AdminHome from "./pages/adminHome";
import CreateHeroProducts from "./components/admin2/CreateHeroProducts";
import CreateTrending from "./components/admin2/CreateTrendingProducts";
import TrendingProducts from "./components/admin2/TrendingProducts";
import HeroProducts from "./components/admin2/HeroProducts";
function App() {
  const admin=localStorage.getItem('admin')
    return <>
    <Router>
      {/* <Navbars/> */}
      {/* <Card/> */}
      {/* <Navbarl/> */}
      <Switch>
            {/* <Route exact path="/" component={Home} />
            <Route path="/register" component={Register}/>  
            <Route path="/login" component={SigninSide} />
            <Route path="/feeds" component={Feeds} /> */}


                     <Route path="/admin/login"  >
                     {admin ==null || admin =='' || admin==undefined ? <AdminLogin/> : <AdminHome/>}
                     </Route>
                     
                    <Route exact  path="/admin/home" >
                      {admin ==null || admin =='' || admin==undefined ? <AdminLogin/> : <AdminHome/>}
                        
                     </Route> 
                     <Route exact  path="/admin/products"  >
                       {admin ==null || admin =='' || admin==undefined ? <AdminLogin/> : <Products></Products>}
                       
                     </Route>    
                     <Route exact  path="/admin/feeds"  >
                       {admin ==null || admin =='' || admin==undefined ? <AdminLogin/> : <Feeds></Feeds>}
                        
                     </Route>  
                     <Route exact  path="/admin/users"  >
                       {admin ==null || admin =='' || admin==undefined ? <AdminLogin/> : <Users></Users>}
                        
                     </Route>  
                     <Route exact  path="/admin/packages"  >
                       {admin ==null || admin =='' || admin==undefined ? <AdminLogin/> : <Packages></Packages>}
                       
                     </Route>
                     <Route exact  path="/admin/trendingproducts"  >
                       {admin ==null || admin =='' || admin==undefined ? <AdminLogin/> : <TrendingProducts></TrendingProducts>}
                       
                     </Route>  
                     <Route exact  path="/admin/heroproducts"  >
                       {admin ==null || admin =='' || admin==undefined ? <AdminLogin/> : <HeroProducts></HeroProducts>}
                     
                     </Route>
                     <Route exact  path="/admin/createtrendingproducts"  >
                       {admin ==null || admin =='' || admin==undefined ? <AdminLogin/> :<CreateTrending></CreateTrending>   }
                                       
                     </Route>  
                     <Route exact  path="/admin/createheroproducts"  >
                       {admin ==null || admin =='' || admin==undefined ? <AdminLogin/> : <CreateHeroProducts></CreateHeroProducts>}
                      
                     </Route>  
                      <Route exact  path="/admin/404" >
                      <PageNotfound></PageNotfound>
                      </Route>
                   
      </Switch>
    </Router>
  </>
};

export default App;
