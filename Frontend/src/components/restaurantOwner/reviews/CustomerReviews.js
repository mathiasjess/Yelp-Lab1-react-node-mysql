import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

class CustomerReviews extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            reviews : []
        }
    }
    componentDidMount(){
        axios.get(`http://localhost:3001/restaurantreviews/getcustomerreview/${this.props.user.restaurantId}`)
        .then(response =>{
            if(response.data.message === "success"){
                reviews: response.data.data
            }
            else{
                alert("Could not fetch data. Something went wrong");
            }
        })

    }
    render(){
        return(
            <div class="container">
            <h2>Reviews</h2>
            {this.state.reviews.map((review, i) => {
                return <div class="Reviews">
                    <h4>{review.ratings}/5</h4>
                    <h5>{review.restaurantName}</h5>
                    <h6>{review.reviewDate}</h6>
                    <h6>{review.comments}</h6>
                </div>
            })}
        </div>
        )
    }
}
const mapStateToProps = state => ({
    user: state.restaurantReducer
});

export default connect(mapStateToProps)(CustomerReviews);