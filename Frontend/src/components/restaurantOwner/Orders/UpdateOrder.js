import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import '../UpdateRestaurantProfile.css'
import { connect } from 'react-redux'

class UpdateOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderSummary: [],
            orderDetails: [],
            optionValue: '',
        }
        this.handleCategoryChange = this.handleCategoryChange.bind(this)
        this.updateOrderStatus = this.updateOrderStatus.bind(this)
        this.cancelOrder = this.cancelOrder.bind(this)
    }
    componentDidMount() {
        axios.all([
            axios.get(`http://localhost:3001/restaurantorders/individualrestaurantordersummary/${this.props.match.params.id}`),
            axios.get(`http://localhost:3001/restaurantorders/individualfetchrestaurantorderdetails/${this.props.match.params.id}`)
        ])
            .then(axios.spread((response1, response2) => {

                this.setState({
                    orderSummary: response1.data.data[0],
                    orderDetails: response2.data.data,
                    optionValue: response1.data.data[0].delivery_status
                })
            }))
    }
    handleCategoryChange(event) {
        event.preventDefault();
        console.log("Target",event.target.value )
        this.setState({
            optionValue: event.target.value
        })
        console.log("Captured Option", this.state.optionValue)
    }
    updateOrderStatus() {
        const data = {
            orderID: this.state.orderSummary.orderID,
            delivery_status: this.state.optionValue
        }
        axios.put('http://localhost:3001/restaurantorders/updateorderstatus', data).
            then(response => {
                if (response.data.message === "success") {
                    alert("Updated Order Status")
                    this.props.history.push(`/restauranthomepage/${this.props.user.restaurantId}`)
                }
            })

    }
    cancelOrder() {
        const data = {
            orderID: this.state.orderSummary.orderID,
            delivery_status: 'Cancelled Order',
            deliveryFilter: 'Cancelled Order'
        }

        axios.put('http://localhost:3001/restaurantorders/cancelorder', data).
            then(response => {
                if (response.data.message === "success") {
                    alert("Cancelled Order")
                    this.props.history.push(`/restauranthomepage/${this.props.user.restaurantId}`)
                }
            })
    }

    render() {
        let status = null;
        if (this.state.orderSummary.deliveryOption === 'pickup') {
            status = (<select onChange={this.handleCategoryChange} >
                <option value={this.state.orderSummary.delivery_status}>{this.state.orderSummary.delivery_status}</option>
                <option value="Order Recieved">Order Recieved</option>
                <option value="Preparing">Preparing</option>
                <option value="Pick Up Ready">Pick Up Ready</option>
                <option value="Picked Up">Picked Up</option>
            </select>)
        }
        else if (this.state.orderSummary.deliveryOption === 'pickup') {
            status = (<select onChange={this.handleCategoryChange} >
                <option value={this.state.orderSummary.delivery_status}>{this.state.orderSummary.delivery_status}</option>
                <option value="Order Recieved">Order Recieved</option>
                <option value="Preparing">Preparing</option>
                <option value="On the Way">On the Way</option>
                <option value="Delivered">Delivered</option>
            </select>)
        }
        return (
            <div class="biz-site-expanded-grid-content-column">
                <div class="biz-info-section">
                    <div class="biz-info-row">
                        <div>
                            <h2> Orders</h2>
                            <div class="card-order">
                                <Link to={{
                                    pathname: '/restaurantviewofcustomer',
                                    aboutProps:
                                    {
                                        id: this.state.orderSummary.customerId,
                                    }
                                }}>
                                    <h4>{this.state.orderSummary.firstName} {this.state.orderSummary.lastName}</h4></Link>
                                <div class="order-footer">
                                    <h4>Date: {this.state.orderSummary.Date}</h4>
                                    <h4>Total Price: {this.state.orderSummary.totalPrice}</h4>
                                </div>
                                <div>
                                    <h4> Order details</h4>
                                    {this.state.orderDetails.length > 0 ? this.state.orderDetails.map(function (order, j) {
                                        return (
                                            <div class="order-footer" key={j}>
                                                <h6>{order.dishName}</h6>
                                                <h6>{order.price}</h6>
                                                <h6>{order.quantity}</h6>
                                            </div>
                                        );
                                    }) : null}
                                </div>
                                <div class="order-footer">
                                    <h5>Delivery Option: {this.state.orderSummary.deliveryOption}</h5>
                                    <h5>Status: {this.state.orderSummary.delivery_status}</h5>
                                    <h5>Order Type: {this.state.orderSummary.deliveryFilter}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form>
                        <div class="biz-info-row">
                        <h2>Update Order Status</h2>
                            <ul>
                                <li class="BusinessName"><label for="cars">Choose a category:</label></li>
                                <li>
                                    {status}
                                    <button onClick={() => this.updateOrderStatus()}>Update Order Status</button>
                                    <button onClick={() => this.cancelOrder()}>Cancel Order</button>
                                </li>
                            </ul>

                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.restaurantReducer
});

export default connect(mapStateToProps)(UpdateOrder);