import React from 'react';
import PropTypes from 'prop-types';
import Song from './Song';
import { connect } from 'react-redux';

const Queue = (props) => {
	let temp = {
		title: "Buttercup",
		artist: "Jack Stauber",
		album: "Pop Food",
		length: 2039402,
		album_pic_url: "https://via.placeholder.com/250x250",
		uri: "some.uri"
	};

	return (
		<div className="col-lg-12 mx-auto my-2">
			<h1 className="text-left text-red heading lead">Queue</h1>
			<div className="queue-container my-1">
				<Song data={temp}/>
				<Song data={temp}/>
				<Song data={temp}/>
				<Song data={temp}/>
				<Song data={temp}/>
				<Song data={temp}/>
				<Song data={temp}/>
				<Song data={temp}/>
			</div>
		</div>
	);
}

Queue.propTypes = { queue: PropTypes.array.isRequired };
const mapStateToProps = (state) => ({ queue: state.room.queue, song: state.room.song });
export default connect(mapStateToProps)(Queue);
