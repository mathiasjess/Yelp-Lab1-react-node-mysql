import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Home from '../Home/Home';
import '../../App.css';
import Cookies from 'js-cookie';
import yelp_logo from '../../images/yelp_icon.png'
import { connect } from 'react-redux';
import { restaurantProfileLogout } from '../../actions/restaurantAction'
import {
    BrowserRouter as Router, Route,
    Redirect, Switch
} from 'react-router-dom';
// import { withRouter } from 'react-router-dom';

//create the Navbar Component
class Navbar extends Component {
    constructor(props) {
        super();
        this.state = {
            displayHome: true,
            customeractionsFlag: false
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.handleHome = this.handleHome.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        Cookies.remove('id');
        Cookies.remove('role');
        const data = {
            restaurantId: '',
            restaurantName: '',
            email: '',
            password: '',
            description: '',
            contact: '',
            location: '',
            city: '',
            state: '',
            country: '',
            zipcode: '',
            restaurantImage: '',
            timings: '',
            curbPickup: false,
            dineIn: false,
            yelpDelivery: false
        }
        this.props.restaurantProfileLogout(data)
        this.setState({
            customeractionsFlag : false
        })
    }
    handleHome() {
        this.setState({
            displayHome: false
        })
    }
    componentDidMount() {
        if (Cookies.get('role' === "customer")) {
            this.setState({
                customeractionsFlag: true
            })
        }

    }
    render() {
        //if Cookie is set render Logout Button
        let navLogin = null;
        if (Cookies.get('id')) {
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/home" onClick={this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        } else {
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/login" onClick={this.handleHome}><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                    <li><Link to="/register" onClick={this.handleHome}><span class="glyphicon glyphicon-log-in"></span> Register</Link></li>

                </ul>
            )
        }
        let redirectVar = null;
        // if (cookie.load('cookie')) {
        //     redirectVar = <Redirect to="/home" />
        // }
        return (
            <div>
                {/* {redirectVar}*/}
                <nav class="navbar navbar-inverse">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand"><Link to="/home"><img class="yelpLogo" src={yelp_logo} /></Link></a>
                        </div>
                        <ul class="nav navbar-nav">
                            {this.state.customeractionsFlag && <li><Link to="/create">Events</Link></li>}
                        </ul>

                        {navLogin}
                    </div>
                </nav>
                {this.state.displayHome && <Home />}
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        restaurantProfileLogout: (data) => dispatch(restaurantProfileLogout(data))
    }
}
export default connect(null, mapDispatchToProps)(Navbar);