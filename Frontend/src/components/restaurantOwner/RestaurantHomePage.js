import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RestaurantHomePage.css'
import restaurantprofileImage from '../../images/restaurantprofileImage.png'
import RestaurantProfile from './restaurantProfile'
import UpdateRestaurantProfile from './UpdateRestaurantProfile'

class RestaurantHomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            homePage : true,
            restProfFlag : false,
            profileData: ''
        }
        this.handlerestProf = this.handlerestProf.bind(this)

    }
    handlerestProf(){
        this.setState({
            homePage : false,
            restProfFlag : true
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
                                {/* <Link to='/updaterestaurantprofile' class="nav-link" >Update  Restaurant Profile</Link> */} 
                                <span onClick = {this.handlerestProf} class="nav-link" >Update  Restaurant Profile</span>
                            </li>
                            <li class="nav-item">
                                <Link to='/updaterestaurantMenu' class="nav-link" >Add/Edit Dishes</Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/viewcustomerreviews' class="nav-link disabled" >Reviews</Link>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled" href="#">Orders</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled" href="#">Events</a>
                            </li>
                        </ul>

                    </div>
                </div>

                <div class="split right">
                {this.state.homePage && <RestaurantProfile />}
                {this.state.restProfFlag  && <UpdateRestaurantProfile />}
                </div>
            </div>
        )
    }

}

export default RestaurantHomePage