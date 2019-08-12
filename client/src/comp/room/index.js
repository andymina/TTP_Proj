import React from 'react';
import Navbar from '../Navbar';
import Loading from './Loading';
import RoomCode from './RoomCode';
import Search from './Search';
import Player from './Player';
import ButtonGroup from './ButtonGroup';
import CurrentListeners from './CurrentListeners';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser, updateUser } from '../../actions/authActions';
import { updateRoom } from '../../actions/roomActions';
import axios from 'axios';
import io from 'socket.io-client';
import './Room.css';

class Room extends React.Component {
	constructor(props){
		super(props);
		this.state = { loading: true, socket: {} };
	}

	componentDidMount(){
		this.handleJoin();
	}

	handleJoin = async () => {
		// Change IP with WiFi
		const socket = io("146.95.38.175:5000");
		const { room_code } = this.props.match.params;

		socket.emit('join-room', this.props.user, room_code);
		socket.on('join-success', (user) => {
			this.props.updateUser(user);
			this.setState({ loading: false, socket: socket });
		});
		socket.on('join-error', () => {
			console.log("Error joining the room");
		});
	}

	componentWillUnmount(){
		this.state.socket.disconnect();
	}

	render(){
		if (this.state.loading) return <Loading/>;

		this.state.socket.on('update-room', (room) => {
			this.props.updateRoom(room);
		});

		return (
			<>
			<Navbar children={[{title: "Dashboard", link: "/dashboard"},
									 {title: "Profile", link: "/profile"},
									 {title: "Log out", func: this.props.logoutUser}]}/>

			<section className="bg-purple" style={{height: '92vh'}}>
				<div className="container-fluid py-3 h-100">
					<div className="row h-100">
						<Search socket={this.state.socket}/>

						<div className="col-lg-4 h-100">
								<RoomCode/>
								<Player socket={this.state.socket}/>
						</div>

						<div className="col-lg-4">
								<CurrentListeners/>

							<div className="col-lg-12">
								<h1 className="lead text-center heading">queue for later?</h1>
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
	logoutUser: PropTypes.func.isRequired,
	room: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({ user: state.auth.user, room: state.room });
export default connect(mapStateToProps, { logoutUser, updateUser, updateRoom })(Room);
