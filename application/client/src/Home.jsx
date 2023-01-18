/* 
 * File: Home.jsx
 * Author: Robert Swanson
 * Description: Home page with description of wesite and displays recent posts
 */
import NavBar from "./NavBar";
import PostPage from "./PostPage";
import Footer from "./Footer";
import React, { useEffect, useState } from 'react';
import { uri } from './util';

const Home = () => {
    const [post, setPost] = useState([]);
    useEffect(() => {
        async function PopulateHome() {
            try {
                const response = await fetch(`${uri}/home`, {method: 'GET', headers: {'Content-Type': 'application/json'}});
                const parsedResponse = await response.json();
                setPost(parsedResponse);
            } catch (error) {
                console.error(error);
            }
/*            setPost([
                { "title": "TestTitle", "description": "Lorem ipsum dolor sit amet, usu eu oblique fabellas maluisset, ne has eros noluisse. Zril fastidii quaestio ne nec. Ne cetero corrumpit assueverit est, sea omnis feugiat ut, cum et latine lucilius argumentum. Soleat nullam principes vix id.", "author": "robby", "path": "/halloween.jpeg", "price": "10.50", "category": "image" },
                { "title": "TestTitle", "description": "testbody", "author": "robby", "path": "/halloween.jpeg", "price": "0.00", "category": "image" },
                { "title": "TestTitle", "description": "testbody", "author": "robby", "path": "/halloween.jpeg", "price": "0.00", "category": "image" },
                { "title": "TestTitle", "description": "testbody", "author": "robby", "path": "/halloween.jpeg", "price": "0.00", "category": "image" },
                { "title": "TestTitle", "description": "testbody", "author": "robby", "path": "/halloween.jpeg", "price": "0.00", "category": "image" },
                { "title": "TestTitle", "description": "testbody", "author": "robby", "path": "/halloween.jpeg", "price": "0.00", "category": "image" },
                { "title": "TestTitle", "description": "testbody", "author": "robby", "path": "/halloween.jpeg", "price": "0.00", "category": "image" },
                { "title": "TestTitle", "description": "testbody", "author": "robby", "path": "/halloween.jpeg", "price": "0.00", "category": "image" }
            ]);
*/
        }
        PopulateHome();
    }, [])

return (
    <div>
        <NavBar></NavBar>
        <br/>
        <h4 className="home-description">
            Welcome to Media Store, the one stop shop for all your digital media needs. Here you will find photos, videos, music, and anything else you could wish for to finish your SFSU projects on time and with style.
        </h4>
        <PostPage results={post} />
        <Footer />
    </div>
    
);
};

export default Home;
