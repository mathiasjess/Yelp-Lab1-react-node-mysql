import React from 'react'
import './RestaurantHomePage.css'
import { useSelector, connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Menu extends React.Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
    }
    render() {
        return (
            <div class="biz-site-expanded-grid-content-column">
                <h1 class="page-title">Add dishes to your restaurant</h1>
                <form>
                    <div class="biz-info-section">
                        <div class="biz-info-row">
                            <ul>
                                <li class="BusinessName"><label for="cars">Choose a category:</label></li>
                                <li>
                                    <select name="cars" id="cars">
                                        <option value="volvo">Appetizer</option>
                                        <option value="saab">Salads</option>
                                        <option value="mercedes">Main Course</option>
                                        <option value="audi">Deserts</option>
                                        <option value="audi">Beverages</option>
                                    </select>
                                </li>
                                <li class="BusinessName"><label class="u-nowrap">Dish Name</label></li>
                                <li><input type="text" class="inputFields"
                                    value="Jess's takeout"
                                    onChange={this.handleRestaurantInfoUpdate}
                                    name="restaurantName"
                                    placeholder="Restaurant Name" /></li>
                                <li class="BusinessName"><label class="u-nowrap">Main Ingredients</label></li>
                                <li><textarea class="inputFields" id="w3review" name="w3review" rows="4" cols="50">
                                    Enter the Ingredients here
                                    </textarea></li>
                                <li class="BusinessName"><label class="u-nowrap">Description of the Dish</label></li>
                                <li><textarea class="inputFields" id="w3review" name="w3review" rows="4" cols="50">
                                    Enter the Ingredients here
                                    </textarea></li>
                                <li class="BusinessName"><label class="u-nowrap">Price</label></li>
                                <li><input type="text" class="inputFields"
                                    value="Jess's takeout"
                                    onChange={this.handleRestaurantInfoUpdate}
                                    name="restaurantName"
                                    placeholder="Restaurant Name" /></li>
                                <li class="BusinessName"><label class="u-nowrap">Upload Images</label></li>
                                <li><input type="file" class="inputFields" /></li>
                                <li><input type="file" class="inputFields" /></li>
                                <li><input type="file" class="inputFields" /></li>
                                <li><input type="file" class="inputFields" /></li>
                            </ul>
                        </div>
                    </div>
                    <div class="SubmitUpdate">
                        <button type="submit" class="ybtn ybtn--primary"><span>Add Dish</span></button>
                        <Link to="#" >Cancel</Link>
                    </div>
                </form>
            </div>
        )
    }

}


export default Menu;