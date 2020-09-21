import React from 'react'
import axios from 'axios';

class RestaurantHomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            profileData : ''
        }

    }

    componentDidMount(){
        let restaurantID = this.state.id
        console.log("id",restaurantID );
        // event.PreventDefault();
        axios.get(`http://localhost:3001/restaurant/restaurantProfileData/${restaurantID}`,restaurantID )
        .then(response =>{
            if(response.data.message === "success"){
                this.setState({
                    profileData : response.data.data[0]
                })
            }
            else if (response.data.message === "error"){
                alert("Could not fetch data")
            }
        })

    }
    render() {
        return (
            <div>
            <button onClick={this.fetchData}>Get Details</button>
             Welcome to Restaurant Home Page
            </div>
        )
    }

}

export default RestaurantHomePage