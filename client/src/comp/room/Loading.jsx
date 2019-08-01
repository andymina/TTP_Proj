import React from 'react';
import loading from './loading.svg';

const Loading = (props) => (
	<section style={{ height: '100vh' }} className="bg-purple">
		<div className="container h-100">
			<div className="row h-100">
				<div className="col-lg-12 my-auto text-center">
					<img src={loading} className="loading d-block mx-auto" alt="loading_symbol" />
					<h1 className="display-4 text-red">Loading...</h1>
				</div>
			</div>
		</div>
	</section>
)

export default Loading;
