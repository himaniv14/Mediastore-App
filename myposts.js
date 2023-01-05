/*
This is User Posts page. It displays the list posts the user has uploaded
 on this website.
Author: Yasaman Pakdel
*/
import {Link} from 'react-router-dom'
import Sidebar from './sidebar';
import NavBar from './NavBar';
import Footer from './Footer';
import { uri } from './util';
import { useEffect, useState } from 'react';

function MyPosts(){

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            try {
            const email = window.sessionStorage.getItem('email');
            const request = JSON.stringify({email: email});
            const response = await fetch(`${uri}/posts`, {method: 'POST', headers: { 'Content-Type': 'application/json'}, body:  request});
            const parsedResponse = await(response.json());
            setPosts(parsedResponse);
            } catch(error) {
                console.error(error)
            }
            

        }

        fetchPosts();
    }, [])
    
  

    const [profile, setUser] = useState([]);
    const num_items = useState([]);
    useEffect(() => {
        async function fetchUser() {
            try {
            const email = window.sessionStorage.getItem('email');
            const request = JSON.stringify({email: email});
            const response = await fetch(`${uri}/profile`, {method: 'POST', headers: { 'Content-Type': 'application/json'}, body:  request});
            const parsedResponse = await(response.json());
            const num_items = parsedResponse.length;
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
                    <aside className="col-md-3"> </aside>
                    <section className='col-md-9'>
                        <Sidebar />
                         <div className="card" style={{ width: '28rem' }}>
                            <h5 className="card-header">My Posts</h5>
                                <div className="card-body">
                                    <table className="table table-bordered">
                                        <thead>
                                            <td>{posts.length} results found</td>
                                             <tr>
                                                <th>Post Name</th>
                                                <th>Status</th>
                                                <th>Date</th>
                                             </tr>
                                        </thead>
                                        <tbody> 
                                        {posts.map((posts) => (
                                            <tr key={posts.item_created_date}>
                                                <td>{posts.item_title}</td>
                                                <td>{posts.item_approved ? 'Approved' : 'Pending'}</td>
                                                <td>{posts.item_created_date}</td>
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
    );
}
export default MyPosts;
