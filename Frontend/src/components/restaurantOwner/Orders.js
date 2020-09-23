import React from 'react'
import './UpdateRestaurantProfile.css'
import { useSelector, connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Orders extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div class="biz-site-expanded-grid-content-column">
                <h1 class="page-title">Add dishes to your restaurant</h1>
                <div class="biz-info-section">
                    <div class="card">
                        <img class="card-img-top" src="..." alt="Card image cap" />
                        <div class="card-body">
                            <h5 class="card-title">Order ID</h5>
                            <p class="card-text">User Profile</p>
                            <p class="card-text">Items</p>
                            <p class="card-text">Total Price</p>
                            <a href="#" class="btn btn-primary">Update Order Status</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default Orders;