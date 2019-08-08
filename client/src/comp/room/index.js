import React from 'react';
import Navbar from '../Navbar';
import Loading from './Loading';
import RoomCode from './RoomCode';
import Queue from './Queue';
import Player from './Player';
import ButtonGroup from './ButtonGroup';
import CurrentListeners from './CurrentListeners';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import axios from 'axios';
import io from 'socket.io-client';
import './Room.css';

// Change this.state.endpoint depending on WiFi
// HunterNet: 146.95.36.13:5000
// Home: 192.168.1.40:5000

class Room extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			socket: null,
			loading: true,
			endpoint: '192.168.1.40:5000',
			is_playing: false
		};
	}

	componentDidMount(){
		this.handleJoin();
	}

	handleJoin = async () => {
		const { room_code } = this.props.match.params;

		// Make request to the server to validate the room
		const url = "/api/rooms/join/" + room_code;
		const { data } = await axios.post(url, { room_code });
		const { isValid, error } = data;

		if (isValid){
			// Join the room
			const socket = io(this.state.endpoint);
			socket.emit('join-room', this.props.user, room_code);

			socket.on('room-update', (room) => {
				this.setState({
					socket: socket,
					loading: false,
					users: room.current_users,
					room_code: room.room_code,
					master: room.master
				});
			});
		} else {
			// Spit error
			console.log(error);
			this.setState({ loading: false });
		}
	}

	componentWillUnmount(){
		this.state.socket.disconnect();
	}

	render(){
		if (this.state.loading) return <Loading/>;

		return (
			<>
			<Navbar children={[{title: "Dashboard", link: "/dashboard"},
									 {title: "Profile", link: "/profile"},
									 {title: "Log out", func: this.props.logoutUser}]}/>

			<section className="bg-purple" style={{height: '92vh'}}>
				<div className="container-fluid py-3 h-100">
					<div className="row h-100">
						<Queue
							user={this.props.user}
							room_code={this.state.room_code}
							socket={this.state.socket}/>

						<div className="col-lg-4">
							<RoomCode code={this.state.room_code}/>

							<Player/>

							<ButtonGroup/>
						</div>

						<div className="col-lg-4">
								<CurrentListeners users={this.state.users} master={this.state.master.username}/>

							<div className="col-lg-12">
								<h1 className="lead text-center heading">chat for later?</h1>
							</div>
						</div>
					</div>
				</div>
			</section>

			</>
		);
	}
}

Room.propTypes = {
	user: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({ user: state.auth.user });
export default connect(mapStateToProps, { logoutUser })(Room);
