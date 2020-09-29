import React from 'react'
import './RestaurantHomePage.css'
import axios from 'axios'
import { connect } from 'react-redux';
import { Link,  withRouter } from 'react-router-dom';


class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dishName: '',
            dishIngredients: '',
            dishDescription: '',
            dishImage1: '',
            dishImage2: '',
            dishImage3: '',
            dishImage4: '',
            price: '',
            dishCategory: 'Appetizer'
        }
        this.handleMenuChange = this.handleMenuChange.bind(this)
        this.updateMenu = this.updateMenu.bind(this)

    }
    handleMenuChange(event) {
        event.preventDefault();
        event.target.type === "file" ? this.setState({[event.target.name]: event.target.files[0]}) : this.setState({
            [event.target.name]: event.target.value
        })
    }

    updateMenu(event) {
        event.preventDefault();
        // const data = {
        //     restaurantId: this.props.user.restaurantId,
        //     dishName: this.state.dishName,
        //     dishIngredients: this.state.dishIngredients,
        //     dishDescription: this.state.dishDescription,
        //     dishImage1: this.state.dishImage1,
        //     dishImage2: this.state.dishImage2,
        //     dishImage3: this.state.dishImage3,
        //     dishImage4: this.state.dishImage4,
        //     price: this.state.price,
        //     dishCategory: this.state.dishCategory
        // }
        const form = new FormData();
        form.append("restaurantId",this.props.user.restaurantId);
        form.append("dishName",this.state.dishName);
        form.append("dishIngredients",this.state.dishIngredients);
        form.append("dishDescription", this.state.dishDescription);
        form.append("dishImage1", this.state.dishImage1);
        form.append("price", this.state.price);
        form.append("dishCategory", this.state.dishCategory);
        axios.post('http://localhost:3001/restaurant/updateMenu', form)
            .then(response => {
                if (response.data.message === "success") {
                    console.log("The data got is", response.data)
                    // console.log('Getting Cookie ID', Cookies.get('id'))

                    this.props.history.push(`/restauranthomepage/${this.props.user.restaurantId}`);
                    alert('Added Dish to Menu')
                }
                else if (response.data.message === "error") {
                    alert("Something Went wrong. Could not add dish. Please try again")
                    this.props.history.push(`/restauranthomepage/${this.props.user.restaurantId}`);
                }
            })
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
                                <select value={this.state.dishCategory} name="selectValue" onChange={this.handleMenuChange} >
                                    <option value="Appetizer">Appetizer</option>
                                    <option value="Salads">Salads</option>
                                    <option value="MainCourse">Main Course</option>9
                                        <option value="Deserts">Deserts</option>
                                    <option value="Beverages">Beverages</option>
                                </select>
                            </li>
                            <li class="BusinessName"><label class="u-nowrap">Dish Name</label></li>
                            <li><input type="text" class="inputFields"
                                onChange={this.handleMenuChange}
                                name="dishName"
                                placeholder="Dish Name" /></li>
                            <li class="BusinessName"><label class="u-nowrap">Main Ingredients</label></li>
                            <li><textarea class="inputFields"
                                placeholder="Enter the Ingredients here"
                                name="dishIngredients" rows="4" cols="50"
                                onChange={this.handleMenuChange}>
                            </textarea></li>
                            <li class="BusinessName"><label class="u-nowrap">Description of the Dish</label></li>
                            <li><textarea class="inputFields"
                                placeholder="Enter the description here"
                                name="dishDescription" rows="4" cols="50"
                                onChange={this.handleMenuChange}>
                            </textarea></li>
                            <li class="BusinessName"><label class="u-nowrap">Dish Image 1</label></li>
                            <li><input type="file"
                                name="dishImage1"
                                id = 'dishImage'
                                onChange={this.handleMenuChange}
                                class="inputFields" /></li> 
                            <li class="BusinessName"><label class="u-nowrap">Dish Image 2</label></li>
                            <li><input type="file"
                                name="dishImage2"
                                onChange={this.handleMenuChange}
                                class="inputFields" /></li>
                            <li class="BusinessName"><label class="u-nowrap">Dish Image 3</label></li>
                            <li><input type="file"
                                name="dishImage3"
                                onChange={this.handleMenuChange}
                                class="inputFields" /></li>
                            <li class="BusinessName"><label class="u-nowrap">Dish Image 4</label></li>
                            <li><input type="file"
                                name="dishImage4"
                                onChange={this.handleMenuChange}
                                class="inputFields" /></li>
                            <li class="BusinessName"><label class="u-nowrap">Price</label></li>
                            <li><input type="text" class="inputFields"
                                onChange={this.handleMenuChange}
                                name="price" /></li>
                        </ul>
                    </div>
                </div>
                <div class="SubmitUpdate">
                    <button type="submit" class="ybtn ybtn--primary" onClick={this.updateMenu}><span>Add Dish</span></button>
                    <Link to="#" >Cancel</Link>
                </div>
            </form>
            <img src = {this.state.dishImage1} alt="Dish Image" />
        </div>
    )
}

}

const mapStateToProps = state => ({
    user: state.restaurantReducer
});

export default withRouter(connect(mapStateToProps)(Menu));