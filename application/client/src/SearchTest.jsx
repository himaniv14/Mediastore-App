/* 
 * File: SearchTest.js
 * Author: Robert Swanson
 * Description: Test page for search functinality during verticle prototype
 */

import React from "react";
import SearchBar from './SearchBar'
import { useState } from 'react';
import PostPage from "./PostPage";

const SearchTest = () => {
	const [searchResults, setSearchResults] = useState([]);
	return (
		<div>
			<SearchBar setSearchResults={setSearchResults} />
			<PostPage searchResults={searchResults} />
		</div>
	);
};

export default SearchTest;
