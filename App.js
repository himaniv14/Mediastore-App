import "./css/App.css";
// importing components from react-router-dom package
import {
BrowserRouter as Router,
Routes,
Route,
} from "react-router-dom";

// import Home component
import Home from "./Home";

// To do add your import once you made your about me page
import Olimpia from "./Olimpia";
import Robert from "./Robert";
import Josef from "./Josef";
import Yasi from "./Yasi";
import Himani from "./Himani";
import Donnovan from "./Donnoavn";
import SearchTest from "./SearchTest";
import ResultsPage from "./ResultsPage";
import Upload from "./Upload";
import AboutUs from "./AboutUs";
//import HomeDemo from "./HomeDemo";
import MyProfile from "./userprofile";
import MyMessages from "./messages";
import MyPosts from "./myposts";
import FreePost from "./components/free.component"

import ContactPost from "./components/contact.component"

import Login from "./components/login.component"
import Signup from "./components/signup.component";
import Password from "./components/password.component";
import Message from "./components/message.component";

function App() {
return (
	<>
  
	{/* This is the alias of BrowserRouter i.e. Router */}
	<Router>
		<Routes>
			{/* This route is for home component
			with exact path "/", in component props
			we passes the imported component*/}
				<Route path="/" element={<Home />} />

			
			{/* This route is for about component
			with exact path "/about", in component
			props we passes the imported component*/}


			{/* To do write your own path using your own name */}

			<Route path="/olimpia" element={<Olimpia/>} />
			<Route path="/robert" element={<Robert />} />
			<Route path="/josef" element={<Josef/>} />
			<Route path="/Yasi" element={<Yasi/>} />
			<Route path="/himani" element={<Himani/>} />
			<Route path="/donnovan" element={<Donnovan />} />
			<Route path="/SearchTest" element={<SearchTest />} />
			<Route path="/ResultsPage" element={<ResultsPage />} />
				<Route path="/Upload" element={<Upload />} />
				<Route path="/AboutUs" element={<AboutUs />} />

				<Route path="/userprofile" element={<MyProfile />} />
				<Route path="/messages" element={<MyMessages />} />
				<Route path="/myposts" element={<MyPosts />} />
				<Route path="/FreePost" element={<FreePost />} />

				<Route path="/ContactPost" element={<ContactPost />} />

				<Route path="/Login" element={<Login />} />

				<Route path="/Signup" element={<Signup />} />

				<Route path="/Password" element={<Password />} />

				<Route path="/Message" element={<Message />} />

				<Route path="/myprofile" element={<MyProfile /> } />
    
		</Routes>
	</Router>
	</>
);
}

export default App;
