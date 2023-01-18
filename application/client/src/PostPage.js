/* 
 * File: PostPage.js
 * Author: Robert Swanson
 * Description: Component that iterates through all post components given to it
 *              and displayes them in a grid on page
 */
import React from "react"
import Post from "./Post"
import { useEffect, useState } from "react"

const PostPage = ({ results }) => {
    const _ = require("lodash");
    let [content, setContent] = useState();

    useEffect(() => {
        let mappedResults = results.map((post, index) => <Post key={index} post={post} />);
        setContent(mappedResults);
    }, [results])
    

    function handleChange(event) {
        if (event.target.value === "asc") {
            let sorted = _.sortBy(results, ['price']);
            setContent(sorted.map((post, index) => <Post key={index} post={post} />));
        } else if (event.target.value === "desc") {
            let sorted = _.orderBy(results, ['price'], ["desc"]);
            setContent(sorted.map((post, index) => <Post key={index} post={post} />));
        }
    }

    return (
        <div>
            <div className="resultsInfo">
                <select className="sortBy" onChange={ handleChange }>
                    <option>Sort By</option>
                    <option value="asc">Price &#8593;</option>
                    <option value="desc">Price &#8595;</option>
                </select>
            </div>
            <main className="postPage">{content}</main>
        </div>
    )
}
export default PostPage