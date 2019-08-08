import React from 'react';
import Navbar from './Navbar';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signupUser } from "../actions/authActions";

// TODO
//
// 	Change the password back to password from plain text

class Signup extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			password2: '',
			errors: {}
		};
	}

	componentDidMount(){
		if (this.props.auth.isAuthenticated) this.props.history.push("/dashboard");
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.errors) this.setState({ errors: nextProps.errors });
	}

	handleChange = (event) => {
		this.setState({ [event.target.id]: event.target.value });
		return;
	}

	handleSubmit = (event) => {
		event.preventDefault();

		const user = {
			username: this.state.username.toLowerCase(),
			email: this.state.email.toLowerCase(),
			password: this.state.password,
			password2: this.state.password2
		};

		this.props.signupUser(user, this.props.history);
		return;
	}

	render(){
		const navChildren = [{title: "Login", link: "/"}, {title: "Sign up", link: "/signup"}];
		const { errors } = this.state;
		return (
			<>
			<Navbar children={navChildren}/>

			<section className="bg-purple" style={{padding: '7.5vh 0px'}}>
				<div className="container h-100">
					<div className="row h-100">
						<div className="col-lg-6 bg-red my-auto mx-auto p-4">
							<h1 className="text-white text-center heading lead">Sign up</h1>
							<hr className="divider"/>

							<form>
								<div className="form-group">
									<label className="text-white lead"><i>Username</i></label>
									<input
										value={this.state.username}
										onChange={this.handleChange}
										id="username"
										className="form-control text-white bg-purple custom-form-control"
										aria-describedby="emailHelp"/>
									{errors.username ? <span className="text-purple lead">{errors.username}</span> : null}
								</div>

								<div className="form-group">
									<label className="text-white lead"><i>Email address</i></label>
									<input
										value={this.state.email}
										onChange={this.handleChange}
										id="email"
										type="email"
										className="form-control text-white bg-purple custom-form-control"
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
										className="form-control text-white bg-purple custom-form-control"/>
									{errors.password ? <span className="text-purple lead">{errors.password}</span> : null}
								</div>

								<div className="form-group">
									<label className="text-white lead"><i>Confirm password</i></label>
									<input
										value={this.state.password2}
										onChange={this.handleChange}
										id="password2"
										type="text"
										className="form-control text-white bg-purple custom-form-control"/>
									{errors.password2 ? <span className="text-purple lead">{errors.password2}</span> : null}
								</div>

								<div className="text-center">
									<button onClick={this.handleSubmit} className="btn bg-purple d-inline-block text-white">
										<span className="lead">Sign up</span>
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

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

Signup.propTypes = {
  signupUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { signupUser })(withRouter(Signup));
