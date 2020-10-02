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
import EditDish from './restaurantOwner/EditDish'
import EditEvent from './restaurantOwner/EditEvent'
import UpdateCustomerProfile from './customer/Profile/UpdateCustomerProfile'
import SearchRestaurant from './customer/Search/SearchRestaurant'
import CustomerViewofRestaurant from './customer/Search/CustomerViewofRestaurant'
import MainEventsPage from './customer/Events/MainEventPage'
import WriteaReview from './customer/review/WriteReview'
import CustomerOrders from './customer/Orders/CustomerOrders'
import { Switch, Route, withRouter } from 'react-router-dom';
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
                        path="/customerhomepage/:id"
                        render={props => <CustomerHomePage {...props} />}
                    />
                    <Route
                        path="/restauranthomepage/:id"
                        render={props => <RestaurantHomePage  {...props} />}
                    />
                    <Route
                        path="/editdish/:id"
                        render={props => <EditDish  {...props} />}
                    />
                    <Route
                        path="/editevent/:id"
                        render={props => <EditEvent  {...props} />}
                    />
                    <Route
                        path="/updatecustomerprofile"
                        render={props => <UpdateCustomerProfile  {...props} />}
                    />
                    <Route
                        path="/searchrestaurant"
                        render={props => <SearchRestaurant  {...props} />}
                    />
                    <Route
                        path="/customerviewofrestaurant/:id/:option"
                        render={props => <CustomerViewofRestaurant  {...props} />}
                    />
                    <Route
                    path="/writereview/:id"
                    render={props => <WriteaReview  {...props} />}
                    />
                    <Route
                    path="/customerorder/:id/:option"
                    render={props => <CustomerOrders  {...props} />}
                    />
                    <Route
                        path="/mainevents"
                        render={props => <MainEventsPage  {...props} />}
                    />

                    <Route path="/home" component={Home} />
                </div>
            </div>
        )
    }
}
//Export The Main Component
export default Main;