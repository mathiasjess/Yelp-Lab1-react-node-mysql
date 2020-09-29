import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {connect} from 'react-redux';
import {registerRestaurant} from '../../actions/restaurantAction'

class restaurantRegister extends React.Component {
    constructor() {
        super()
        this.state = {
            restaurantname : "",
            email : "",
            password : "",
            location : ""
        }
        this.ChangeHandler = this.ChangeHandler.bind(this)
        this.submitRegister = this.submitRegister.bind(this)
    }
    ChangeHandler(event) {
        event.preventDefault();
        this.setState({
            [event.target.name] :event.target.value
        })
    }

    submitRegister(event){
    //prevent page from refresh
    event.preventDefault();
    const restaurantRegistrationData = {
        restaurantname: this.state.restaurantname,
        email: this.state.email,
        password: this.state.password,
        location : this.state.location
    }
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post('http://localhost:3001/restaurant/restaurantregister',restaurantRegistrationData)
    .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
            alert("Restaurant Registration successful")
            this.props.registerRestaurant(restaurantRegistrationData);
            this.props.history.replace('/login/restaurantlogin');
        }
    })
    .catch(error=>{
        console.log(error.response.data.msg)
        alert(error.response.data.msg)
    })
    }
    render() {
        return (
            <form>
                <div class="regColumn">
                    <div class="form-group">
                        <input onChange={this.ChangeHandler} type="text" class="form-control" name="restaurantname" placeholder="Restaurant name" />
                    </div>
                    <div class="form-group">
                        <input onChange={this.ChangeHandler} type="email" class="form-control" name="email" placeholder="Email ID" />
                    </div>
                    <div class="form-group">
                        <input onChange={this.ChangeHandler} type="password" class="form-control" name="password" placeholder="Password" />
                    </div>
                    <div class="form-group">
                        <input onChange={this.ChangeHandler} type="text" class="form-control" name="location" placeholder="location" />
                    </div>
                    <button onClick={this.submitRegister} class="btn btn-danger">Sign Up</button>
                </div>

            </form>
        )
    }

}

function mapDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return {
        registerRestaurant : (data) => dispatch(registerRestaurant(data))
    }
}

export default connect(null, mapDispatchToProps)(restaurantRegister) ;