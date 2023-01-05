import React from "react";
import icon from './img/picwork.jpg';
import NavBar from './NavBar';
import Footer from "./Footer";


const ContactUs = () => {
return (
	<div>
		<NavBar />
		<p className="text-center"> <p className= "h1">Josef Fiedler</p></p>
		<img src={icon} alt="icon" className= "rounded-circle"/>
		<br></br>
		<p className="h5">I am the team’s GitHub master and will usually be working on backend tasks. I used to work as an it technician, data scientist and most recently a python developer.
		</p>
		<Footer />
	</div>
);
};

export default ContactUs;
