import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { Route, Link , withRouter} from 'react-router-dom';

class EventList extends React.Component{
    constructor(props){
        super(props)
        this.state({
            registryList : []
        })
    }
    componentDidMount(){
        axios.get(`http://localhost:3001/restaurantevents/fetchregistry/${this.props.match.params.id}`)
        .then(response=>{
            if(response.data.message === "success"){
                this.setState({
                    registryList :response.data.data
                })
            }
        })
    }
    render(){
        let count = 0
        return(
            <div>
            <table>
            <tr>
            <td>Sl No.</td>
            <td>Customer Name</td>
            </tr>
            {this.state.registryList && this.state.registryList.map((customer, i)=>{
                <tr key = {i}>
                <td>{count = count + 1}</td>
                <Link to= {{pathname: '/restaurantviewofcustomer',
                            aboutProps:{id: this.state.orderSummary.customerId,}}}>
                            <td>{customer.firstName} {customer.lastName}</td></Link>
                </tr>
            })}
            </table>
            </div>
        )
    }

}
export default EventList