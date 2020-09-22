import React from 'react'
import './RestaurantHomePage.css'
import restaurantprofileImage from '../../images/restaurantprofileImage.png'

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
                <h2>Restaurant Name</h2>
                <h4> Location</h4>
                <p>Restaurant Description</p>
                <p> Contact Information</p>
                <p>timings</p>
            </div>
        )
    }

}

export default RestaurantProfile