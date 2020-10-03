import React from 'react'
import axios from 'axios'
import default_pic from '../../../images/restaurantprofileImage.png'
import './CustomerOrders.css'
import { connect } from 'react-redux'
import { addToCart, addItem, removeItem, removecart } from '../../../actions/cartActions'

class CustomerOrders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            restaurantID: '',
            customerID: '',
            orderID: '',
            delivey_option: '',
            completeOrderFlag: false

        }
        this.addtoCart = this.handleAddToCart.bind(this)
        this.handleAddquantity = this.handleAddquantity.bind(this)
        this.handleremovequantity = this.handleremovequantity.bind(this)
        this.completeOrder = this.completeOrder.bind(this)
        this.CancelOrder = this.CancelOrder.bind(this)
    }
    componentDidMount() {
        this.setState({
            restaurantID: this.props.match.params.id,
            customerID: this.props.user.id,
            delivery_option: this.props.match.params.option

        })
        console.log('delivery option', this.props.match.params.option)
        axios.get(`http://localhost:3001/restaurant/fetchMenu/${this.props.match.params.id}`)
            .then((response) => {
                console.log(response.data.data)
                if (response.data.message === "success") {

                    this.setState({
                        items: response.data.data
                    })
                }
                else if (response.data.message === "error") {
                    alert("Something went wrong. Please try again")
                }
            })
    }
    handleAddToCart(itemID, dishName, price) {
        let Orderdata = {
            orderID: this.state.orderID,
            itemID: itemID,
            dishName: dishName,
            price: price

        }
        console.log(Orderdata)
        this.props.addToCart(Orderdata)
    }

    handleAddquantity(itemID) {
        this.props.addItem(itemID)
    }

    handleremovequantity(itemID) {
        this.props.removeItem(itemID)
    }
    completeOrder(restaurantId) {
        let OrderDetails = {
            customerID: this.props.user.id,
            restaurantID: restaurantId,
            total_price: this.props.cartItems.total,
            delivery_option: this.props.match.params.option,
            delivery_status: 'Order Recieved',
            deliveryFilter: 'New Order'
        }
        // let formData= new FormData()
        // formData.append('data',JSON.stringify())
        axios.post('http://localhost:3001/orders/sendordersummary', OrderDetails)
            .then(response => {
                if (response.data.message === "success") {
                    axios.post(`http://localhost:3001/orders/sendorderdetails/${response.data.data}`, this.props.cartItems.addedItems)
                        .then(response => {
                            if (response.data.message === "success") {
                                alert('Placed order successfully')
                                this.props.removecart()
                                this.props.history.push(`/customerorderhistory/${this.props.user.id}`)
                            }
                            else {
                                console.log('Could not complete order')
                                this.props.history.push(`/customerhomepage/${this.props.user.id}`)
                                
                            }
                        })
                }
                else if (response.data.message === "error") {
                    alert("Something went wrong")
                    this.props.removecart()
                }
            })
    }

    CancelOrder(restaurantID) {
        this.props.removecart()
        this.props.history.push(`/restauranthomepage/${this.props.user.id}`)
    }

    render() {
        let addedItems = null
        if (this.props.cartItems.addedItems) {
            addedItems = (
                this.props.cartItems.addedItems.map(item => {
                    return (
                        <tr>
                            <td>{item.dishName}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td><button class="btn btn-primary" onClick={() => this.handleAddquantity(item.itemID)}><span class="glyphicon glyphicon-plus"></span></button></td>
                            <td><button class="btn btn-primary" onClick={() => this.handleremovequantity(item.itemID)}><span class="glyphicon glyphicon-minus"></span></button></td>
                        </tr>
                    )
                })
            )
        }


        return (
            <div class="table">
                <div class="tr-items">

                    <div class="td-items1">
                    </div>
                    <div class="td-items2">
                        <h2>Order Food from our Menu</h2>
                        <div class="flex-display-items">
                            {this.state.items.map((menu, i) => {
                                return <div class="card1" key={i}>
                                    <img class="card-img-top-items" src={default_pic} alt="Card image cap" />
                                    <div class="container">
                                        <h4>{menu.dishName}</h4>
                                        <h4>{menu.quantity}</h4>
                                        <h5><b>{menu.price}</b></h5>
                                        <button class="btn btn-primary" value={menu.itemID} onClick={() => this.handleAddToCart(menu.itemID, menu.dishName, menu.price)}>Add to Cart</button>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                    <div class="td-items3">
                        {this.props.cartItems.addedItems ?
                            <div>
                                <h2> Order Details</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Dish Name</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Add</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {addedItems}
                                    </tbody>

                                    <tfoot>
                                        <tr>
                                            <th colSpan="5">Total : {this.props.cartItems.total ? this.props.cartItems.total : null}</th>
                                        </tr>
                                    </tfoot>
                                </table>
                                <button class="btn btn-danger" onClick={() => this.completeOrder(this.props.match.params.id)}>Complete Order</button>
                                <button class="btn btn-danger" onClick={() => this.CancelOrder(this.props.match.params.id)}>Cancel Order</button>
                                {this.state.completeOrderFlag && <div>

                                </div>}
                            </div> : null}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    cartItems: state.cartReducer,
    user: state.customerReducer
});

function mapDispatchToProps(dispatch) {
    return {
        addToCart: (data) => dispatch(addToCart(data)),
        addItem: (id) => dispatch(addItem(id)),
        removeItem: (id) => dispatch(removeItem(id)),
        removecart: () => dispatch(removecart())

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrders)