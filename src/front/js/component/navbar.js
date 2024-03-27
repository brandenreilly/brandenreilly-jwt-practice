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
				<div>
					{!store.token ? <span className="navbar-brand mb-0 h1 disabled" style={{color: 'gray'}}>Profile</span>:<Link style={{textDecoration: 'none'}} to='/private'><span className="navbar-brand mb-0 h1 profileLink">Profile</span></Link>}
				</div>
				<Link to='/' style={{textDecoration: 'none', color: 'black'}} >
					<h1 className="homeBrand">Home</h1>
				</Link>
				<div className="ml-auto">
					{!store.token 
					? <button className="btn btn-success" onClick={()=>{navigate('/login')}}>Log In</button>
					: <button className="btn btn-danger" onClick={()=>{actions.logout();navigate('/')}}>Log Out</button>} 
				</div>
			</div>
		</nav>
	);
};
