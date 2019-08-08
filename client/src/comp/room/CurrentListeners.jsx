import React from 'react';
import User from './User';

const CurrentListeners = (props) => {
	const users = props.users.map((element) => {
		if (element.username === props.master) return <User key={element.username} user={element} master={true}/>;
		else return <User key={element.username} user={element} master={false}/>;
	});

	return (
		<>
			<p className="lead text-center my-0 text-white" style={{fontWeight: 5, fontSize: '1.5em'}}>Current listeners:</p>
			<hr className="divider my-2"/>
			{users}
		</>
	);
};

export default CurrentListeners;
