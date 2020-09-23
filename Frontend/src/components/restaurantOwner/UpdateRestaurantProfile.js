import React from 'react';
import './RestaurantHomePage.css';
import './UpdateRestaurantProfile.css';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import restaurantprofileImage from '../../images/restaurantprofileImage.png'

class UpdateRestaurantProfile extends React.Component {
    constructor(props) {
        super(props)

        this.handleUpdate = this.handleUpdate.bind(this)
    }
    handleUpdate() {
        this.props.history.replace(`/restauranthomepage/${Cookies.get('id')}`);
    }
    componentDidMount() {

    }
    render() {
        return (
            <div class="biz-site-expanded-grid-content-column">
                <h1 class="page-title">Basic Information</h1>
                <form>
                    <div class="biz-info-section">
                        <div class="biz-info-row">
                            <ul>
                                <li class="BusinessName"><label class="u-nowrap">Restaurant Profile Image</label></li>
                                <li><input type="file" class="inputFields" /></li>
                                <li class="BusinessName"><label class="u-nowrap">Restaurant Name</label></li>
                                <li><input type="text" class="inputFields"
                                    value="Jess's takeout"
                                    onChange={this.handleRestaurantInfoUpdate}
                                    name="restaurantName"
                                    placeholder="Restaurant Name" /></li>
                                <li class="BusinessName"><label class="u-nowrap">Location</label></li>
                                <li><input type="text" class="inputFields"
                                    value="Jess's takeout"
                                    onChange={this.handleRestaurantInfoUpdate}
                                    name="restaurantName"
                                    placeholder="Restaurant Name" /></li>
                                <li class="BusinessName"><label class="u-nowrap">City</label></li>
                                <li><input type="text" class="inputFields"
                                    value="Jess's takeout"
                                    onChange={this.handleRestaurantInfoUpdate}
                                    name="restaurantName"
                                    placeholder="Restaurant Name" /></li>
                                <li class="BusinessName"><label class="u-nowrap">State</label></li>
                                <li><input type="text" class="inputFields"
                                    value="Jess's takeout"
                                    onChange={this.handleRestaurantInfoUpdate}
                                    name="restaurantName"
                                    placeholder="Restaurant Name" /></li>
                                <li class="BusinessName"><label class="u-nowrap">Zip Code</label></li>
                                <li><input type="text" class="inputFields"
                                    value="Jess's takeout"
                                    onChange={this.handleRestaurantInfoUpdate}
                                    name="restaurantName"
                                    placeholder="Restaurant Name" /></li>
                                <li class="BusinessName"><label class="u-nowrap">Description</label></li>
                                <li><textarea class="inputFields" id="w3review" name="w3review" rows="4" cols="50">
                                    At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.
                                            </textarea></li>
                                <li class="BusinessName"><label class="u-nowrap">Contact Information</label></li>
                                <li><input type="text" class="inputFields"
                                    value="Jess's takeout"
                                    onChange={this.handleRestaurantInfoUpdate}
                                    name="restaurantName"
                                    placeholder="Restaurant Name" /></li>
                                <li class="BusinessName"><label class="u-nowrap">Timings</label></li>
                                <li><input type="text" class="inputFields"
                                    value="Jess's takeout"
                                    onChange={this.handleRestaurantInfoUpdate}
                                    name="restaurantName"
                                    placeholder="Restaurant Name" /></li>
                            </ul>
                        </div>
                    </div>
                    <div class="biz-info-section">
                        <h2 class="page-title">Amenities and more</h2>
                        <div class="biz-info-row">
                            <ul>
                                <li class="BusinessName"><label class="u-nowrap">Curbside Pickup</label></li>
                                <div class="arrange_unit">
                                    <div>
                                        <input type="radio" id="male" name="gender" value="male" />
                                        <label class="u-nowrap" for="male">Yes</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="female" name="gender" value="female" />
                                        <label class="u-nowrap" for="female">No</label>
                                    </div>
                                </div>
                                <li class="BusinessName"><label class="u-nowrap">Dine In</label></li>
                                <div class="arrange_unit">
                                    <div>
                                        <input type="radio" id="male" name="gender" value="male" />
                                        <label class="u-nowrap" for="male">Yes</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="female" name="gender" value="female" />
                                        <label class="u-nowrap" for="female">No</label>
                                    </div>
                                </div>
                                <li class="BusinessName"><label class="u-nowrap">Yelp Delivery</label></li>
                                <div class="arrange_unit">
                                    <div>
                                        <input type="radio" id="male" name="gender" value="male" />
                                        <label class="u-nowrap" for="male">Yes</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="female" name="gender" value="female" />
                                        <label class="u-nowrap" for="female">No</label>
                                    </div>
                                </div>

                            </ul>
                        </div>

                    </div>
                    <div class = "SubmitUpdate">
                    <button type="submit" class="ybtn ybtn--primary"><span>Save Changes</span></button>
                    <Link to="#" >Cancel</Link>
                    </div>
                </form>
            </div>
        )
    }

}

export default UpdateRestaurantProfile