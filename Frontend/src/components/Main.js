import React, { Component } from 'react';
import landingPageHeader from './LandingPage/landingPageHeader';
import landingPageDescription from './LandingPage/landingPageDescription';
import NavBar from './LandingPage/Navbar';
import Home from './Home/Home';
import Login from './Login/Login';
import Register from './Login/Register'
import { Route } from 'react-router-dom';
//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div className="homepage">
            <div id="site-content">
                <Route path="/" component={NavBar} />
                <Route
                    path="/register"
                    render={props => <Register {...props} />}
                />
                <Route
                    path="/login"
                    render={props => <Login {...props} />}
                />
                <Route path="/home" component={Home} />
            </div>
            </div>
        )
    }
}
//Export The Main Component
export default Main;