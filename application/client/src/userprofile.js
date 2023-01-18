/*
This is User Dashboard page. It displays the User information, and contains
a sidebar linking to user messages and user posts page.  
Author: Yasaman Pakdel
*/
import Sidebar from './sidebar';
import NavBar from './NavBar';
import Footer from "./Footer";
import { uri } from './util';
import { useEffect, useState } from 'react';

function MyProfile() {   
    const [profile, setUser] = useState([]);

    useEffect(() => {
        async function fetchUser() {
            try {
            const email = window.sessionStorage.getItem('email');
            const request = JSON.stringify({email: email});
            const response = await fetch(`${uri}/profile`, {method: 'POST', headers: { 'Content-Type': 'application/json'}, body:  request});
            const parsedResponse = await(response.json());
            console.log(parsedResponse)
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
                    <section className='col-md-9'>
                        <Sidebar />
                        <div className='card' style={{ width: '28rem' }}>
                            <h5 className='card-header'>My Profile</h5>
                            <div className='card-body'>
                                <table className="table table-bordered">
                                    <p> First Name: {profile.user_first_name}</p>
                                    <p>  Last Name: {profile.user_last_name}</p>
                                    <p> Email: {window.sessionStorage.getItem('email')}</p>
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
export default MyProfile;
