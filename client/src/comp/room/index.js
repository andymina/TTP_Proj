import React from 'react';
import Navbar from '../Navbar';
import Loading from './Loading';
import RoomCode from './RoomCode';
import Queue from './Queue';
import Player from './Player';
import ButtonGroup from './ButtonGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import axios from 'axios';
import io from 'socket.io-client';

class Room extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			socket: null,
			loading: true
		};
	}

	componentDidMount(){
		this.handleJoin();
	}

	handleJoin = async () => {
		const { room_code } = this.props.match.params;
		const { user } = this.props.auth;

		// Make request to the server to validate the room
		const url = "/api/rooms/join/" + room_code;
		const { data } = await axios.post(url, { room_code: room_code });
		const { isValid, error } = data;

		if (isValid){
			// Join the room
			const socket = io('146.95.36.13:5000');
			socket.emit('join-room', room_code, user);
			socket.on('join-room-response', (room) => {
				this.setState({ socket: socket, loading: false, ...room });
			});
		} else {
			// Spit error
			this.setState({ loading: false });
		}
	}

	render(){
		if (this.state.loading) return <Loading/>;

		return (
			<>
			<Navbar children={[{title: "Dashboard", link: "/dashboard"},
									 {title: "Profile", link: "/profile"},
									 {title: "Log out", func: this.props.logoutUser}]}/>

			<section className="bg-purple" style={{height: '92vh'}}>
				<div className="container">
					<div className="row">
						<div className="col-lg-4">
							<Queue/>
						</div>

						<div className="col-lg-4">
							<div className="row">
								<div className="col-lg-12">
									<RoomCode code={this.state.room_code}/>
								</div>

								<div className="col-lg-12">
									<Player/>
								</div>

								<div className="col-lg-12">
									<ButtonGroup/>
								</div>
							</div>
						</div>

						<div className="col-lg-4">
							<div className="col-lg-12">
								<h1 className="lead text-center heading">current listeners</h1>
							</div>

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
	auth: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Room);
