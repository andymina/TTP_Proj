import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const RoomCode = (props) => (
	<div className="justify-content-start">
		<p className="lead text-center my-0 text-white" style={{fontWeight: 5, fontSize: '1.25em'}}>ROOM CODE:</p>
		<hr className="divider my-2"/>
		<h1 className="text-center display-4 text-white room-code">{props.room_code}</h1>
	</div>
)

RoomCode.propTypes = { room_code: PropTypes.string.isRequired };
const mapStateToProps = (state) => ({ room_code: state.room.room_code });
export default connect(mapStateToProps)(RoomCode);
