/* 
 * File: SearchBar.js
 * Author: Robert Swanson
 * Description: Search bar component with category pulldown menu currently not in use
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uri } from './util';

const SearchBar = ({ setSearchResults}) => {
    const [category, setCategory] = useState("all");
    const [categoryOptions, setCategoryOptions] = useState([]);
    const navigate = useNavigate();

//
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
            //Categories return from DB goes here
            // const categories = { 'categories': ['Audio', 'Video', 'Class'] }; //Hard coded for testing
     
            // const options = []; //Array of <option> to be returned to dropdown
     
            // //Populates options array for each category returned by DB
            // for (let i = 0; i <= categories.categories.length - 1; i++) {
            //     options.push(<option value={categories.categories[i]}>{categories.categories[i]}</option>);
            // }
            
            // return options;
        }
        setCategories();
    }, [])

    async function handleSubmit(event) {
        event.preventDefault();


        console.log("search term in handlesubmit !" + event.target.searchData.value + "!");
        navigate('/ResultsPage');

        console.log("search term in handlesubmit !" + event.target.searchData.value + "!");
        // prints search value and seletected category to console
        console.log("searched " + event.target.searchData.value + " in category " + category);
        
        try {
            const response = await fetch(`${uri}/search`, {
                method  : 'POST',
                body : JSON.stringify({"book":event.target.searchData.value,"Category":category}),
                headers: { 'Content-Type': 'application/json' }

            })
            //console.log(response)
            const parsedResponse = await response.json();
            console.log(parsedResponse)
            setSearchResults(parsedResponse);
        } catch (error) {
            console.error(error)
        }
        
        /*
         * TODO: Call to function to search database with "event.target.searchData.value" as the searched text
         *       and "category" as the search category. Search results get saved in "resultsArray" below.
         


        //array for search results to be displayed
        const resultsArray = [{"title": "TestTitle", "description": "testbody", "author": "robby", "path": "", "price": "free", "category": "image" }, {"title": "Test 2 Title", "body": "testbody 2", "path": "" }]; //Hard coded search results to test post and postpage

        setSearchResults(resultsArray);
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

    return (

       
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
                />
            <button className="searchButton">Search</button>
            </form>
       
        )
}

export default SearchBar