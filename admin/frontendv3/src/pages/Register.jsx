import { useState } from 'react';

import Axios from 'axios'

import { NavLink } from "react-router-dom";
import '../components/style.css'

import url from '../config'

export default function Register() {
// States for registration
const [firstname, setfirstname] = useState('');
const [lastname, setlastname] = useState('');
const [telnum, settelnum] = useState('');
const [password, setPassword] = useState('');

// States for checking the errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);

// Handling the name change
const handlefirstname = (e) => {
	setfirstname(e.target.value);
	setSubmitted(false);
};

const handlelastname = (e) =>{
	setlastname(e.target.value);
	setSubmitted(false);
}

// Handling the email change
const handletelnum = (e) => {
	settelnum(e.target.value);
	setSubmitted(false);
};

// Handling the password change
const handlePassword = (e) => {
	setPassword(e.target.value);
	setSubmitted(false);
};

// Handling the form submission
const handleSubmit = (e) => {
	e.preventDefault();
	if (firstname === '' || lastname === '' || telnum === '' || password === '') {
	setError(true);
	} else {
		console.log('send data');
		Axios.post(`${url}/user/register`, {
			fullname: firstname + ' '+lastname,
			phonenumber: telnum,
			password:password,
			address: "addis"
		  }).then((response) => {
			console.log(response);
		  });
	}
};

// Showing success message
const successMessage = () => {
	return (
	<div
		className="success_reg"
		style={{
		display: submitted ? '' : 'none',
		}}>
		<h1>successfully registered!!</h1>
		
    {/* <a href="Login.jsx"></a> */}
	</div>
	);
};

// Showing error message if error is true
const errorMessage = () => {
	return (
	<div
		className="error_reg"
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
	<div className="form1">
	<div>
		<h1 className="signup">Create New Account</h1>
		<h3 className="reg_h3">Create a new account to enhance your shopping experience</h3>
	</div>

	{/* Calling to the methods */}
	<div className="messages">
		{errorMessage()}
		{successMessage()}
	</div>

	<form>
		{/* Labels and inputs for form data */}
		
		<input onChange={handlefirstname} className="input11"
		value={firstname} type="text" />
		<input onChange={handlelastname} className="input12"
		value={lastname} type="text" /><br/>
		<label className="label1">First Name</label>
		<label className="label2">Last Name</label><br/><br/>
		
		<input onChange={handletelnum} className="tel"
		value={telnum} type="tel" /><br/>
		<label className="label1">Phone number</label><br/><br/>

		{/* <label className="label">Password</label> */}
		<input onChange={handlePassword} className="pass_lab"
		value={password} type="password" /><br/>
		<label className="label1">Password</label><br/><br/>
		<button onClick={handleSubmit} className="reg_btn" type="submit">
		<b>Register</b>
		</button><br/>
		<div className="log">Already have an account ?<NavLink activeClassName="active" className="log_reg" to="/login"> login</NavLink></div>
	</form>

	{/* <form id="login" onsubmit="process(event)">
   <p>Enter your phone number:</p>
   <input id="phone" type="tel" name="phone" />
   <input type="submit" class="btn" value="Verify" />
 </form> */}

	</div>
	</>
);
}
