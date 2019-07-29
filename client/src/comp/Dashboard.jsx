import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import Navbar from './Navbar';
import Friends from './Friends';
import Profile from './Profile';
import Help from './Help';

const Dashboard = (props) => {
	return (
		<>
		<Navbar children={[{title: "Dashboard", link: "/dashboard"},
								 {title: "Profile", link: "/profile"},
								 {title: "Log out", func: props.logoutUser}]}/>

		<section className="bg-purple" style={{height: '92vh'}}>
			<div className="container h-100">
				<div className="row h-100">
					<Friends/>
					<Profile/>
					<Help/>
				</div>
			</div>
		</section>
		</>
	);
}

Dashboard.propTypes = {
	logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
