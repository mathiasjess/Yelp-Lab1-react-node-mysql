import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RestaurantHomePage.css'
import restaurantprofileImage from '../../images/restaurantprofileImage.png'
import RestaurantProfile from './restaurantProfile'
import UpdateRestaurantProfile from './UpdateRestaurantProfile'
import Orders from './Orders'
import Menu from './Menu'

class RestaurantHomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            homePageFlag: true,
            updateProfileFlag: false,
            addMenuFlag: false,
            ordersFlag:false,
            profileData: ''
        }
        this.handleMainProfile = this.handleMainProfile.bind(this)
        this.handleUpdateRestaurantProfile= this.handleUpdateRestaurantProfile.bind(this)
        this.handleAddMenu = this.handleAddMenu.bind(this)
        this.handleOrders = this.handleOrders.bind(this)

    }
    handleMainProfile(){
        this.setState({
            homePageFlag: true,
            updateProfileFlag: false,
            addMenuFlag:false,
            ordersFlag:false
        })

    }
    handleUpdateRestaurantProfile() {
        this.setState({
            homePageFlag: false,
            updateProfileFlag: true,
            addMenuFlag:false,
            ordersFlag:false
        })
    }
    handleAddMenu() {
        this.setState({
            homePageFlag: false,
            updateProfileFlag: false,
            addMenuFlag:true,
            ordersFlag:false
        })
    }
    handleOrders() {
        this.setState({
            homePageFlag: false,
            updateProfileFlag: false,
            addMenuFlag:false,
            ordersFlag:true
        })
    }

    componentDidMount() {
        let restaurantID = this.state.id
        console.log("id", restaurantID);
        // event.PreventDefault();
        axios.get(`http://localhost:3001/restaurant/restaurantProfileData/${restaurantID}`, restaurantID)
            .then(response => {
                if (response.data.message === "success") {
                    this.setState({
                        profileData: response.data.data[0]
                    })
                }
                else if (response.data.message === "error") {
                    alert("Could not fetch data")
                }
            })

    }
    render() {
        return (
            <div>
                <div class="split left">
                    <div class="leftTop">
                        <h1>Hi How are you</h1>
                    </div>
                    <div class="centeredLeft">

                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <Link to='#' class="nav-link" onClick={this.handleMainProfile}>View Profile</Link>
                                {/* <span  class="nav-link" >Update  Restaurant Profile</span>*/}
                            </li>
                            <li class="nav-item">
                                <Link to='#' class="nav-link" onClick={this.handleUpdateRestaurantProfile} >Update  Restaurant Profile</Link>
                                {/* <span  class="nav-link" >Update  Restaurant Profile</span>*/}
                            </li>
                            <li class="nav-item">
                                <Link to = '#' class="nav-link" onClick = {this.handleAddMenu}>Add Dishes to Menu</Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/viewcustomerreviews' class="nav-link disabled" >Reviews</Link>
                            </li>
                            <li class="nav-item">
                                <Link to = '#' class="nav-link disabled" onClick={this.handleOrders}>Orders</Link>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled" href="#">Events</a>
                            </li>
                        </ul>

                    </div>
                </div>

                <div class="split right">
                    {this.state.homePageFlag && <RestaurantProfile />}
                    {this.state.updateProfileFlag && <UpdateRestaurantProfile />}
                    {this.state.addMenuFlag && <Menu />}
                    {this.state.ordersFlag && <Orders />}
                </div>
            </div>
        )
    }

}

export default RestaurantHomePage