import React from 'react';
import PropTypes from 'prop-types';
import Marquee from 'react-marquee';
import { connect } from 'react-redux';
import { updateSong } from '../../actions/roomActions';
import isEmpty from 'is-empty';

class Player extends React.Component {
	constructor(props){
		super(props);
		this.state = { is_playing: false, song: null };
	}

	handleClick = () => {
		console.log("Paused the song");
		this.setState({ is_playing: !this.state.is_playing });
	}

	render(){
		// If no song has been queued, show empty
		let { song } = this.props;
		song = isEmpty(song) ? null : song;

		this.props.socket.on('play-song', (song) => {
			this.props.updateSong(song);
		});

		if (song == null)
			return <h1 className="heading lead text-center text-red">The queue is empty, add more songs!</h1>;
		else
			return (
			<div className="text-center">
				<img
					src={song.album_pic_url}
					width={300}
					height={300}
					className="d-block container-img rounded img mx-auto"
					alt="Album"/>

				<Marquee
					className="lead heading text-red"
					text={`${song.title} - ${song.artist}`}/>

				<Marquee
					className="lead info text-red"
					text={song.album}/>

				<p className="lead info my-1 text-red">Queued by {song.queued_by}</p>

				<div className="text-center my-3">
					{this.state.is_playing ?
						<i className="fas fa-3x fa-pause-circle text-red" onClick={this.handleClick}></i> :
						<i className="fas fa-3x fa-play-circle text-red" onClick={this.handleClick}></i>}
				</div>
			</div>
		);
	}
}

Player.propTypes = { song: PropTypes.object.isRequired };
const mapStateToProps = (state) => ({ song: state.room.song });
export default connect(mapStateToProps, { updateSong })(Player);
