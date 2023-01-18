/* Olimpia Aguillon
This is the contact seller message page. 
If a user wants an item that is not free they will be redirected to this page 
where they can send a message to the seller. 
The message will have the name of the item the date and the message the user wants to ask. 
*/
import React, {useState, useEffect} from 'react'
import NavBar from '../NavBar';
import Footer from "../Footer";
import { useNavigate, useLocation } from 'react-router-dom';
import { uri } from '../util';

const Message = () => {
    const location = useLocation();
    const post = location.state;
    const [date, setDate] = useState("");
    const [message, setMessage] = useState("");
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const navigate = useNavigate();
 

    useEffect(() => {
        setFields();
    }, [])

    function setFields() {
        if (post !== null) {
            setAuthor(post.author);
            setTitle(post.title);
        }


        //If text fields are saved, load the values on render
        if (sessionStorage.getItem("loggedIn") === "true" && sessionStorage.getItem("message") !== null) {
            setDate(sessionStorage.getItem("date"));
            setMessage(sessionStorage.getItem("message"));
            setAuthor(sessionStorage.getItem("author"));
            setTitle(sessionStorage.getItem("title"));

            sessionStorage.removeItem("date");
            sessionStorage.removeItem("message");
            sessionStorage.removeItem("author");
            sessionStorage.removeItem("title");
        }
    }

    const submitLogin = (e) => {
        console.log("date is: " + date);
        console.log("message is: " + message);
        console.log("author is: " + author);
        console.log("title is: " + title);
        e.preventDefault();

        //If user is not logged in, save form to sessionStorage adn reroute to logion
        if (sessionStorage.getItem("loggedIn") !== "true") {
            sessionStorage.setItem("message", message);
            sessionStorage.setItem("date", date);
            sessionStorage.setItem("author", author);
            sessionStorage.setItem("title", title);
            sessionStorage.setItem("route", "/Message");

            window.alert("Must be logged in to send message.");

            navigate('/Login', { state: post });
        } else {
            const email = sessionStorage.getItem("email")
            return fetch(`${uri}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date, message, author, email })
            }).then(response => response.text())
                .then(result => {
                    if (result === "success") {
                        window.alert("Message sent");
                        navigate("/");
                    } else {
                        window.alert("Unable to send")
                    }
                })
                .catch(e => window.alert(e))
        }
     }
        return (
            <div>
                <NavBar />
                <div className="auth-inner3">
                    <form onSubmit={(e) => submitLogin(e)}>
                        <div className="title">
                            <h3>Contact Seller</h3> 
                        </div>
                        {/* This will ask users to enter the sellers name*/}
                        <label>Send message to: </label>
                        <input 
                            type="text"
                            className="form-control"
                            value={ author }
                        />
                        <br></br>
                        {/* This will display the date */}
                        <label>Date: </label>
                        <input 
                            type="date"
                            className="form-control"
                            placeholder="Enter date"
                            onChange={(e) => setDate(e.target.value)}
                            name="date"
                            id="date"
                            value={ date }
                        />
                        <br></br>
                        {/* This will display the name of the item */}
                        <label>Title: </label>
                        <input 
                            type="text"
                            className="form-control"
                            value={ title }
                        />
                        <br></br>
                        {/* This will be the place the user will write their message */}
                        <label>Message: </label>
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Write message"
                            onChange={(e) => setMessage(e.target.value)}
                            name="message"
                            id="message"
                            value={ message }
                        />
                        <div className= "submit-button">
                            <button type="submit" className="btn btn-primary">
                                Send
                            </button>
                        </div>   
                    </form>   
                </div>
                <Footer />
            </div>
        )
    }
export default Message;
