/* 
 * File: ResultsPage.jsx
 * Author: Robert Swanson
 * Description: Displays search results, number of results, and sorting functinality for results
 */

import React from "react";
import NavBar from './NavBar'
import PostPage from "./PostPage";
import { useLocation } from "react-router-dom"
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { uri } from './util';

const ResultsPage = () => {
    const location = useLocation();
    const [posts, setPosts] = useState([]);
    const [length, setLength] = useState("");
    

    useEffect(() => {
        async function getPosts() {
            try {
                const response = await fetch(`${uri}/topresults`, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
                const parsedResponse = await response.json();
                setPosts(parsedResponse);
            } catch (error) {
                console.error(error);
            } 
        }

        setLength(location.state.length);
        if (length === 0) {
            getPosts();
        } else {
            setPosts(location.state);
        }
    }, [location.state, length])

    function noResults() {
        if (length === 0) {
            return <div style={{ textAlign: 'center' }} >
                        <div>We can't seem to find anything that matches your search.</div>
                        <div>Try these posts instead.</div>
                    </div>
        }
    }

	return (
		<div>
            <NavBar ></NavBar>
            { noResults() }
            <PostPage results={posts} />
			<div className="resultsInfo">
				<div className="resultsNumber">{length} results found</div>
				</div>
			<Footer />
		</div>
	);
};

export default ResultsPage;
