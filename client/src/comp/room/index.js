import React from 'react';
import Navbar from '../Navbar';
import Loading from './Loading';
import RoomCode from './RoomCode';
import Search from './Search';
import Queue from './Queue';
import Player from './Player';
import ButtonGroup from './ButtonGroup';
import CurrentListeners from './CurrentListeners';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser, updateUser } from '../../actions/authActions';
import { updateRoom } from '../../actions/roomActions';
import isEmpty from 'is-empty';
import axios from 'axios';
import io from 'socket.io-client';
import './Room.css';

class Room extends React.Component {
	constructor(props){
		super(props);
		this.state = { loading: true, socket: {}, error: false };
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
			this.setState({ loading: false, error: true });
		});
	}

	componentWillUnmount(){
		if (!isEmpty(this.state.socket))
			this.state.socket.disconnect();
	}

	render(){
		if (this.state.loading)
			return <Loading/>;
		if (this.state.error)
			return (
				<section className="bg-purple" style={{height: '100vh'}}>
					<div className="container-fluid h-100">
						<div className="row h-100">
							<div className="col-lg-12 my-auto text-center">
								<h1 className="display-4 lead text-red my-4">Room not found</h1>
								<Link to="/dashboard" className="btn dashboard-button d-inline-block">
									Back to Dashboard
								</Link>
							</div>
						</div>
					</div>
				</section>
			);

			this.state.socket.on('update-room', (room) => {
				this.props.updateRoom(room);
			});

		return (
			<>
			<Navbar children={[{title: "Dashboard", link: "/dashboard"},
									 {title: "Profile", link: "/profile"},
									 {title: "Log out", func: this.props.logoutUser}]}/>

			<section className="bg-purple" style={{height: '92vh'}}>
				<div className="container-fluid d-flex flex-row py-3 h-100">
					<div className="col-lg-4 d-flex flex-column h-100">
						<Search socket={this.state.socket}/>
					</div>

					<div className="col-lg-4 d-flex flex-column h-100">
						<RoomCode/>
						<Player socket={this.state.socket}/>
					</div>

					<div className="col-lg-4 d-flex flex-column h-100">
						<CurrentListeners/>
						{this.props.room.queue.length > 0 ? <Queue/> : null}
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
