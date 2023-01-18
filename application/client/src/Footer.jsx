/* 
 * File: Footer.jsx
 * Author: Robert Swanson
 * Description: Footer for website with links to Contact Us and our Policies
 */
import React from "react";
import { Link } from "react-router-dom";
import Logo from "./img/mediastore2.png";

const Footer = () => {
    return (
        <footer className= "footer py-0 bg-white border border-dark fixed-bottom">
            <Link className="btn btn-lg btn-block nav-link bg-white footer-contact" to="/">Contact Us</Link>
            <Link className="btn btn-lg btn-block nav-link bg-white footer-policy" to="/">Policy</Link>
            <h3 className="brand footer-brand-wrapper" href="/"><Link className="brand footer-brand" to="/"><img id="logo-footer" src={Logo} alt="Mediastore" /></Link></h3>
        </footer>
    );
};

export default Footer;