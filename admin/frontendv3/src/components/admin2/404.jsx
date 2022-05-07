import 'bootstrap/dist/css/bootstrap.min.css'
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import './404.css'
const PageNotFound = () => {
    return ( 

        <>
       
    
            <CircularProgress color="inherit" sx={{ color: '#f7921f',position:"absolute", display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  
  minHeight: "100vh"}}/>
   
        <div className="container">
    <div className="row">
        <div className="col-md-12">
            <div className="error-template">
                <h1>
                    Oops!</h1>
                <h2>
                    404 Not Found</h2>
                <div className="error-details">
                    Sorry, an error has occured, Requested page not found!
                </div>
                <div className="error-actions">
                    <a href="" className="btn btn-primary btn-lg takemehome" ><span className="glyphicon glyphicon-home"></span>
                        Take Me Home </a><a href="" className="btn btn-default btn-lg contact"><span className="glyphicon glyphicon-envelope" ></span> Contact Support </a>
                </div>
            </div>
        </div>
    </div>
</div>
        </>
     );
}
 
export default PageNotFound;