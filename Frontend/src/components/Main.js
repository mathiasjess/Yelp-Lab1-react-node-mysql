import React, { Component } from 'react';
import landingPageHeader from './LandingPage/landingPageHeader';
import landingPageDescription from './LandingPage/landingPageDescription';
import NavBar from './LandingPage/Navbar';
import Home from './Home/Home';
import Login from './Login/Login';
import Register from './Login/Register'
import CustomerRegister from './customer/CustomerRegister'
import RestaurantRegister from './restaurantOwner/RestaurantRegister'
import CustomerLogin from './customer/CustomerLogin'
import RestaurantLogin from './restaurantOwner/RestaurantLogin'
import CustomerHomePage from './customer/CustomerHomePage'
import RestaurantHomePage from './restaurantOwner/RestaurantHomePage'
import UpdateRestaurantProfile from './restaurantOwner/UpdateRestaurantProfile'
import UpdateRestaurantMenu from './restaurantOwner/UpdateRestaurantMenu'
import ViewCustomerReviews from './restaurantOwner/ViewCustomerReviews'
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
                        path="/register/customerregister"
                        render={props => <CustomerRegister {...props} />}
                    />
                    <Route
                        path="/register/restaurantregister"
                        render={props => <RestaurantRegister {...props} />}
                    />
                    <Route
                        path="/login"
                        render={props => <Login {...props} />}
                    />
                    <Route
                        path="/login/customerlogin"
                        render={props => <CustomerLogin {...props} />}
                    />
                    <Route
                        path="/login/restaurantlogin"
                        render={props => <RestaurantLogin {...props} />}
                    />
                    <Route
                        path="/customerhomepage"
                        render={props => <CustomerHomePage {...props} />}
                    />
                    <Route
                        path="/restauranthomepage/:id" exact
                        render={props => <RestaurantHomePage  {...props} />}
                    />
                    <Route
                    path="/updaterestaurantprofile" exact
                    render={props => <UpdateRestaurantProfile  {...props} />}
                    />
                    <Route
                    path="/updaterestaurantMenu" exact
                    render={props => <UpdateRestaurantMenu  {...props} />}
                    />
                    <Route
                    path="/viewcustomerreviews" exact
                    render={props => <ViewCustomerReviews {...props} />}
                    />
                    <Route path="/home" exact component={Home} />
                </div>
            </div>
        )
    }
}
//Export The Main Component
export default Main;