/*Olimpia Aguillon 
This is the Signup page.
Users are asked to provide their first and last name, email address, sfsu id number, and password.
Once these fields are provided they will be signed in and have an account.  
*/

import React, {useState } from 'react'
import NavBar from '../NavBar';
import Footer from "../Footer";
import { useNavigate } from 'react-router-dom';
import { uri } from '../util';

const Signup = () => {

    const [firstname, setFirstname]= useState("");
    const [lastname, setLastname]= useState("");
    const [id, setId]= useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submitLogin = (e) => {
        console.log("first name is: " + firstname);
        console.log("last name is: " + lastname);
        console.log("id is: " + id);
        console.log("email is: " + email);
        console.log("password is: " + password);
        

        e.preventDefault();

        return fetch(`${uri}/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({firstname, lastname, id, email, password})
        }).then(response => response.text())
            .then(result => {
                if (result === "success") {
                    window.alert("Registration was successful");
                    localStorage.setItem("firstname", firstname, "lastname",lastname, "id",id, "email", email);
                    navigate("/");
                } else {
                    window.alert("User is already registered or some of the fields are not valid.")
                }
            })
            .catch(e => window.alert(e))
    }

        return (
            <div>
                <NavBar />
                <form onSubmit={(e) => submitLogin(e)}>
                    <div className="auth-wrapper">
                        <div className="auth-inner1">
                            <div className="title">
                                <h3>Sign Up</h3> 
                            </div>
                        <div className="required-fields">
                            <p><small><span className="asterisk"> * </span> Required fields</small></p>
                        </div>
                        {/* This will ask users to enter their first name */}
                            <label>First name<span className="asterisk"> * </span></label>
                            <input
                                type= "text" required
                                className="form-control"
                                placeholder="First name"
                                onChange={(e) => setFirstname(e.target.value)}
                                id="firstname"
                                name="firstname"
                            />
                            <br></br>
                        {/* This will ask users to enter their last name */}
                            <label>Last name<span className="asterisk"> * </span></label>
                            <input
                                type= "text" required
                                className="form-control"
                                placeholder="Last name"
                                onChange={(e) => setLastname(e.target.value)}
                                id="lastname"
                                name="lastname"
                            />
                            <br></br>
                        {/* This will ask users to enter their sfsu id */}
                            <label>SFSU Id<span className="asterisk"> * </span></label>
                            <input
                                type= "text" required
                                className="form-control"
                                placeholder="Enter id"
                                onChange={(e) => setId(e.target.value)}
                                id="id"
                                name="id"
                            />
                            <br></br>
                        {/* This will ask users to enter their email address */}
                            <label>Email address<span className="asterisk"> * </span></label>
                            <input
                                type= "email" required
                                className="form-control"
                                placeholder="Enter email"
                                pattern="^[a-zA-Z0-9]+@sfsu\.edu$"
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                id="email"
                            />
                            <br></br>
                        {/* This will ask users to enter their password */}
                            <label>Password<span className="asterisk"> * </span></label>
                            <input
                                type= "password" required
                                className="form-control"
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                name="password"
                            />
                            <br></br>
                        {/* This will ask users to agree to terms and conditions */}
                            <div className="terms">
                                <input type="checkbox" required/>
                                <label> &nbsp; I agree to the 
                                    <a href="/"> terms and conditions</a>
                                </label>
                                </div>
                            <div className= "submit-button">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                            <br></br>
                        {/* This will redirect users if they already have an account to the login page */}
                        <p className="account">
                            Have an account? <a href='/login' >Login</a> 
                        </p>
                            </div>
                        </div>
                </form>
                <Footer />
            </div>
        )
    }
    export default Signup;
