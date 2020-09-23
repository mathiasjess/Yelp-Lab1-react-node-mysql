import React from 'react'
import './RestaurantHomePage.css'
import restaurantprofileImage from '../../images/restaurantprofileImage.png'
import { useSelector, connect } from 'react-redux';


class RestaurantProfile extends React.Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
    }
    render() {
        return (
            <div class="centeredRight">
                <img src={restaurantprofileImage} />
                <h2 class="restaurantName">{this.props.user.restaurantName}</h2>

                <div class="restaurantdetails">
                    <h4> {this.props.user.location}</h4>
                    <h4> {this.props.user.city},{this.props.user.state}</h4>
                    <h4> {this.props.user.zipcode}</h4>
                    <h4>Ph No: {this.props.user.contact}</h4>
                </div>
                <div class="restaurantdescription">
                    <p>{this.props.user.description}</p>
                    <p>{this.props.user.timings}</p>
                </div>
                <div class="menu">
                    <h2>Restaurant Menu</h2>
                    <div><h3>Appetizers</h3>
                        <div class="card">
                            <img class="card-img-top" src="..." alt="Card image cap" />
                            <div class="card-body">
                                <h5 class="card-title">Dish Name</h5>
                                <p class="card-text">Main Ingredients</p>
                                <p class="card-text">Description</p>
                                <p class="card-text">Price</p>
                                <a href="#" class="btn btn-primary">Edit Dish</a>
                            </div>
                        </div>
                    </div>
                    <div><h3>Salads</h3>
                        <div class="card">
                            <img class="card-img-top" src="..." alt="Card image cap" />
                            <div class="card-body">
                                <h5 class="card-title">Dish Name</h5>
                                <p class="card-text">Main Ingredients</p>
                                <p class="card-text">Description</p>
                                <p class="card-text">Price</p>
                                <a href="#" class="btn btn-primary">Edit Dish</a>
                            </div>
                        </div>
                    </div>
                    <div><h3>Main Course</h3>
                        <div class="card">
                            <img class="card-img-top" src="..." alt="Card image cap" />
                            <div class="card-body">
                                <h5 class="card-title">Dish Name</h5>
                                <p class="card-text">Main Ingredients</p>
                                <p class="card-text">Description</p>
                                <p class="card-text">Price</p>
                                <a href="#" class="btn btn-primary">Edit Dish</a>
                            </div>
                        </div>
                    </div>
                    <div><h3>Deserts</h3>
                        <div class="card">
                            <img class="card-img-top" src="..." alt="Card image cap" />
                            <div class="card-body">
                                <h5 class="card-title">Dish Name</h5>
                                <p class="card-text">Main Ingredients</p>
                                <p class="card-text">Description</p>
                                <p class="card-text">Price</p>
                                <a href="#" class="btn btn-primary">Edit Dish</a>
                            </div>
                        </div>

                    </div>
                    <div><h3>Beverages</h3>
                        <div class="card">
                            <img class="card-img-top" src="..." alt="Card image cap" />
                            <div class="card-body">
                                <h5 class="card-title">Dish Name</h5>
                                <p class="card-text">Main Ingredients</p>
                                <p class="card-text">Description</p>
                                <p class="card-text">Price</p>
                                <a href="#" class="btn btn-primary">Edit Dish</a>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    user: state.restaurantReducer
});


export default connect(mapStateToProps)(RestaurantProfile);