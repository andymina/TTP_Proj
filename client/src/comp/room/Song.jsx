import React from 'react';
import Marquee from 'react-marquee';
import './Room.css';

const Song = (props) => (
	<div className="col-lg-12 song-container p-2">
		<img
			src={props.data.album_pic_url}
			width={75}
			height={75}
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
