import React from 'react'
import axios from 'axios';

class RestaurantLogin extends React.Component {
    constructor() {
        super()
        this.state = {
            email:'',
            password:''
        }
        this.ChangeHandler = this.ChangeHandler.bind(this)
        this.submitLogin = this.submitLogin.bind(this)
    }
    ChangeHandler(event){
        event.preventDefault();
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    submitLogin(event){
        event.preventDefault();
        const restaurantLoginData = {
            email : this.state.email,
            password : this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/restaurant/restaurantlogin',restaurantLoginData)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                console.log("Login successful")
                this.props.history.replace('/restauranthomepage');
            }
        })
        .catch(()=>{
            console.log("Invalid Credentials")
        }
            // console.log(error.response.data.msg)
            // alert(error.response.data.msg)
            )
    }
    render() {
        return (
            <form>
                <div class="regColumn">
                    <div class="form-group">
                        <input onChange={this.ChangeHandler} type="email" class="form-control" name="email" placeholder="Email ID" />
                    </div>
                    <div class="form-group">
                        <input onChange={this.ChangeHandler} type="password" class="form-control" name="password" placeholder="Password" />
                    </div>
                    <button onClick={this.submitLogin} class="btn btn-danger">Restaaurant Log In</button>
                </div>

            </form>
        )
    }

}

export default RestaurantLogin;