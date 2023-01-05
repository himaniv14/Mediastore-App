import React from "react";
import icon from './img/Olimpia_Aguillon-5.jpg';
import NavBar from './NavBar';
import Footer from "./Footer";


const ContactUs = () => {
	return (
		<div>
			<NavBar />
			<p className="text-center"> <p className= "h1">Olimpia Aguillon</p></p>
			<img src={icon} alt="icon" className= "rounded-circle"/>
			<br></br>
			<p className="h5"> My name is Olimpia Aguillon and this is my last year at San Francisco State University. 
			I am a computer engineering student who enjoys software more than hardware. I have more experience in backend, but I am very interested in learning frontend. 
			My most proficient programming language is Java, however, I do have experience with other languages and I’m also willing to learn any new ones. 
			I was born and raised in Los Angeles. I am Mexican-American and the youngest in my family. In my free time, I really like to read and work out. 
			The role I have for this project is frontend lead. Although I don’t have any experience I am excited to learn and gain some. </p>
			<Footer />
		</div>
	);
};

export default ContactUs;
