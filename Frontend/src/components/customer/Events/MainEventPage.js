import React from 'react'
import './events.css'
import default_pic from '../../../images/restaurantprofileImage.png'

class MainEventsPage  extends React.Component{
    constructor(props) {
        super(props)
    }
    render(){
        return (
            <div class="table">
                <div class="tr-onerow">
                    <div class="td-onerow1">
                    </div>
                    <div class="td-onerow2">
                        <div class="card">
                            <img class="card-img-top" src={default_pic} alt="Card image cap" />
                            <div class="card-body">
                                <h4 class="card-title">Event Name</h4>
                                <h5>Event Description</h5>
                                <h6>Timings</h6>
                                <p class="card-text">Upcoming</p>
                                <button class="btn btn-danger">Register</button>
                                <button class="btn btn-danger">Visit Website</button>
                            </div>
                        </div>
                    </div>
                    <div class="td-onerow3">
                    </div>

                </div>
            </div>
        )
    }
}
export default MainEventsPage