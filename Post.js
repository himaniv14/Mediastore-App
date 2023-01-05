/* 
 * File: Post.js
 * Author: Robert Swanson
 * Description: Component for individual posts to be displayed using bootstrap cards
 */
import { useNavigate } from "react-router-dom";
import { uri } from './util';

const Post = ({ post }) => {
    const navigate = useNavigate();

    //Navigates to free post or contact post with post details
    //depending if the post.price is free or not 
    function handleClick() {
        if (isFree()) {
            navigate('/FreePost', { state: post });
        } else {
            navigate('/ContactPost', { state: post });
        }
    }

    //Returns true if post is free and false if not
    function isFree() {
        if (post.price === 0) {
            return true;
        } else {
            return false;
        }
    }

    //Returns contact seller or download button dependaing on if post if free or not
    function renderButton() {
        if (isFree()) {
            return <button className="btn btn-primary" onClick={handleDownloadClick}>Download</button>;
        } else {
            return <button className="btn btn-primary" onClick={handleContactClick}>Contact Seller</button>;
        }
    }

    function handleContactClick() {
        navigate('/Message', { state: post });
    }

    function handleDownloadClick() {
        checkLogin();
    }

    //Check if user is loggedin before requesting file from DB and downloading
    function downloadPost() {
        var path = "";
        var title = "";

        if (post === null) {
            path = sessionStorage.getItem("freePath");
            title = sessionStorage.getItem("freeTitle");
        } else {
            path = post.path;
            title = post.title;
        }
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

    return (
        <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src={`${uri}/static/thumbnail/${post.path}`} alt={post.title}/>
            <div className="card-body">
                <h5 className="card-title">{post.title }</h5>
                <p className="card-text text-truncate">{post.description}</p>
                <p className="card-text">Seller: {post.author}</p>
                {/* Calls is free and renders as Free instead of 0.00 if returned true */}
                <p className="card-text">Price: { isFree() ? 'Free' :  "$" + post.price}</p>
                <div className="card-button-wrapper">
                    <button className="btn btn-secondary" onClick={handleClick}>Details</button>
                    { renderButton() }
                </div>
            </div>
        </div>
    )
}
export default Post