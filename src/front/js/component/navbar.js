import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../layout";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store , actions } = useContext(Context)
	const navigate = useNavigate()

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{!store.token 
					? <button className="btn btn-primary" onClick={()=>{navigate('/login')}}>Log In</button>
					: <button className="btn btn-primary" onClick={()=>{actions.logout();navigate('/')}}>Log Out</button>} 
				</div>
			</div>
		</nav>
	);
};
