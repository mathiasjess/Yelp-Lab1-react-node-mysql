import React from 'react'
import './SearchRestaurant.css'
import axios from 'axios'
import { connect } from 'react-redux'
import default_pic from '../../../images/restaurantprofileImage.png'
import yelp_brand from '../../../images/yelp_brand.png'
import { Link } from 'react-router-dom'

class SearchRestaurant extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchParameter1: '',
            searchParameter2: '',
            delivery: {
                curbPickup: false,
                dineIn: false,
                yelpDelivery: false,
                location : false
            },
            searchResults: [],
            staticResults: []
        }
        this.goToRestaurant = this.goToRestaurant.bind(this)
        this.Filter = this.Filter.bind(this)
    }
    componentDidMount() {
        axios.get('http://localhost:3001/search/searchforrestaurant', { params: [this.props.location.aboutProps.searchParameter1, this.props.location.aboutProps.searchParameter2] })
            .then((response) => {
                if (response.data.message === "success") {
                    this.setState({
                        searchResults: response.data.data,
                        staticResults: response.data.data
                    })
                } else if (response.data.message === "error") {
                    alert("No result found")
                    this.props.history.push(`/customerhomepage/${this.props.user.id}`)
                }
            })

    }
    goToRestaurant(restaurantId) {
            this.props.history.push(`/customerviewofrestaurant/${restaurantId}`)
    }
    Filter(e) {
        this.setState({
            searchResults: this.state.staticResults
        })
        const name = e.target.name;
        this.setState(((prevState) => {
            return {
                delivery: {
                    ...prevState.delivery,
                    [name]: !prevState.delivery[name]
                }
            }
        }), function () {
            console.log(this.state.delivery.curbPickup)
            if(this.state.delivery.location === true){
                this.setState(({
                    searchResults: this.state.searchResults.filter((result) => {
                        return result.curbPickup === Number(this.state.delivery.curbPickup) ||
                            result.dineIn === Number(this.state.delivery.dineIn) ||
                            result.yelpDelivery === Number(this.state.delivery.yelpDelivery ||
                                result.zipcode === this.props.user.zipcode);
                    })
                }), function () { console.log("New results", this.state.searchResults) })
            }
            else{
                this.setState(({
                    searchResults: this.state.searchResults.filter((result) => {
                        return result.curbPickup === Number(this.state.delivery.curbPickup) ||
                            result.dineIn === Number(this.state.delivery.dineIn) ||
                            result.yelpDelivery === Number(this.state.delivery.yelpDelivery);
                    })
                }), function () { console.log("New results", this.state.searchResults) })
            }  

        });

    }
    render() {
        return (
            <div class="table">
                <div class="tr-top">
                    <div class="td-top1">
                        <img class="yelp_logo" src={yelp_brand} alt="Avatar" />
                    </div>
                    <div class="td-top2">
                        <form class="search-class">
                            <input class="form-control mr-sm-2" name="searchParameter1" type="text" onChange={this.captureSearchParameters} placeholder="dish names,cuisines," aria-label="Search" />
                            <input class="form-control mr-sm-2" name="searchParameter2" type="text" onChange={this.captureSearchParameters} placeholder="location, zipcode" aria-label="Search" />
                            <button class="btn btn-outline-success my-2 my-sm-0" onClick={this.searchRestaurant} type="submit">Search</button>
                        </form>
                    </div>
                    <div class="td-top3">
                        <Link to='#' class="nav-link" onClick={this.handleAddMenu}>Events</Link>
                    </div>
                </div>
                <div class="tr-middle1">
                    <div class="td-filter">
                        <div class="tr-filtermode">
                            <h5>Mode</h5>
                            <p>{this.state.curbPickup}</p>
                            <ul>
                                <li class="BusinessName"><label class="u-nowrap">
                                    <input type="checkbox"
                                        name="curbPickup"
                                        checked={this.state.delivery.curbPickup}
                                        onChange={this.Filter} />
                                        Curbside Pickup</label></li>

                                <li class="BusinessName"><label class="u-nowrap">
                                    <input type="checkbox"
                                        name="dineIn"
                                        checked={this.state.delivery.dineIn}
                                        onChange={this.Filter} />
                                        Dine In</label></li>
                                <li class="BusinessName"><label class="u-nowrap">
                                    <input type="checkbox"
                                        name="yelpDelivery"
                                        checked={this.state.delivery.yelpDelivery}
                                        onChange={this.Filter} />
                                        Yelp Delivery</label></li>
                            </ul>
                        </div>
                        <div class="tr-filterlocation">
                            <p>Neighbourhood Locations</p>
                            <ul>
                                <li class="BusinessName"><label class="u-nowrap">
                                    <input type="checkbox"
                                        name="location"
                                        checked={this.state.delivery.zipcode}
                                        onChange={this.Filter} />
                                        Location</label></li>
                            </ul>
                        </div>
                        <div class="tr-filterOthers">
                            <p>Filter Others</p>
                        </div>
                    </div>
                    <div class="td-restaurant">
                        {this.state.searchResults.map((result, i) => {
                            return (<div class="card" key={i}>
                                <img class="card-img-top" src={default_pic} alt="Card image cap" />
                                <div class="card-body">
                                    <h4 class="card-title">{result.restaurantName}</h4>
                                    <h5>{result.location},{result.city}-{result.zipcode}</h5>
                                    <h6>Cuisine: {result.cuisine}</h6>
                                    <p class="card-text">{result.description}</p>
                                    <button class="btn btn-danger" onClick={()=>this.goToRestaurant(result.restaurantId)}>Visit website</button>
                                </div>
                            </div>)
                        })}
                    </div>
                    <div class="td-maps">
                        <p>maps</p>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    user: state.customerReducer
});

export default connect(mapStateToProps)(SearchRestaurant);