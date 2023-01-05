/* 
 * File: NavBar.js
 * Author: Robert Swanson
 * Description: NavBar for webapp with search functionality and links to About Us, Post,
 *              Dashboard, Sign in, and register. And contains disclaimer that this is student
 *              project
 */

/*
Code reviewed by - Himani Varshney
Date - 12/09/2022
Comments - 1) Please remove commented block of code before moving to deployment server.
           2) Good use of header comments and inline comments 
           3) All URL can be moved to one place and imported from there.
*/
import { Link, useNavigate } from "react-router-dom"
import { useEffect,useState } from 'react';
import { uri } from './util';
import Logo from "./img/mediastore2.png";

const NavBar = () => {
    const [category, setCategory] = useState("all");
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();
    const [categoryOptions, setCategoryOptions] = useState([]);
 
    //Calls setCatergories() on page load
    useEffect(() => {
        async function setCategories() {
            try {
                const response = await fetch(`${uri}/categories`, {method: 'GET', headers: {'Content-Type': 'application/json'}});
                const parsedResponse = await response.json();
                setCategoryOptions(parsedResponse);
            } catch (error) {
                console.error(error);
            }
        }
        setCategories();
        setPreviousSearch();
    }, [])   

    function checkLogin() {
        var loggedIn = sessionStorage.getItem("loggedIn");

        if (loggedIn === "true") {
            return  <div className="nav-right">
                        <Link className="btn btn-lg btn-block nav-link bg-white nav-loggedin" to="/Upload">Post</Link>
                        <Link className="btn btn-lg btn-block nav-link bg-white nav-loggedin" to="/myprofile">DashBoard</Link>
                        <Link className="btn btn-lg btn-block nav-link bg-white nav-loggedin" to="/" onClick={ logout }>Logout</Link>
                    </div>
        } else {
            return  <div className="nav-right">
                        <Link className="btn btn-lg btn-block nav-link bg-white nav-loggedout" to="/Upload">Post</Link>
                        <Link className="btn btn-lg btn-block nav-link bg-white nav-loggedout" to="/Login">Sign in</Link>
                        <Link className="btn btn-lg btn-block nav-link bg-white nav-loggedout" to="/Signup">Register</Link>
                    </div>;
        }
    }

    function logout() {
        sessionStorage.clear();
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (event.target.searchData.value.match("^[A-Za-z0-9]{0,40}$") != null) {
            // prints search value and seletected category to console
            console.log("searched " + event.target.searchData.value + " in category " + category);
            sessionStorage.setItem("searchData", event.target.searchData.value);

            try {
                const response = await fetch(`${uri}/search`, {
                    method: 'POST',
                    body: JSON.stringify({ "book": event.target.searchData.value, "Category": category }),
                    headers: { 'Content-Type': 'application/json' }

                })
                //console.log(response)
                const parsedResponse = await response.json();
                console.log(parsedResponse)
                //setSearchResults(parsedResponse);
                navigate('/ResultsPage', { state: parsedResponse });
            } catch (error) {
                console.error(error)
            }
        } else {
            window.alert("Search must only contain alphanumeric characters and be less then 40 characters")
        }
    
/*        
        //array for search results to be displayed
        const resultsArray = [{ "title": "TestTitle", "description": "testbody", "author": "robby", "path": "/halloween.jpeg", "price": "free", "category": "image" }, { "title": "Test 2 Title", "body": "testbody 2", "path": "/gator.jpeg" }]; //Hard coded search results to test post and postpage

        navigate('/ResultsPage', { state: resultsArray });
        */
    }


    function handleChange(event) {
        setCategory(event.target.value);
    }

    function renderRemainingOptions() {
        if (categoryOptions.length === 0)
            return;
        
        return categoryOptions.map((value, index) => (
            <option value={value} key={`${value}_${index}`}>{value}</option>
        ))
    }

    function setPreviousSearch() {
        //console.log("In previous search [" + sessionStorage.getItem("searchData") + "]");
        if (sessionStorage.getItem("searchData") !== null) {
            //console.log("in if");
            const addText = sessionStorage.getItem("searchData");
            sessionStorage.removeItem("searchData");
            setSearchText(addText);
        } else {
            //console.log("in else");
            return "";
        }
    }

    return (
        <nav className="navbar py-0 bg-white border border-dark fixed-top">
            <div className="nav-disclaimer">
                <p>SFSU Software Engineering Project CSC 648-848, Fall 2022. For Demonstration Only</p>
            </div>
            <div className="nav-content">
                <div className="nav-left">
                    <h1 href="/"><Link className="brand nav-brand"to="/"><img id="logo" src={Logo} alt="Mediastore" /></Link></h1>
                    <Link className="btn btn-lg btn-block nav-link bg-white nav-button" to="/AboutUs">About Us</Link>
                </div>
                <form className="searchForm" onSubmit={handleSubmit}>
                    <select className="dropdown" onChange={handleChange}>
                        <option value="all">All</option>
                        {/*setCategories()*/}
                        {renderRemainingOptions()}
                    </select>
                    <input
                        type="text"
                        id="search"
                        placeholder="Search..."
                        name="searchData"
                        className="searchBar"
                        onChange={(e) => setSearchText(e.target.value)}
                        value={ searchText }
                    />
                    <button className="searchButton">Search</button>
                </form>
                { checkLogin() }
            </div>
        </nav>
    )
}
export default NavBar
