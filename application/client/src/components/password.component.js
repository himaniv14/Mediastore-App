/*Olimpia Aguillon 
This is the Forgot Password page.
When a user forgets their password this page will indicate them 
to enter their email in order to regain their password. 
*/

import React, { Component } from 'react'
import NavBar from '../NavBar';
import Footer from "../Footer";

export default class Password extends Component {
    render(){
        return (
            <div>
                <NavBar />
                <form>
                    <div className="auth-wrapper">
                        <div className="auth-inner2">
                            <div className="title">
                                <h3>Forgot Password?</h3> 
                                <br></br>
                            </div>
                            {/* This will ask users to enter their email address */}
                            <label>Email address<span className="asterisk"> * </span></label>
                            <input
                                type= "email" required
                                className="form-control"
                                placeholder="Enter email"
                                pattern="^[a-zA-Z0-9]+@sfsu\.edu$"
                            />
                            {/* Once the user submits their email an alert will tell them their email has been sent */}
                            <div className= "submit-button">
                                <button className="btn btn-primary" onClick={()=>alert('Email has been sent')}>Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
                <Footer />
            </div>
        )
    }
}
