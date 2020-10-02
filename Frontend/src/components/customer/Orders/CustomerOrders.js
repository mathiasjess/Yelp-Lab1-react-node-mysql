import React from 'react'
import axios from 'axios'
import default_pic from '../../../images/restaurantprofileImage.png'
import './CustomerOrders.css'
import { connect } from 'react-redux'
import { addToCart, addItem, removeItem } from '../../../actions/cartActions'

class CustomerOrders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            restaurantID: '',
            customerID: '',
            orderID: '',
            delivey_option : '',
            completeOrderFlag: false

        }
        this.addtoCart = this.handleAddToCart.bind(this)
        this.handleAddquantity = this.handleAddquantity.bind(this)
        this.handleremovequantity = this.handleremovequantity.bind(this)
        this.completeOrder = this.completeOrder.bind(this)
    }
    componentDidMount() {
        this.setState({
            restaurantID: this.props.match.params.id,
            customerID: this.props.user.id,
            orderID: Math.floor((Math.random() * 500) + 1),
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
        let data = {
            orderID: this.state.orderID,
            itemID: itemID,
            dishName: dishName,
            price: price

        }
        console.log(data)
        this.props.addToCart(data)
    }

    handleAddquantity(itemID) {
        this.props.addItem(itemID)
    }

    handleremovequantity(itemID) {
        this.props.removeItem(itemID)
    }
    completeOrder() {
        if (this.props.cartItems.addedItems) {
            this.setState({
                completeOrderFlag: true
            })
        }
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
                                <tr>
                                    <th>Dish Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Add</th>
                                    <th>Remove</th>
                                </tr>
                                {addedItems}
                                <tr>
                                    <th colspan="2">Total : {this.props.cartItems.total ? this.props.cartItems.total : null}</th>
                                    <th colspan="3"><button class="btn btn-danger" onClick={() => this.completeOrder}>Complete Order</button></th></tr>
                            </table> 
                            {this.state.completeOrderFlag && <div>

                            </div>}
                        </div>: null}
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
        removeItem: (id) => dispatch(removeItem(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrders)