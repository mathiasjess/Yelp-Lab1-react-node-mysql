import React from 'react';
import './RestaurantHomePage.css';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import restaurantprofileImage from '../../images/restaurantprofileImage.png'

class UpdateRestaurantProfile extends React.Component {
    constructor(props) {
        super(props)

        this.handleUpdate = this.handleUpdate.bind(this)
    }
    handleUpdate(){
        this.props.history.replace(`/restauranthomepage/${Cookies.get('id')}`);
    }
    componentDidMount() {

    }
    render() {
        return (
            <div class="centeredRight">
                <h4>Update Restaurant Profile</h4>
                <button onClick = {this.handleUpdate}>Update Profile</button>
            </div>
        )
    }

}

export default UpdateRestaurantProfile