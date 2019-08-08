import React from 'react';
import Marquee from 'react-marquee';
import './Room.css';

const Song = (props) => (
	<div className="col-lg-12 song-container py-2 px-1" onClick={() => props.handleQueue(props.data)}>
		<img
			src={props.data.album_pic_url}
			width={100}
			height={100}
			className="container-img rounded img mx-2"
			alt="Album"/>

		<div className="info-container mx-2">
			<Marquee
				className="lead info my-0"
				text={props.data.title}/>
			<Marquee
				className="lead info my-0"
				text={props.data.artist}/>
		</div>
	</div>
);

export default Song;
