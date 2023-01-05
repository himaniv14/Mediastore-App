/* 
 * File: Upload.jsx
 * Author: Robert Swanson, Donnovan Jiles
 * Description: Page for uploading a file to webapp
 */
import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { uri } from './util';


const Upload = () => {
	const navigate = useNavigate();
	const [category, setCategory] = useState("Category");
	const [productName, setProductName] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	let uploadInput;

	async function handleUploadImage(event) {
		event.preventDefault();
		//If user is not logged in, save all text fields to session storage
		if (sessionStorage.getItem("loggedIn") !== "true") {
			sessionStorage.setItem("uploadProductName", productName);
			sessionStorage.setItem("uploadCategory", category);
			sessionStorage.setItem("uploadPrice", price);
			sessionStorage.setItem("uploadDescription", description);
			sessionStorage.setItem("route", "/Upload");

			window.alert("Must be logged in to post.");
			navigate('/Login');
		} else { 
			const file_data = new FormData();
			const upload_data = JSON.stringify({
				"name": event.target[0].value, "category": event.target[1].value,
				"price": event.target[2].value, "description": event.target[3].value,
				"email": sessionStorage.getItem("email")
			})
			file_data.append('file', uploadInput.files[0]);

			try {
				await fetch(`${uri}/savefile`, {
					method: 'POST',
					body: file_data
				})
				const response = await fetch(`${uri}/post`, {
					method: "POST",
					body: upload_data,
					headers: { 'Content-Type': 'application/json' }
				}).then(response => response.text())
					.then(result => {
						if (result === "success") {
							window.alert("Succefully Posted");
							navigate("/");
						} else {
							window.alert("Uplaod Failed. Please try again")
						}
					})
					.catch(e => window.alert(e))
			} catch (error) {
				console.error(error)
			}
        }
	}

	useEffect(() => {
		//If text fields are saved, load the values on render
		if (sessionStorage.getItem("loggedIn") === "true" && sessionStorage.getItem("uploadProductName") !== null) {
			setProductName(sessionStorage.getItem("uploadProductName"));
			setCategory(sessionStorage.getItem("uploadCategory"));
			setPrice(sessionStorage.getItem("uploadPrice"));
			setDescription(sessionStorage.getItem("uploadDescription"));
			
			sessionStorage.removeItem("uploadProductName");
			sessionStorage.removeItem("uploadCategory");
			sessionStorage.removeItem("uploadPrice");
			sessionStorage.removeItem("uploadDescription");
        }
	}, [])

	function handleChange(event) {
		setCategory(event.target.value);
    }

	function setCategories() {
		//Categories return from DB goes here
		const categories = { 'cat': ['Image','Audio', 'Video', 'Class'] }; //Hard coded for testing
		/*
		const options = []; //Array of <option> to be returned to dropdown

		//Populates options array for each category returned by DB
		for (let i = 0; i <= categories.cat.length - 1; i++) {
			options.push(<option key={i} value={categories.cat[i]}>{categories.cat[i]}</option>);
		}
		*/
		const options = categories.cat.map((cat, index) => <option key={index} value={cat}>{cat}</option>);
		//console.log(options);
		return options;
    }

	return (
		<div>
			<NavBar ></NavBar>
			<div className="upload-wrapper">

				<form className="upload-form container" onSubmit={handleUploadImage}>
					<br />
					<div className="title">
						<h3>Post an item</h3>
					</div>
					<br />
					<br />
					<div className="input-group mb-3 upload-group">
						<div className="upload-text"><span style={{ color: 'red' }} >*</span> Required fields</div>
					</div>
					<div className="input-group mb-3 upload-group">
						<div className="text-left upload-text">Product Name:<span style={{ color: 'red' }} >*</span></div>
						<div className="upload-gap" />
						<input
							type="text"
							className="form-control upload-input"
							placeholder="Title"
							name="productName"
							value={productName}
							onChange={(e) => setProductName(e.target.value)}
							required />
					</div>

					<div className="input-group mb-3 upload-group">
						<div className="text-left upload-text">Category:<span style={{ color: 'red' }} >*</span></div>
						<div className="upload-gap" />
						<select className="category-select upload-select required" onChange={handleChange} value={ category }>
							<option>Category</option>
							{setCategories()}
						</select>
					</div>

					<div className="input-group mb-3 upload-group">
						<div className="text-left upload-text">Price:<span style={{ color: 'red' }} >*</span></div>
						<div className="upload-gap" />
						<input
							type="text"
							className="form-control upload-input"
							placeholder="0.00" name="price"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							required />	
					</div>

					<div className="input-group mb-3 upload-group">
						<div className="text-left upload-text">Description:</div>
						<div className="upload-gap" />
						<textarea
							className="form-control upload-input"
							placeholder="Description..."
							name="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)} />
					</div>

					<div className="input-group mb-3 upload-group">
						<input className="form-control upload-file" ref={(ref) => { uploadInput = ref; }} type="file" name="file" required/>
					</div>

					<button type="submit" className="btn btn-primary upload-btn">Post</button>
				</form>
			</div>
			<Footer />
		</div>
	);
};

export default Upload;