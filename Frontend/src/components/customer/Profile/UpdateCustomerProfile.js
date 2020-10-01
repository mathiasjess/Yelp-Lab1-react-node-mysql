import React from 'react';
import './UpdateCustomerProfile.css';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { customerProfileUpdate } from '../../../actions/customerAction';
import { connect } from 'react-redux';

class UpdateCustomerProfile extends React.Component {
    constructor(props) {
        super()
        this.state = {
            id: '',
            email: '', 
            firstName: '',
            lastName: '',
            DOB: '',
            location : '',
            city: '',
            state: '',
            country: '',
            nickName: '',
            phoneNumber : '',
            thingsILove : '',
            findmeIn : '',
            websiteDetails : '',
            favourites : '',
            headline : '',
            zipcode: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.updateProfile = this.updateProfile.bind(this)
    }
    handleChange(event) {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    updateProfile(event) {
        event.preventDefault();
        const data = {
            id: this.props.user.id,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            DOB: this.state.DOB,
            location: this.state.location,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            nickName: this.state.nickName,
            phoneNumber: this.state.phoneNumber,
            thingsILove: this.state.thingsILove,
            findmeIn: this.state.findmeIn,
            websiteDetails: this.state.websiteDetails,
            favourites: this.state.favourites,
            headline: this.state.headline,
            zipcode: this.state.zipcode
        }
        axios.put(`http://localhost:3001/customerprofile/updatecustomerprofile`, data)
        .then((response)=>{
            if(response.data.message === "success"){
                alert('Updated Profile')
                this.props.customerProfileUpdate(data)

            }
            else if(response.data.message === "error"){
                alert('Something went wrong. Please try again')
            }
            this.props.history.push(`/customerhomepage/${this.props.user.id}`)
        })
    }
    componentDidMount() {
        this.setState({
            id: this.props.user.id,
            email: this.props.user.email,
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            DOB: this.props.user.DOB,
            location: this.props.user.location,
            city: this.props.user.city,
            state: this.props.user.state,
            country: this.props.user.country,
            nickName: this.props.user.nickName,
            phoneNumber: this.props.user.phoneNumber,
            thingsILove: this.props.user.thingsILove,
            findmeIn: this.props.user.findmeIn,
            websiteDetails: this.props.user.websiteDetails,
            favourites: this.props.user.favourites,
            headline: this.props.user.headline,
            zipcode: this.props.user.zipcode
        })
    }
    render() {
        return (
            <div class="biz-site-expanded-grid-content-column">
                <h1 class="page-title">Profile Information</h1>
                <form>
                    <div class="biz-info-section">
                        <div class="biz-info-row">
                            <ul>
                                <li class="BusinessName"><label class="u-nowrap">First Name</label></li>
                                <li><input type="text" class="inputFields"
                                    onChange={this.handleChange}
                                    name="firstName"
                                    placeholder={this.props.user.firstName} /></li>
                                <li class="BusinessName"><label class="u-nowrap">Last Name</label></li>
                                <li><input type="text" class="inputFields"
                                    onChange={this.handleChange}
                                    name="lastName"
                                    placeholder={this.props.user.lastName} /></li>
                                <li class="BusinessName"><label class="u-nowrap">Nick Name</label></li>
                                <li><input type="text" class="inputFields"
                                    onChange={this.handleChange}
                                    name="nickName"
                                    placeholder={this.props.user.nickName} /></li>
                                <li class="BusinessName"><label class="u-nowrap">Email</label></li>
                                <li><input type="email" class="inputFields"
                                    onChange={this.handleChange}
                                    name="email"
                                    placeholder={this.props.user.email} /></li>
                                <li class="BusinessName"><label class="u-nowrap">Date of Birth</label></li>
                                <li><input type="date" class="inputFields"
                                    onChange={this.handleChange}
                                    name="DOB"
                                    placeholder={this.props.user.DOB} /></li>
                                <li class="BusinessName"><label class="u-nowrap">Contact Number</label></li>
                                <li><input type="text" class="inputFields"
                                    onChange={this.handleChange}
                                    name="phoneNumber"
                                    placeholder={this.props.user.phoneNumber} /></li>
                                <li class="BusinessName"><label class="u-nowrap">Location</label></li>
                                <li><input type="text" class="inputFields"
                                    onChange={this.handleChange}
                                    name="location"
                                    placeholder={this.props.user.location} /></li>
                                <li class="BusinessName"><label class="u-nowrap">City</label></li>
                                <li><input type="text" class="inputFields"
                                    onChange={this.handleChange}
                                    name="city"
                                    placeholder={this.props.user.city} /></li>
                                <li class="BusinessName"><label class="u-nowrap">State</label></li>
                                <li><input type="text" class="inputFields"
                                    onChange={this.handleChange}
                                    name="state"
                                    placeholder={this.props.user.state} /></li>
                                <li class="BusinessName"><label class="u-nowrap">Country</label></li>
                                <li><input type="text" class="inputFields"
                                    onChange={this.handleChange}
                                    name="state"
                                    placeholder={this.props.user.country} /></li>
                                <li class="BusinessName"><label class="u-nowrap">Zip Code</label></li>
                                <li><input type="text" class="inputFields"
                                    onChange={this.handleChange}
                                    name="zipcode"
                                    placeholder={this.props.user.zipcode} /></li>
                                <li class="BusinessName"><label class="u-nowrap">HeadLine</label></li>
                                <li><textarea class="inputFields"
                                    name="headline"
                                    rows="2" cols="50"
                                    placeholder={this.props.user.headline}
                                    onChange={this.handleChange}>
                                </textarea></li>
                                <li class="BusinessName"><label class="u-nowrap">Things I love</label></li>
                                <li><input type="text" class="inputFields"
                                    onChange={this.handleChange}
                                    name="thingsILove"
                                    placeholder={this.props.user.thingsILove} /></li>
                                <li class="BusinessName"><label class="u-nowrap">Favourites</label></li>
                                <li><input type="text" class="inputFields"
                                    onChange={this.handleChange}
                                    name="favourites"
                                    placeholder={this.props.user.favourites} /></li>
                                <li class="BusinessName"><label class="u-nowrap">Find me In</label></li>
                                <li><input type="text" class="inputFields"
                                    onChange={this.handleChange}
                                    name="findmeIn"
                                    placeholder={this.props.user.findmeIn} /></li>
                                <li class="BusinessName"><label class="u-nowrap">Blog or website details</label></li>
                                <li><input type="text" class="inputFields"
                                    onChange={this.websiteDetails}
                                    name="timings"
                                    placeholder={this.props.user.websiteDetails} /></li>
                            </ul>
                        </div>
                    </div>
                    <div class="SubmitUpdate">
                        <button type="submit" onClick={this.updateProfile} class="ybtn ybtn--primary"><span>Save Changes</span></button>
                        <Link to="#" >Cancel</Link>
                    </div>
                </form>
            </div>

        )

    }
}

const mapStateToProps = state => ({
    user: state.customerReducer
});

function mapDispatchToProps(dispatch) {
    return {
        customerProfileUpdate: (data) => dispatch(customerProfileUpdate(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateCustomerProfile));