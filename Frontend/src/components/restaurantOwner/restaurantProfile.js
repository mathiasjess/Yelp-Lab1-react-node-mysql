import React from 'react'
import './RestaurantHomePage.css'
import axios from 'axios'
import restaurantprofileImage from '../../images/restaurantprofileImage.png'
import { connect } from 'react-redux';
import { Route, Link , withRouter} from 'react-router-dom';



class RestaurantProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menuData: [],
            eventData: [],
            showFullProfileFlag : true,
            showEditDishesFlag : false,
            itemID : ''
        }
        this.editDish = this.editDish.bind(this)
        this.vieweventDetails = this.vieweventDetails.bind(this)
    }
    editDish(ID){
        this.props.history.replace(`/editdish/${ID}`);
    }

    vieweventDetails(eventIDDetails){
        this.props.history.replace(`/editevent/${eventIDDetails}`)
    }  

    componentDidMount() {
        axios.all([
            axios.get(`http://localhost:3001/restaurant/fetchMenu/${this.props.user.restaurantId}`),
            // .then((response) => {
            //     console.log(response.data)
            //     this.setState({
            //         menuData: response.data.data
            //     })
            // }),
            axios.get(`http://localhost:3001/restaurantevents/fetchEvents/${this.props.user.restaurantId}`)
            // .then((response) => {
            //     console.log(response.data)
            //     this.setState({
            //         menuData: response.data.data
            //     })
            // })
        ])
        .then(axios.spread((response1, response2)=>{
            this.setState({
                menuData : response1.data.data,
                eventData : response2.data.data
            })
        }))
    }
    render() {
        return (
             <div class="centeredRight" >
                <img src={restaurantprofileImage} />
                <h2 class="restaurantName">{this.props.user.restaurantName}</h2>

                <div class="restaurantdetails">
                    <h5> {this.props.user.location}</h5>
                    <h5> {this.props.user.city},{this.props.user.state}</h5>
                    <h5> {this.props.user.zipcode}</h5>
                    <h5>Ph No: {this.props.user.contact}</h5>
                </div>
                <div class="restaurantdescription">
                    <p>{this.props.user.description}</p>
                    <p>{this.props.user.timings}</p>
                </div>
                <div class="menu">
                    <h2>Restaurant Menu</h2>
                    <div><h3>Appetizers</h3>
                        {this.state.menuData.map((menu, i) => {
                            // if(menu.dishCategory === "Appetizers"){
                            return <div class="card" key={i}>
                                <img src={menu.dishImage1} alt="Avatar" style={{ width: "170px", height: "170px" }} />
                                <div class="container">
                                    <h4><b>{menu.dishName}</b></h4>
                                    <p>{menu.dishDescription}</p>
                                    <p><b>{menu.price}</b></p>
                                    <button class="btn btn-primary" value={menu.itemID} onClick={()=>this.editDish(menu.itemID)}>Edit Dish</button>
                                   {/* <Link to = {`/editdish/${menu.itemID}`}>Edit Dish</Link> */}
                                </div>
                            </div>
                            // }
                            console.log(menu.dishName)
                        })}

                    </div>
                </div>
                <div class="menu">
                    <h2>Events</h2>
                    {this.state.eventData.map((event, i) => {
                        return <div class="card" key={i}>
                            <div class="container">
                                <h4><b>{event.eventName}</b></h4>
                                <p>{event.dishDescription}</p>
                                <p>{event.eventTime}</p>
                                <p>{event.eventDate}</p>
                                <p>{event.eventLocation}</p>
                                <p><b>{event.eventHashtag}</b></p>
                                <button class="btn btn-primary" value={event.eventId} onClick={()=> this.vieweventDetails(event.eventId)}>Edit Event</button>
                            </div>
                        </div>
                    })}

                </div>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    user: state.restaurantReducer
});


export default withRouter(connect(mapStateToProps)(RestaurantProfile));