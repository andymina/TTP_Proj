import React from 'react';
import Loading from './room/Loading';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import querystring from 'query-string';
import { connect } from 'react-redux';
import { updateUser } from '../actions/authActions';

class Spotify extends React.Component {
	constructor(props){
		super(props);
		this.state = { loading: true };
	}

	componentDidMount(){
		this.handleAPI();
	}

	handleAPI = async () => {
		const { user } = this.props.auth;
		const params = querystring.parse(this.props.location.search);
		const req = {
			code: params.code,
			state: params.state,
			user: user
		};

		const { data } = await axios.post('/api/spotify/callback', req);
		const { updated_user } = data;
		this.props.updateUser(updated_user);
		this.setState({ loading: false });
	}

	render(){
		if (this.state.loading) return <Loading/>;
		else return <Redirect to="/dashboard"/>;
	}
}

const mapStateToProps = (state) => ({ auth: state.auth });

Spotify.propTypes = {
	auth: PropTypes.object.isRequired,
	updateUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { updateUser })(Spotify);
