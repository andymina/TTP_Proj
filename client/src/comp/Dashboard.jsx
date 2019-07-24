import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';

class Dashboard extends React.Component {
	constructor(props){
		super(props);
	}

	handleLogout(event){
		event.preventDefault();
		this.props.logoutUser();
	}

	render(){
		const { user } = this.props.auth;

		return (
			<h1>on the dashboard</h1>
		);
	}
}

Dashboard.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { logoutUser })(Dashboard);
