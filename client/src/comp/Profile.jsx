import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Profile extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			code: ""
		};
	}

	createRoom = async () => {
		const { data } = await axios.get("/api/rooms/create");
		this.setState({ code: data });
	}

	joinRoom = () => {
		// Change this from ugly prompt to beautiful modal
		const code = prompt("Enter the room code");
		this.setState({ code: code })
	}

	render(){
		const { user } = this.props.auth;
		const { code } = this.state;

		if (code !== "") return <Redirect to={"/room/" + code}/>;
		else return (
			<div className="col-lg-6 my-auto">
				<div className="row">
					<div className="col-lg-12">
						<img
							src={user.imgURL}
							className="rounded d-block mx-auto my-3"
							alt="Profile"/>
						<h1 className="heading text-center my-3 lead text-red">Welcome, {user.username}!</h1>
					</div>

					<div className="col-lg-4 mx-auto text-center">
						<button className="btn dashboard-button d-inline-block" onClick={this.createRoom}>Create a room</button>
					</div>

					<div className="col-lg-4 mx-auto text-center">
						<button className="btn dashboard-button d-inline-block" onClick={this.joinRoom}>Join a room</button>
					</div>

					<div className="col-lg-4 mx-auto text-center">
						<Link
							to="/profile"
							className="btn dashboard-button d-inline-block">
							Edit Profile
						</Link>
					</div>
				</div>


				<div className="row">
					<div className="col-lg-12 text-center">
						<p>notifs</p>
					</div>
				</div>
			</div>
		);
	}
}

Profile.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default withRouter(connect(mapStateToProps)(Profile));
