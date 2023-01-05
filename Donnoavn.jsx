import React from "react";
import icon from './img/avatarPlaceHolder.jpg';
import NavBar from './NavBar';
import Footer from "./Footer";

const ContactUs = () => {
return (
	<div>
		<NavBar />
		<p className="text-center"> <p className= "h1">Donnovan Jiles</p></p>
		<img src={icon} alt="icon" className= "rounded-circle"/>
		<br></br>
		<p className="h5"> Hello, My name is Donnovan Jiles. I'm 32 years old and a senior at San Francisco State, majoring in computer science. 
		I’m originally from New Orleans, Louisiana and have been living in Oakland California for 16 years. The languages I'm skilled in are Java, Python and C++. My role in this project is backend lead.
		Recreationally I enjoy meeting new people and thriving in new challenges. I am a powerlifter, personal trainer and a community volunteer.</p>
		<Footer />
	</div>
);
};

export default ContactUs;