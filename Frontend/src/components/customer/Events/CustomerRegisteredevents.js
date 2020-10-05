import React from 'react'
import axios from 'axios'
import './events.css'
import { connect } from 'react-redux'
import default_pic from '../../../images/restaurantprofileImage.png'
import Moment from 'react-moment';
import 'moment-timezone';

class MainEventsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            eventsData: [],
        }
        this.deleteRegisteredEvent = this.deleteRegisteredEvent.bind(this)
    }
    componentDidMount() {
        axios.get(`http://localhost:3001/events/fetchcustomerEvent/${this.props.user.id}`)
            .then((response) => {
                console.log(response.data.data)
                if (response.data.message === "success") {
                    this.setState({
                        eventsData: response.data.data,
                    })
                }
                else if (response.data.message === "error") {
                    alert("Something went wrong. Please try again")
                }
            })
    }
    deleteRegisteredEvent() {
        axios.delete(`http://localhost:3001/events/deleteregisteredevent/${this.props.user.id}`)
            .then((response) => {
                console.log(response.data.data)
                if (response.data.message === "success") {
                    alert("Deregistered successfully")
                    this.props.history.push(`/customerevents/${this.props.user.id}`)
                }
                else if (response.data.message === "error") {
                    alert("Something went wrong. Please try again")
                }
            })
    }

    render() {
        return (
            <div class="table">
                <div class="tr-onerow1">
                    <div class="td-onerow1">
                    </div>
                    <div class="td-onerow2">
                    </div>
                    <div class="td-onerow3">
                    <h3> Registered Events</h3>
                    </div>
                </div>
                <div class="tr-tworow">
                    <div class="td-tworow1">
                    </div>
                    <div class="td-tworow2">
                        {this.state.eventsData && this.state.eventsData.map((event, i) => {
                                return <div class="card">
                                    <div class="card-body">
                                        <h6>Past</h6>
                                        <h4 class="card-title">{event.eventName}</h4>
                                        <h5>Details:</h5>
                                        <h6>Host: {event.restaurantName}</h6>
                                        <h6>{event.eventTime}</h6>
                                        <h6>{event.eventDate}</h6>
                                        <button class="btn btn-danger" onClick={() => this.deleteRegisteredEvent(event.eventId)}>Delete Event</button>
                                    </div>
                                </div>
                        })}
                    </div>
                    <div class="td-tworow3">
                    </div>

                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    user: state.customerReducer
});


export default connect(mapStateToProps)(MainEventsPage);