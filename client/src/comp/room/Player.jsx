import React from 'react';
import Marquee from 'react-marquee';
import PropTypes from 'prop-types';
import isEmpty from 'is-empty'
import { connect } from 'react-redux';
import { updateStatus } from '../../actions/roomActions';

class Player extends React.Component {
	constructor(props){
		super(props)
	}

	componentDidMount(){
		this.props.socket.on('update-status-success', (status) => {
			this.props.updateStatus(status);
		});
	}

	handleClick = () => {
		this.props.socket.emit('update-status', !this.props.is_playing);
	}

	render(){
		// if (isEmpty(props.song))
		let song = {
			title: "Buttercup",
			artist: "Jack Stauber",
			album: "Pop Food",
			length: 2039402,
			album_pic_url: "https://via.placeholder.com/250x250",
			uri: "some.uri"
		};

		if (false)
			return (
				<div className="d-flex flex-fill justify-content-center align-items-center">
					<h1 className="heading text-red text-center lead">No song playing</h1>
				</div>
			);
		else
			return (
				<div className="flex-fill">
					<h1 className="heading text-red text-center lead">Currently playing:</h1>

					<div className="my-3 text-center">
						<img
							src={song.album_pic_url}
							width={250}
							height={250}
							className="d-block container-img rounded img mx-auto"
							alt="Album"/>

						<Marquee
							className="lead text-red text-center heading"
							text={song.title}/>

						<Marquee
							className="lead text-red text-center heading"
							text={song.artist}/>

						<i
							className={"text-red fa-3x far " + (this.props.is_playing ? "fa-pause-circle" : "fa-play-circle")}
							onClick={this.handleClick}></i>

					</div>
				</div>
			);
	}
}

Player.propTypes = {
	song: PropTypes.object.isRequired,
	is_playing: PropTypes.bool.isRequired
};
const mapStateToProps = (state) => ({
	song: state.room.song,
	is_playing: state.room.is_playing
});
export default connect(mapStateToProps, { updateStatus })(Player);
