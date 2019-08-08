import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
	let items = props.children.map((k) => {
		if (k.title === "Log out"){
			return (
				<li key={k.title} className="mx-2">
					<span
						onClick={k.func}
						className="nav-item lead">
						{k.title}
					</span>
				</li>
			);
		} else {
			return (
				<li key={k.title} className="mx-2">
					<Link
						to={k.link}
						className="nav-item lead">
						{k.title}
					</Link>
				</li>
			);
		}
	});
	return (
		<nav className="navbar navbar-expand-lg bg-red">
			<div className="container-fluid">
				<Link to="" className="navbar-brand">
					<img
						src="https://via.placeholder.com/30x30"
						className="d-inline-block align-top mx-2"
						width="30"
						height="30"
						alt=""
					/>
					<span className="text-white lead">MusiqU</span>
				</Link>

				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav ml-auto">
						{items}
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
