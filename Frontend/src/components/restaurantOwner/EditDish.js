import React from 'react'
import './RestaurantHomePage.css'
import restaurantprofileImage from '../../images/restaurantprofileImage.png'
import { connect } from 'react-redux';
import axios from 'axios';

class EditDish extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            itemID: this.props.match.params.id,
            dishName :'',
            dishIngredients :'',
            dishDescription :'',
            dishImage2 :'',
            dishImage3 :'',
            dishImage4 :'',
            price :'',
            dishCategory :''
        }
        this.handleMenuChange = this.handleMenuChange.bind(this);
        this.updateDish = this.updateDish.bind(this)
        this.deleteDish = this.deleteDish.bind(this)

    }
    handleMenuChange(event) {
        event.preventDefault();
        event.target.type === "file" ? this.setState({[event.target.name]: event.target.files[0]}) : this.setState({
            [event.target.name]: event.target.value
        })
    }

    updateDish(event) {
        event.preventDefault();
        const form = new FormData();
        form.append("itemID", this.state.itemID)
        form.append("dishName",this.state.dishName);
        form.append("dishIngredients",this.state.dishIngredients);
        form.append("dishDescription", this.state.dishDescription);
        form.append("dishImage1", this.state.dishImage1);
        form.append("price", this.state.price);
        form.append("dishCategory", this.state.dishCategory);
        axios.put('http://localhost:3001/restaurant/editMenu', form)
            .then(response => {
                if (response.data.message === "success") {
                    // console.log('Getting Cookie ID', Cookies.get('id'))
                    alert('Updated Dish', this.state.dishName)
                    this.props.history.push(`/restauranthomepage/${this.props.user.restaurantId}`);
                    
                }
                else if (response.data.message === "error") {
                    alert("Something Went wrong. Could not update dish. Please try again")
                    this.props.history.push(`/restauranthomepage/${this.props.user.restaurantId}`);
                }
            })       

    }
    deleteDish(ID){
        axios.delete(`http://localhost:3001/restaurant/deleteMenu/${this.state.itemID}`)
        .then(response =>{
            if(response.data.message ==="success"){
                alert("Deleted dish")
                this.props.history.push(`/restauranthomepage/${this.props.user.restaurantId}`);
            }
            else if (response.data.message === "error"){
                alert("Something went wrong. Could not delete dish. Please try again")
                this.props.history.push(`/restauranthomepage/${this.props.user.restaurantId}`);
            }
        })
    }
    componentDidMount() {
        axios.get(`http://localhost:3001/restaurant/fetchdish/${this.props.match.params.id}`)
        // axios.get(`http://localhost:3001/restaurant/fetchMenu/${this.props.user.restaurantId}`)
        .then((response) =>{
            console.log(response.data.data)
            if(response.data.message === "success"){

                this.setState({
                    itemID : this.props.match.params.id,
                    dishName : response.data.data.dishName,
                    dishIngredients :response.data.data.dishIngredients,
                    dishDescription :response.data.data.dishDescription,
                    price :response.data.data.price,
                    dishCategory :response.data.data.dishCategory
                })
            }
        })
    }
    render() {
        return (
            <div class="biz-site-expanded-grid-content-column">
                <h1 class="page-title">Edit Dish</h1>
                <form>
                    <div class="biz-info-section">
                        <div class="biz-info-row">
                            <ul>
                                <li class="BusinessName"><label for="cars">Update category?</label></li>
                                <li>
                                    <select name="selectValue" value = {this.state.dishCategory} onChange={this.handleMenuChange} >
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
                                    placeholder={this.state.dishName} /></li>
                                <li class="BusinessName"><label class="u-nowrap">Main Ingredients</label></li>
                                <li><textarea class="inputFields"
                                    placeholder={this.state.dishIngredients}
                                    name="dishIngredients" rows="4" cols="50"
                                    onChange={this.handleMenuChange}>
                                </textarea></li>
                                <li class="BusinessName"><label class="u-nowrap">Description of the Dish</label></li>
                                <li><textarea class="inputFields"
                                    placeholder={this.state.dishDescription}
                                    name="dishDescription" rows="4" cols="50"
                                    onChange={this.handleMenuChange}>
                                </textarea></li>
                                <li class="BusinessName"><label class="u-nowrap">Dish Image 1</label></li>
                                <li><input type="file"
                                    name="dishImage1"
                                    id='dishImage'
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
                                    placeholder = {this.state.price}
                                    name="price" /></li>
                            </ul>
                        </div>
                    </div>
                    <div class="SubmitUpdate">
                    <button type="submit" class="ybtn ybtn--primary" onClick={this.updateDish}><span>Update Dish</span></button>
                    <button type="submit" class="ybtn ybtn--primary" onClick={this.deleteDish}><span>Delete Dish</span></button>
                </div>
                </form>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    user: state.restaurantReducer
});

export default connect(mapStateToProps)(EditDish);