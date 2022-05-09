import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios  from "axios";
import { useHistory } from "react-router-dom";
import url from "../config";



const AdminLogin = () => {
    const history=useHistory()
const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  

    
    

  const loginSubmit = async (e) => {
    e.preventDefault();
    var data ={
        phonenumber:phonenumber,
        password:password,
        type:"admin"
    }
    var res=await axios.post(url+'/user/login',data)
    
    if(res.data.status===404){
        setErrorMessage("incorrect phone number or password")
    }
    else if(res.data.status===200){
     
      localStorage.setItem("admin",res.data.token)
      window.location.replace("/admin/home");
    }
    
    
   
  };

  return (
    <section className="vh-100" style={{backgroundColor: "#508bfc"}}>
    <div className="container py-5 h-100" >
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5" >
          <div className="card shadow-2-strong" style={{borderRadius:"1rem",width:"100%"}}>
            <div className="card-body p-5 text-center">
  
              <h3 className="mb-5">Admin</h3>
              { errorMessage &&
                    <>
                        <div className="alert alert-danger" role="alert">
                            <span>incorrect username or password</span>
                    </div>
                    </>
              }
              
              <div className="form-outline mb-4">
                <input required type="tel" id="typeEmailX-2" onChange={(e)=>setPhonenumber(e.target.value)} className="form-control form-control-lg" value={phonenumber}/>
                <label className="form-label" for="typeEmailX-2">PhoneNumber</label>
              </div>
  
              <div className="form-outline mb-4">
                <input required type="password" onChange={(e)=>setPassword(e.target.value)} id="typePasswordX-2" value={password} className="form-control form-control-lg" />
                <label className="form-label" for="typePasswordX-2">Password</label>
              </div>
  
             
              
              <button className="btn btn-primary btn-lg btn-block"onClick={loginSubmit} type="submit">Login</button>
  
             
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
 
export default AdminLogin;