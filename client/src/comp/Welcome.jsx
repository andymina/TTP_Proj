import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Welcome extends React.Component {
	constructor(props){
		super(props);
		this.state = { code: "" };
	}

	createRoom = async () => {
		const { data } = await axios.post("/api/rooms/create", this.props.user);
		console.log(data);
		this.setState({ code: data });
	}

	joinRoom = () => {
		// Change to a beautiful modal <3
		const answer = prompt("Enter the room code");

		// Input validation
		this.setState({ code: answer });
	}

	handleConnect = async () => {
		const { data } = await axios.post("/api/spotify/connect");
		window.location.href = data;
	}

	render(){
		const user = this.props.user;

		if (this.state.code !== "") return <Redirect to={"/room/" + this.state.code}/>;
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
						<button className="btn dashboard-button d-inline-block" onClick={this.handleConnect}>Connect to Spotify</button>
					</div>
				</div>
			</div>
		);
	}
}

Welcome.propTypes = {
	user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.auth.user
});

export default withRouter(connect(mapStateToProps)(Welcome));
