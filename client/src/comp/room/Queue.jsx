import React from 'react';
import PropTypes from 'prop-types';
import Song from './Song';
import { connect } from 'react-redux';

const Queue = (props) => {
	let counter = 0;
	let tracks = props.queue.map((element) => {
		counter++;
		return <Song key={element.uri + counter} data={element}/>
	});

	return (
		<div className="d-flex queue-container flex-column">
			<div>
				<h1 className="text-left text-red heading lead">Queue</h1>
			</div>

			<div className="queue-song-container my-1">
				{tracks}
			</div>
		</div>
	);
}

Queue.propTypes = { queue: PropTypes.array.isRequired };
const mapStateToProps = (state) => ({ queue: state.room.queue });
export default connect(mapStateToProps)(Queue);
