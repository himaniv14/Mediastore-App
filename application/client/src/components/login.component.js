/*Olimpia Aguillon
This is the Login page.
Users are asked to provide their email address and password.
Once these fields are provided they will be signed in.
*/

import React, {useState} from 'react'
import NavBar from '../NavBar';
import Footer from "../Footer";
import { useNavigate, useLocation } from 'react-router-dom';
import { uri } from '../util';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const post = location.state;

    const submitLogin = (e) => {
        console.log("email is: " + email);
        console.log("password is: " + password);

        e.preventDefault();

        return fetch(`${uri}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        }).then(response => response.text())
            .then(result => {
                if (result === "success") {
                    window.alert("Login was successful");
                    //Saves user state to session storage
                    sessionStorage.setItem("email", email);
                    sessionStorage.setItem("loggedIn", "true");
                    //checks if user was routed to login from another page
                    if (sessionStorage.getItem("route") !== null) {
                        const route = sessionStorage.getItem("route");
                        sessionStorage.removeItem("route");
                        //reroutes with post details if neccisary
                        if (route === "/FreePost" || route === "/Message") {
                            navigate(route, { state: post });
                        }
                        //otherwise reroutes to previous page or Home
                        navigate(route);
                    } else {
                        navigate("/");
                    }
                } else {
                    window.alert("Wrong credentials")
                }
            })
            .catch(e => window.alert(e))
    }

    return (
        <div>
            <NavBar/>
            <form onSubmit={(e) => submitLogin(e)}>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <div className="title">
                            <h3>Sign In</h3>
                        </div>
                        <div className="required-fields">
                            <p><small><span className="asterisk"> * </span> Required fields</small></p>
                        </div>
                        {/* This will ask users to enter their email address */}
                        <label>Email address<span className="asterisk"> * </span></label>
                        <input
                            type="email" required
                            className="form-control"
                            placeholder="Enter email"
                            pattern="^[a-zA-Z0-9]+@sfsu\.edu$"
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            id="email"
                        />
                        <br></br>
                        {/* This will ask users to enter their password*/}
                        <label>Password<span className="asterisk"> * </span></label>
                        <input
                            type="password" required
                            className="form-control"
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            name="password"
                        />
                        <div className="submit-button">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                        <br></br>
                        {/* This will redirect users to either the sign up page if they dont have an account
                             or to the forgot password page if they forgot their password */}
                        <p className="links">
                            Don't have an account? <a href='/signup'>Sign up</a> &emsp;&emsp;&emsp;&emsp;&ensp;Forgot <a
                            href='/password'>password?</a>
                        </p>
                    </div>
                </div>
            </form>
            <Footer/>
        </div>
    )
}

export default Login;
