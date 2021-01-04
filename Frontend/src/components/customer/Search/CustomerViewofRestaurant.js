import React from 'react'
import axios from 'axios'
import './customerviewofrestaurant.css'
import default_pic from '../../../images/restaurantprofileImage.png'
import default_customer_pic from '../../../images/customer_default_pic.png'
import Moment from 'react-moment';
import 'moment-timezone';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class CustomerViewofRestaurant extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profileData: [],
            menuData: [],
            eventData: [],
            reviews: []
        }
        this.goToOrders = this.goToOrders.bind(this)
        this.viewDish = this.viewDish.bind(this)
    }
    viewDish(menuId){
        return this.props.history.push(`/viewindividualdish/${menuId}/${this.props.match.params.id}`)
    }
    componentDidMount() {
        console.log("RestaurantID", this.props.match.params.id)
        axios.all([
            axios.get(`http://localhost:3001/restaurant/fetchMenu/${this.props.match.params.id}`),
            axios.get(`http://localhost:3001/restaurantevents/fetchEvents/${this.props.match.params.id}`),
            axios.get(`http://localhost:3001/restaurant/restaurantprofiledetails/${this.props.match.params.id}`),
            axios.get(`http://localhost:3001/reviews/getrestaurantreview/${this.props.match.params.id}`)
        ])
            .then(axios.spread((response1, response2, response3, response4) => {
                console.log("profile data", response3.data.data[0])
                console.log("menu data", response1.data.data)
                console.log("event data", response2.data.data)
                console.log("reviews data", response4.data.data)
                this.setState({
                    menuData: response1.data.data,
                    eventData: response2.data.data,
                    profileData: response3.data.data[0],
                    reviews: response4.data.data
                })
            }))
    }
    goToOrders = (event)=>{
        event.preventDefault();
        return this.props.history.push(`/customerorder/${this.props.match.params.id}`)
    }
    render() {
        const mapStyles = {
            width: '35rem',
            height: '25rem',
        };
        return (
            <div class="table-restaurant-view">
                <div class="tr-first">
                <div class="td-first1"></div>
                    <div class="td-first2">
                        <img class="card-img-top" src={default_pic} alt="Card image cap" />
                    </div>
                    <div class="td-first3">
                        <Map
                            google={this.props.google}
                            zoom={13}
                            style={mapStyles}
                            initialCenter={{ lat:37.4166721, lng:  -121.9534241}}
                        >
                            <Marker position={{ lat: parseFloat(this.state.profileData.latitude), lng: parseFloat(this.state.profileData.longitude) }} />
                        </Map>
                    </div>
                    <div class="td-first4">
                    </div>
                </div>
                <div class="tr-second">
                <div class="td-second1"></div>
                    <div class="td-second2">
                        <h1>{this.state.profileData.restaurantName}</h1>
                        <h4 class="sub-heading">{this.state.profileData.cuisine}</h4>
                        <h4 class="sub-heading"> </h4>
                        <h4 class="timings">{this.state.profileData.timings}</h4>
                        <div class="buttons">
                            <button class="btn btn-danger" onClick={() => this.props.history.push(`/writereview/${this.props.match.params.id}`)}>
                                <span class="glyphicon glyphicon-star" aria-hidden="true">Write a review</span>
                            </button>
                            <button class="btn btn-default" onClick={() => this.props.history.push('/mainevents')}><span class="glyphicon glyphicon-bookmark">Events</span></button>
                        </div>
                        <h4> Services</h4>
                        <div class="modeofDelivery">
                            <h5>{this.state.profileData.curbPickup ? <span class="glyphicon glyphicon-ok">Curbside Pickup</span> : <span class="glyphicon glyphicon-remove">Curbside Pickup</span>}</h5>
                            <h5>{this.state.profileData.yelpDelivery ? <span class="glyphicon glyphicon-ok">Yelp Delivery</span> : <span class="glyphicon glyphicon-remove">Yelp Delivery</span>}</h5>
                            <h5>{this.state.profileData.dineIn ? <span class="glyphicon glyphicon-ok">Dine In</span> : <span class="glyphicon glyphicon-remove">Dine In</span>}</h5>
                        </div>

                    </div>
                    <div class="td-second3">
                        <div class="grid-container">
                            <div class="grid-item">Order food</div>
                            <div class="grid-item"><h6>No Fees, Pick up 20-30 min</h6></div>
                            <button class="btn btn-danger" onClick={() => this.props.history.push(`/customerorder/${this.props.match.params.id}`)}><span class="glyphicon glyphicon-bookmark">Start Order</span></button>
                        </div>
                    </div>
                    <div class="td-second4">
                    </div>
                </div>
                <div class="tr-third">
                <div class="td-third1"></div>
                    <div class="td-third2">
                        <h2>Menu</h2>
                        <div class="flex-display">
                            {this.state.menuData.map((menu, i) => {
                                return <div class="card1" key={i}>
                                <img src={`/uploads/${menu.dishImage1}`} alt="Avatar" class="card-img-top1" alt="Card image cap" />
                                    <div class="container1">
                                        <h4>{menu.dishName}</h4>
                                        <h5><b>{menu.price}</b></h5>
                                        <button class="btn btn-primary" value={menu.itemID} onClick={() => this.viewDish(menu.itemID)}>View Dish Details</button>
                                    </div>
                                </div>
                            })}
                        </div>
                        <h2>Events</h2>
                        <div class="flex-display">
                        {this.state.eventData.map((event, i) => {
                            return <div class="card1" key={i}>
                                <div class="container1">
                                    <h5><b>{event.eventName}</b></h5>
                                    <p><b>Details:</b>{event.dishDescription}</p>
                                    <p><b>Timings: </b>{event.eventTime}</p>
                                    <p><b> Date: </b><Moment>{event.eventDate}</Moment></p>
                                    <p><b>Location: </b>{event.eventLocation}</p>
                                    <p><b>{event.eventHashtag}</b></p>
                                    <button class="btn btn-primary" value={event.eventId} onClick={() => this.vieweventDetails(event.eventId)}>Register for Event</button>
                                </div>
                            </div>
                        })}
                        </div>
                        <h2>Reviews</h2>
                        {this.state.reviews.map((review, i) => {
                            return <div class="Reviews" key={i}>
                            <div class="review-header">
                            {review.profileImage ? <img src={`/uploads/${review.profileImage}`} alt="Avatar" class="photo-box" /> : <img  class="photo-box" src={default_customer_pic} alt="Avatar"/>}
                            <h5 style = {{marginTop:'2rem'}}>{review.firstName} {review.LastName}</h5>
                            </div>
                                <h4>{review.ratings}/5</h4>
                                <h6> <Moment>{review.reviewDate}</Moment></h6>
                                <h6>{review.comments}</h6>
                            </div>
                        })}
                    </div>
                    <div class="td-third3">
                        <div class="grid-container2">
                            <div class="grid-item2"><b>Phone No:</b>{this.state.profileData.contact}</div>
                            <div class="grid-item2"><b>Email:</b> {this.state.profileData.email}</div>
                            <div class="grid-item2"><b>Address: </b>{this.state.profileData.location}, {this.state.profileData.city}, {this.state.profileData.state}, {this.state.profileData.zipcode} </div>
                        </div>
                    </div>
                    <div class="td-third4">
                    </div>
                </div>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ''
})(CustomerViewofRestaurant);