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
            currentDate: '',
            searchParameter: '',
            eventsData: [],
            originaleventsData: [],
            searchFlag: false
        }
        this.captureSearchParameters = this.captureSearchParameters.bind(this)
        this.getSearchResults = this.getSearchResults.bind(this)
        this.registerForEvent = this.registerForEvent.bind(this)
        this.seeDetails = this.seeDetails.bind(this)
        this.getAllResults = this.getAllResults.bind(this)
    }
    componentDidMount() {

        axios.get(`http://localhost:3001/events/fetchEvents`)
            .then((response) => {
                console.log(response.data.data)
                if (response.data.message === "success") {
                    this.setState({
                        eventsData: response.data.data,
                        originaleventsData: response.data.data,
                    })
                }
                else if (response.data.message === "error") {
                    alert("Something went wrong. Please try again")
                }
            })
    }
    captureSearchParameters(event) {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    getSearchResults(event) {
        event.preventDefault();
        let searchValue = this.state.searchParameter
        axios.get(`http://localhost:3001/events/fetchSingleEvent/${searchValue}`)
            .then((response) => {
                console.log(response.data.data)
                if (response.data.message === "success") {
                    this.setState({
                        eventsData: response.data.data,
                        searchFlag: true
                    })
                }
                else if (response.data.message === "error") {
                    alert("Something went wrong. Please try again")
                }
            })
    }

    registerForEvent(eventID, restaurantID) {
        const data = {
            eventId: eventID,
            restaurantId: restaurantID,
            customerId: this.props.user.id,
            customerName: this.props.user.firstName + " " + this.props.user.lastName
        }
        console.log("Data", data)
        axios.post(`http://localhost:3001/events/registerForEvent`, data)
            .then((response) => {
                console.log(response.data.data)
                if (response.data.message === "success") {

                    alert("Registerd successfully for event")
                }
                else if (response.data.message === "error") {
                    alert("Something went wrong")
                }
            })
    }
    getAllResults() {
        this.setState({
            searchFlag: false,
            eventsData: this.state.originaleventsData
        })
    }
    seeDetails(eventID) {
        this.state.originaleventsData.map((event, i) => {
            if (event.eventId === eventID) {
                return <div class="Reviews" key={i}>
                    <h4>{event.eventName}</h4>
                    <h5>{event.eventDescription}</h5>
                    <h6> {event.eventTime}</h6>
                    <h6> {event.eventDate}</h6>
                    <h6>{event.eventLocation}</h6>
                    <h6>{event.eventHashtag}</h6>
                </div>
            }
        })
    }
    render() {
        return (
            <div class="table">
                <div class="tr-onerow1">
                    <div class="td-onerow1">
                        {this.state.searchFlag && <button class="btn btn-danger" onClick={() => this.getAllResults()}>All search Results</button>}
                    </div>
                    <div class="td-onerow2">
                        <form class="search-class">
                            <input class="form-control mr-sm-2" name="searchParameter" type="text" onChange={this.captureSearchParameters} placeholder="dish names,cuisines," aria-label="Search" />
                            {/*<button class="btn btn-outline-success my-2 my-sm-0" onClick = {this.searchRestaurant} type="submit">Search</button>*/}
                            <button class="btn btn-danger" onClick={this.getSearchResults}>search</button>
                        </form>
                    </div>
                    <div class="td-onerow3">
                    </div>
                </div>
                <div class="tr-tworow">
                    <div class="td-tworow1">
                    </div>
                    <div class="td-tworow2">
                        {this.state.eventsData && this.state.eventsData.map((event, i) => {
                            if (event.eventDate < this.currentDate) {
                                return <div class="card">
                                    <div class="card-body">
                                        <h6>Upcoming</h6>
                                        <h4 class="card-title">{event.eventName}</h4>
                                        <h5>Details:</h5>
                                        <h6>Host: {event.restaurantName}</h6>
                                        <h6>{event.eventTime}</h6>
                                        <h6>{event.eventDate}</h6>
                                        <button class="btn btn-danger" onClick={() => this.registerForEvent(event.eventId, event.restaurantId)}>Register</button>
                                        <button class="btn btn-danger">See details</button>
                                    </div>
                                </div>
                            }
                            else {
                                return <div class="card">
                                    <div class="card-body">
                                        <h6>Past</h6>
                                        <h4 class="card-title">{event.eventName}</h4>
                                        <h5>Details:</h5>
                                        <h6>Host: {event.restaurantName}</h6>
                                        <h6>{event.eventTime}</h6>
                                        <h6>{event.eventDate}</h6>
                                        <button class="btn btn-danger" onClick={() => this.registerForEvent(event.eventId, event.restaurantId)}>Register</button>
                                        <button class="btn btn-danger" onClick={() => this.seeDetails(event.eventId)}>See details</button>
                                    </div>
                                </div>
                            }
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