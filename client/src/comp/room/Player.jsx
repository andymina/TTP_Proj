import React from 'react';
import Marquee from 'react-marquee';
import PropTypes from 'prop-types';
import isEmpty from 'is-empty'
import { connect } from 'react-redux';
import { updateStatus, updateSong, updateQueue } from '../../actions/roomActions';

class Player extends React.Component {
	constructor(props){
		super(props)
	}

	componentDidMount(){
		this.props.socket.on('update-status', (status) => {
			this.props.updateStatus(status);
		});

		this.props.socket.on('update-song', (song) => {
			this.props.updateSong(song);
			setTimeout(() => this.props.socket.emit('request-song-update'), song.length + 1);
		});

		this.props.socket.on('update-queue', (queue) => {
			this.props.updateQueue(queue);
		});
	}

	play = () => {
		this.props.socket.emit('play');
	}

	pause = () => {
		this.props.socket.emit('pause');
	}

	resume = () => {
		this.props.socket.emit('resume');
	}

	render(){
		if (isEmpty(this.props.song) && this.props.queue.length === 0)
			return (
				<div className="d-flex flex-fill justify-content-center align-items-center">
					<h1 className="heading text-red text-center lead">The queue is empty!</h1>
				</div>
			);
		else if (isEmpty(this.props.song))
			return (
				<div className="d-flex flex-fill justify-content-center align-items-center">
					<h1 className="heading text-red text-center lead">Press play to get started!</h1>
					<i className="text-red fa-3x far fa-play-circle" onClick={this.play}></i>
				</div>
			);
		else
			return (
				<div className="flex-fill">
					<h1 className="heading text-red text-center lead">Currently playing:</h1>

					<div className="my-3 text-center">
						<img
							src={this.props.song.album_pic_url}
							width={250}
							height={250}
							className="d-block container-img rounded img mx-auto"
							alt="Album"/>

						<Marquee
							className="lead text-red text-center heading"
							text={this.props.song.title}/>

						<Marquee
							className="lead text-red text-center heading"
							text={this.props.song.artist}/>

						{this.props.is_playing ?
								<i className="text-red fa-3x far fa-pause-circle" onClick={this.pause}></i> :
								<i className="text-red fa-3x far fa-play-circle" onClick={this.resume}></i>}
					</div>
				</div>
			);
	}
}

Player.propTypes = {
	song: PropTypes.object.isRequired,
	queue: PropTypes.array.isRequired,
	is_playing: PropTypes.bool.isRequired,
	updateStatus: PropTypes.func.isRequired,
	updateSong: PropTypes.func.isRequired,
	updateQueue: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
	song: state.room.song,
	is_playing: state.room.is_playing,
	queue: state.room.queue
});
export default connect(mapStateToProps, { updateStatus, updateSong, updateQueue })(Player);
