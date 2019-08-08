import React from 'react';

const RoomCode = (props) => (
	<>
	<p className="lead text-center my-0 text-white" style={{fontWeight: 5, fontSize: '1.25em'}}>ROOM CODE:</p>
	<hr className="divider my-2"/>
	<h1 className="text-center display-4 text-white room-code">{props.code}</h1>
	</>
)

export default RoomCode;
