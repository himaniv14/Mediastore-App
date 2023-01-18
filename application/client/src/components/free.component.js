/*Olimpia Aguilon
This is a post page specifically a free post page 
where users can download the media for free.
It will display the details of the item. 
*/


import NavBar from '../NavBar';
import Footer from "../Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import { uri } from '../util';

const FreePost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const post = location.state;
    const [path, setPath] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        if (post !== null) {
            setPath(post.path);
            setTitle(post.title);
            setAuthor(post.author);
            setPrice(post.price);
            setCategory(post.category);
        }

        if (sessionStorage.getItem("loggedIn") === "true" && sessionStorage.getItem("freePath") !== null) {
            setPath(sessionStorage.getItem("freePath"));
            setTitle(sessionStorage.getItem("freeTitle"));
            setAuthor(sessionStorage.getItem("freeAuthor"));
            setPrice(sessionStorage.getItem("freePrice"));
            setCategory(sessionStorage.getItem("freeCategory"));

            sessionStorage.removeItem("freePath");
            sessionStorage.removeItem("freeTitle");
            sessionStorage.removeItem("freeAuthor");
            sessionStorage.removeItem("freePrice");
            sessionStorage.removeItem("freeCategory");
        }

    }, [])
    //Check if user is loggedin before requesting file from DB and downloading
    function downloadPost() {
        /****************************************
        
        Call to Db for actual file instead
        of thumbnail goes here. Replace 
        post.path in fetch with actual file path

        ****************************************/

        //Fetches the file from public
        fetch(`${uri}/static/thumbnail/${path}`).then(response => {
            response.blob().then(blob => {
                //Creates object out of file
                const fileURL = window.URL.createObjectURL(blob);
                //Creates anchor values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = title;
                alink.click();
            })
        }).catch(e => window.alert("Failed to download. Please try again."))
    }

    //Checks if user is logged in. If not routes user to login and passes post details
    function checkLogin() {
        if (sessionStorage.getItem("loggedIn") !== "true") {
            sessionStorage.setItem("route", "/FreePost");

            sessionStorage.setItem("freePath", post.path);
            sessionStorage.setItem("freeTitle", post.title);
            sessionStorage.setItem("freeAuthor", post.author);
            sessionStorage.setItem("freePrice", post.price);
            sessionStorage.setItem("freeCategory", post.category);

            navigate("/Login", { state: post });
        } else {
            downloadPost();
        }
    }

        return(
            <div>
                <NavBar />
                <article className='flex-container'>
                    <div className='child-2'>
                        <img className='free-post-image' src={`${uri}/static/thumbnail/${path}`} alt={title}/>
                    </div>
                    {/* This displays the name of the item, seller, price, and category */}
                    <div className='child-1'>
                        <h1 className="post-title">{title}</h1>
                        <h5 className="post-seller"> Seller: {author} </h5>
                        <p className="post-category">Category: {category}</p>
                        <p className="post-price"> Price: $ {price}</p>
                        {/* This displays the download button*/}
                        <span clasName="post-button-wrapper">
                            <button type="button" className="btn btn-primary btn-lg post-button" onClick={checkLogin}>Download</button> 
                        </span>
                    </div>
                </article>
                <Footer />
            </div>  

        );
     }
 export default FreePost;
