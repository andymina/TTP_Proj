import React from 'react';
import axios from 'axios';
import io from 'socket.io-client';

class Room extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			users: [],
			socket: null
		};
	}

	componentDidMount(){
		// get code from URL (fix this later? seems like bad practice)
		const room_code = this.props.location.pathname.slice(6);

		// join room using code
		const socket = io('146.95.36.13:5000');
		const url = "/api/rooms/join/" + room_code;

		axios.get(url).then((res) => {
			console.log(res);
		}).catch((err) => {
			// room is bad, can't join
			// could be full, or none existent
		});

		// Don't set state unless room is confirmed to be valid
		this.setState({ socket: socket });
	}

	render(){
		const { users } = this.state;

		return (
			<h1 className="lead">on the room page</h1>
		);
	}
}

export default Room;
