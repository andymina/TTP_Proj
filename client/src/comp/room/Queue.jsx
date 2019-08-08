import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/authActions';
import axios from 'axios';
import Song from './Song';

class Queue extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			search_field: '',
			tracks: []
		};
	}

	handleChange = (event) => {
		this.setState({ [event.target.id]: event.target.value });
	}

	handleSubmit = (event) => {
		event.preventDefault();
		if (this.state.search_field !== ""){
			// Check if the user's token needs to be refreshed
			const current = Math.floor(Date.now() / 1000);
			const diff = current - this.props.user.spotify_exp;

			if (diff >= 3300){
				// refresh the token, and update the user
				axios.post('/api/spotify/refresh', this.props.user).then((response) => {
					let user = response.data;
					this.props.updateUser(user);

					const params = {
						user: user,
						q: this.state.search_field
					};
					axios.post('/api/spotify/search', params).then((response) => {
						const { tracks } = response.data;

						// Refine the array of tracks to be rendered
						let updated = tracks.map((element) =>
							<Song
								key={element.uri}
								data={element}
								handleQueue={this.handleQueue}
								width={100}
								height={100}/>
						);
						this.setState({ tracks: updated });
					});
				});
			} else {
				const params = {
					user: this.props.user,
					q: this.state.search_field
				};
				axios.post('/api/spotify/search', params).then((response) => {
					const { tracks } = response.data;

					// Refine the array of tracks to be rendered
					let updated = tracks.map((element) =>
						<Song
							key={element.uri}
							data={element}
							handleQueue={this.handleQueue}
							width={100}
							height={100}/>
					);
					this.setState({ tracks: updated });
				}).catch((err) => {
					console.log(err);
				});
			}
		} else {
			console.log("bad");
		}
	}

	handleQueue = (song) => {
		song.queued_by = this.props.user.username;
		this.props.socket.emit('queue-song', this.props.room_code, song);
		this.props.socket.on('queue-success', () => {
			alert('added!');
		});
	}

	render(){
		return (
			<div className="col-lg-4 queue-container h-100">
				<form onSubmit={this.handleSubmit}>
					<input
						value={this.state.search_field}
						onChange={this.handleChange}
						placeholder="Song title"
						onFocus={(event) => event.target.placeholder = ""}
						onBlur={(event) => event.target.placeholder = "Song title"}
						autoComplete="off"
						id="search_field"
						type="text"
						className="form-control text-purple"
						aria-describedby="queueInput"/>
				</form>

				<div className="tracks-container my-1">
					{this.state.tracks}
				</div>
			</div>
		);
	}
}

Queue.propTypes = {
	updateUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({ user: state.auth.user });
export default connect(mapStateToProps, { updateUser })(Queue);
