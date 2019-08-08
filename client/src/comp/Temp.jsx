import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './room/Room.css';

const TempContainer = (props) => (
	<section className="bg-purple" style={{height: '92vh'}}>
		<div className="container-fluid py-3 h-100">
			<div className="row h-100">
				<div className="col-lg-12 h-100">
					<h1>temp</h1>
				</div>
			</div>
		</div>
	</section>
);

TempContainer.propTypes = {
	user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.auth.user
});

export default connect(mapStateToProps)(TempContainer);
