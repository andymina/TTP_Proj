import React from 'react';
import './Room.css';

const User = (props) => (
	<div className="user-container my-2">
		<div>
			<p className="lead text-red my-0 info">{props.user.username}</p>
			{props.master ? <p className="lead text-red my-0 info"><i>Music Master</i></p> : null}
		</div>
		<img
			src={props.user.imgURL}
			width={64}
			height={64}
			className="container-img rounded img mx-2"
			alt="Profile"/>
	</div>
);

export default User;
