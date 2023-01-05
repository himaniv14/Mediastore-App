/* 
 * File: AboutUs.jsx
 * Author: Robert Swanson
 * Description: About us page to display all contributors to this project
 */
import React from "react";
import NavBar from './NavBar';
import { Link } from "react-router-dom";
import Footer from "./Footer";

const AboutUs = () => {
	return (
		<div>
			<NavBar ></NavBar>
			<br />
			<p className="text-center"> <p className="h1">CSC 648-03 Software Engineering</p></p>
			<p className="text-center"> <p className="h2">Fall, 2022</p></p>
			<p className="text-center"> <p className="h3">Team 3</p></p>
			<br />
			<ul className="list-inline text-center d-flex justify-content-center align-items-center">
				<ul className="list-group list-group-horizontal">
					<li className="list-group-item"> <Link to="/himani">Himani</Link></li>
					<li className="list-group-item"><Link to="/josef">Josef</Link></li>
					<li className="list-group-item"><Link to="/olimpia">Olimpia</Link></li>
					<li className="list-group-item"><Link to="/donnovan">Donnovan</Link></li>
					<li className="list-group-item"><Link to="/Yasi">Yasi</Link></li>
					<li className="list-group-item"><Link to="/robert">Robert</Link></li>
				</ul>
			</ul>
			<Footer />
		</div>
	);
};

export default AboutUs;
