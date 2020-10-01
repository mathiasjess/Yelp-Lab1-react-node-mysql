import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CustomerHomePage.css'
import yelp_brand from '../../images/yelp_brand.png'
import { connect } from 'react-redux';
import ProfileDetails from './Profile/ProfileDetails'


class CustomerHomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchActiveFlag : '',
            searchParameter1 : '',
            searchParameter2 : '',
            props : {}
        }
        this.captureSearchParameters = this.captureSearchParameters.bind(this)
        this.searchRestaurant = this.searchRestaurant.bind(this)
    }
    componentDidMount(){
        this.setState({
            searchActiveFlag : false
        })
    }
    captureSearchParameters(event){
        event.preventDefault();
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    searchRestaurant(event){
        event.preventDefault();
        this.setState({
            searchActiveFlag : true,
            props : {
                searchParameter1 : this.state.searchParameter1,
                searchParameter2 : this.state.searchParameter2
            }
        })
    }

    render() {
        const searchactive = this.state.searchActiveFlag
        return (
            <div class="table">
                <div class="tr-top">
                <div class="td-top1">
                <img class = "yelp_logo"src = {yelp_brand} alt="Avatar" />
                </div>
                <div class="td-top2">
                <form class = "search-class">
                <input class="form-control mr-sm-2" name = "searchParameter1" type="text" onChange = {this.captureSearchParameters} placeholder="dish names,cuisines," aria-label="Search" />
                <input class="form-control mr-sm-2" name = "searchParameter2" type="text" onChange={this.captureSearchParameters} placeholder="location, zipcode" aria-label="Search" />
                {/*<button class="btn btn-outline-success my-2 my-sm-0" onClick = {this.searchRestaurant} type="submit">Search</button>*/}
                <Link to ={{pathname : '/searchrestaurant', 
                                                                    aboutProps:
                                                                         {searchParameter1 : this.state.searchParameter1,
                                                                          searchParameter2 : this.state.searchParameter2
                                                                        }}}>Search</Link>
                </form>
                </div>
                <div class="td-top3">
                <Link to='#' class="nav-link" onClick={this.handleAddMenu}>Events</Link>
                </div>
                </div>
                {/* {searchactive? <SearchRestaurant {...this.state.props} />: <ProfileDetails />}*/}
                <ProfileDetails />
            </div>

        )
    }

}
const mapStateToProps = state => ({
    user: state.customerReducer
});


export default connect(mapStateToProps)(CustomerHomePage);