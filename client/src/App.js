import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';
import screens from './comp';
import './App.css';

// Verify token to keep user logged in
if (localStorage.jwtToken){
   // Set auth token header auth
   const token = localStorage.jwtToken;
   setAuthToken(token);

   // Decode token to get user info
   const decoded = jwt_decode(token);
   const currentTime = Date.now() / 1000;

   // Set the current user if token is valid
   // If not, forces a logout and redirects to login page
   if (decoded.exp < currentTime){
      // Logout
      store.dispatch(logoutUser());

      // Redirect to login page
      window.location.href = "/login";
   } else {
      store.dispatch(setCurrentUser(decoded));
   }
}

class App extends React.Component {
   render(){
      return (
         <Provider store={store}>
            <Router>
               <Route exact path="/login" component={screens.Login}/>
               <Route exact path="/signup" component={screens.Signup}/>

               <Route exact path="/" component={screens.Dashboard}/>
               <Route exact path="/room/:room_code" component={screens.Room}/>
            </Router>
         </Provider>
      );
   }
}

export default App;
