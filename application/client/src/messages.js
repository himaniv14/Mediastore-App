/*
This is User Messages page. It displays the messages sent to and 
sent by this user. 
Author: Yasaman Pakdel
*/
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import Footer from './Footer';
import NavBar from './NavBar';
import Sidebar from './sidebar';
import { uri } from './util';



function MyMessages(){
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        async function fetchMessages() {
            try {
            const email = window.sessionStorage.getItem('email');
            const request = JSON.stringify({email: email});
            const response = await fetch(`${uri}/messages`, {method: 'POST', headers: { 'Content-Type': 'application/json'}, body:  request});
            const parsedResponse = await(response.json());
            setMessages(parsedResponse);
            } catch(error) {
                console.error(error)
            }
            

        }

        fetchMessages();
    }, [])

     
    const [profile, setUser] = useState([]);
    
    useEffect(() => {
        async function fetchUser() {
            try {
            const email = window.sessionStorage.getItem('email');
            const request = JSON.stringify({email: email});
            const response = await fetch(`${uri}/profile`, {method: 'POST', headers: { 'Content-Type': 'application/json'}, body:  request});
            const parsedResponse = await(response.json());
            setUser(parsedResponse);
            } catch(error) {
                console.error(error)
            }
            

        }

        fetchUser();
    }, [])

    return (
        <div>
            <NavBar />
            <div className="container mt-4">
                <p className="text-center"> <p className= "h1">Welcome {profile.user_first_name}</p></p>
                <div className="row"> 
                    <aside className="col-md-3"></aside>
                    <section className="col-md-9">
                        <Sidebar />
                        <div className="card" style={{ width: '28rem' }}>
                            <h5 className="card-header">My Messages</h5>
                            <div className="card-body">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Message</th>
                                            <th>From</th>
                                            <th>Date</th>
                                            <button className='btn btn-sm active' >Sort</button>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {messages.map((message) => (
                                            <tr key={message.message_created_date}>
                                                <td>{message.message_body_text}</td>
                                                <td>{message.user_username}</td>
                                                <td>{message.message_created_date}</td>
                                                <td><button className='btn btn-danger btn-sm active'>Delete</button></td>
                                                <td><button className="btn btn-sm active btn btn-primary btn-sm">View</button></td>
                                            </tr>
                                        ))}
                                        
                                    
                                    </tbody>
                                </table>
                            </div>
                        </div>
                     </section>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default MyMessages;
