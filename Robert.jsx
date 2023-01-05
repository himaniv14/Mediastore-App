import React from "react";
import icon from './img/avatarPlaceHolder.jpg';
import NavBar from './NavBar';
import Footer from "./Footer";


const ContactUs = () => {
	return (
		<div>
			<NavBar />
			<p className="text-center"> <p className="h1">Robert Swanson</p></p>
			<img src={icon} alt="icon" className="rounded-circle" />
			<br></br>
			<p className="h5"> I am a senior at San Francisco State University studying computer science. I am on the front end team.
				I am from Southern California originally but have lived in the Bay for the last seven years. </p>
			<Footer />
		</div>
	);
};

export default ContactUs;
