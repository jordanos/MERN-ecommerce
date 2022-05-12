import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../components/style.css'

import url from '../config'

import Axios from 'axios'

export default function Login() {

// States for registration
const [telnum, setName] = useState('');
const [password, setPassword] = useState('');

// States for checking the errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);

Axios.defaults.withCredentials = true;

// Handling the name change
const handleName = (e) => {
	setName(e.target.value);
	setSubmitted(false);
};

// Handling the password change
const handlePassword = (e) => {
	setPassword(e.target.value);
	setSubmitted(false);
};
// "http://192.168.1.2:9000/user/login", {
// 			  phonenumber: telnum,
// 			  password: password
// Handling the form submission
const handleSubmit = (e) => {
	
	e.preventDefault();
	if (telnum === '' || password === '') {
	setError(true);
	} else {
		
			console.log('send to');
			Axios({
				method:'post',
				header:{'content-Type':'application/json'},
				url: `${url}/user/login`,
				// phonenumber: telnum,
			    // password: password
				data:{phonenumber: telnum, password: password}
			}).then((response) => {
			  console.log(response);
			  
			});
		  
	}
};

// Showing success message
const successMessage = () => {
	return (
	<div
		className="success"
		style={{
		display: submitted ? '' : 'none',
		}}>
		{/* <h1>successfully Login!!</h1> */}
	</div>
	);
};

// Showing error message if error is true
const errorMessage = () => {
	return (
	<div
		className="error"
		style={{
		display: error ? '' : 'none',
		}}>
		<h1>Please enter all the fields</h1>
	</div>
	);
};

return (
	<>
	 <NavLink activeClassName="active" className="log_reg" to="/"><img src="logo.png" alt="Reca Shopping" width="150px"/></NavLink>
	<div className="form">
		<h1 className="login_title"><i class="fas fa-lock"></i> Log In</h1>
	{/* Calling to the methods */}
	<div className="">
		{errorMessage()}
		{successMessage()}
	</div>

	<form>
		
		{/* Labels and inputs for form data */}
		{/* <label className="label">Name</label> */}
		<input onChange={handleName} className="input"
		value={telnum} type="tel" placeholder="Phone or Email" /><br/>

		{/* <label className="label">Password</label> */}
		<input onChange={handlePassword} className="input"
		value={password} type="password" placeholder="Password"/><br/>
		<button onClick={handleSubmit} className="login_btn" type="submit">
			Continue </button><br/>
			<NavLink activeClassName="forget" to="/">Forget Password ?  </NavLink>
			<NavLink className="create" to="/register">Create Account</NavLink><br/>
		<button onClick="" className="fb_gmail_btn" ><i class="fab fa-facebook" ></i>  Continue with Facebook</button><br/>
		<button onClick="" className="fb_gmail_btn1"> <img src="google.png" alt="gmail" width="20px"/> Continue with Google</button>
		<img className="login_img" src="login.jpeg" alt="sample" />
		<div class="vl"></div>
	</form>
	</div>
	</>
);
}
