import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types';

// Signup user
export const signupUser = (userData, history) => (dispatch) => {
	axios.post("/api/users/signup", userData).then((res) => {
		// Redirect to login if sign up was good
		// CHANGE LOGIN ROUTE TO: /login
		history.push("/");
	}).catch((err) => {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	});
}

// Login user
export const loginUser = (userData) => (dispatch) => {
	axios.post("/api/users/login", userData).then((res) => {
		// Save the key to localStorage
		const { token } = res.data;
		localStorage.setItem("jwtToken", token);

		// Set auth token to header
		setAuthToken(token);

		// Decode token to get user data
		const decoded = jwt_decode(token);

		// Set current user
		dispatch(setCurrentUser(decoded));
	}).catch((err) => {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	});
}

// Logout user
export const logoutUser = () => (dispatch) => {
	// Remove token from localStorage
	localStorage.removeItem("jwtToken");

	// Remove auth header
	setAuthToken(false);

	// Set current user to empty, which will set isAuthenticated to false
	dispatch(setCurrentUser({}));
}

// Update the current user information
export const updateUser = (updated_user) => (dispatch) => {
	axios.put('/api/users/update', updated_user).catch((err) => {
		console.log("err:", err);
	});

	dispatch(setCurrentUser(updated_user));
}

// Set current user
export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
}

// Set loading user
export const setUserLoading = () => {
	return {
		type: USER_LOADING
	};
}
