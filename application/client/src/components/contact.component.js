/*Olimpia Aguillon
This is a post page specifically to contact the seller.
The page will show all the details of the item 
and if the user wants it will redirect them to message the seller. 
*/

import NavBar from '../NavBar';
import Footer from "../Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { uri } from '../util';

const ContactPost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const post = location.state;

    function handleClick() {
        navigate("/Message", { state: post });
    }
        return(
            <div>
                <NavBar />
                <div className="flex-container">
                    <div className="child-2">
                        <img className="free-post-image" src={`${uri}/static/thumbnail/${post.path}`} alt={post.title} />
                    </div>
                    {/* This displays the name of the item*/}
                    <div className="child-1">
                        <h1 className="post-title">{post.title}</h1>
                        <h5 className="post-seller"> Seller: {post.author} </h5>
                        
                        {/* This tells the user what category it's in and how much it costs */}
                        <p className="post-category"> Category: {post.category}</p>
                        <p className="post-price">Price: $ {post.price}</p>
                        
                        {/* This will redirect users to the messaging page in order to contact the seller */}
                        <span className="post-button-wrapper">  
                            <button type="button" className="btn btn-primary btn-lg post-button" onClick={handleClick}>Contact Seller</button>                 
                        </span> 
                    </div> 
                </div>
                <Footer />
            </div>            
        );
    }
export default ContactPost;
