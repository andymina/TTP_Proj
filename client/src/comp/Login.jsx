import React from 'react';
import Navbar from './Navbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';

// TODO
//
// 	Change password back to password from plain text

class Login extends React.Component {
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			email: '',
			password: '',
			errors: {}
		};
	}

	componentDidMount(){
		if (this.props.auth.isAuthenticated) this.props.history.push("/dashboard");
	}

	componentWillReceiveProps(nextProps){
		// Send user to dashboard if login is successful
		if (nextProps.auth.isAuthenticated) this.props.history.push("/dashboard");

		// Set errors if any
		if (nextProps.errors) this.setState({ errors: nextProps.errors });
	}

	handleChange(event){
		this.setState({ [event.target.id]: event.target.value });
		return;
	}

	handleSubmit(event){
		event.preventDefault();

		const user = {
			email: this.state.email,
			password: this.state.password
		};

		this.props.loginUser(user);
	}

	render(){
		const navChildren = [{title: "Login", link: "/"}, {title: "Sign up", link: "/signup"}];
		const { errors } = this.state;

		return (
			<>
			<Navbar children={navChildren}/>

			<section className="bg-purple" style={{height: '92vh'}}>
				<div className="container h-100">
					<div className="row h-100">
						<div className="col-lg-6 bg-red my-auto mx-auto p-4">
							<h1 className="text-white text-center heading lead">Login</h1>
							<hr className="divider"/>

							<form>
								<div className="form-group">
									<label className="text-white lead"><i>Email address</i></label>
									<input
										value={this.state.email}
										onChange={this.handleChange}
										id="email"
										type="email"
										className="form-control text-white"
										aria-describedby="emailHelp"/>
									{errors.email ? <span className="text-purple lead">{errors.email}</span> : null}
								</div>

								<div className="form-group">
									<label className="text-white lead"><i>Password</i></label>
									<input
										value={this.state.password}
										onChange={this.handleChange}
										id="password"
										type="text"
										className="form-control text-white"/>
									{errors.password ? <span className="text-purple lead">{errors.password}</span> : null}
								</div>

								<div className="text-center">
									<button onClick={this.handleSubmit} className="btn btn-purple d-inline-block text-white">
										<span className="lead">Login</span>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
			</>
		)
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
