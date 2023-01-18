/* 
 * File: HomeDemo.jsx
 * Author: Robert Swanson
 * Description: Used for horizontal prototype to showcase each page on website
 */
import React from "react";
import { Link } from "react-router-dom"

const Home = () => {
    return (
	    <div>
            <br />
            <br />
            <br />
            <br />
            <p className="text-center"> <p className= "h1">CSC 648-03 Software Engineering</p></p>
            <p className="text-center"> <p className= "h2">Fall, 2022</p></p>
            <p className="text-center"> <p className= "h3">Team 3</p></p>
            <br />
            <br />
            <ul>
                <ul className="list-inline text-center d-flex justify-content-center align-items-center">
                    <ul className="list-group list-group-horizontal">
                        <li className="list-group-item"><Link to="/Home">Home</Link></li>
                        <li className="list-group-item"><Link to="/freepost">FreePost</Link></li>
                        <li className="list-group-item"><Link to="/contactpost">ContactPost</Link></li>
                        <li className="list-group-item"><Link to="/Upload">Post</Link></li>
                        <li className="list-group-item"><Link to="/login">Login</Link></li>
                        <li className="list-group-item"><Link to="/signup">Signup</Link></li>
                        <li className="list-group-item"><Link to="/myprofile">Dashboard</Link></li>
                    </ul>
                </ul>
            </ul>
        </div>
    
    );
};

export default Home;
