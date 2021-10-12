import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../../redux/actionCreator';
import Spinner from '../Spinner/Spinner';
import Order from './Order/order';

const mapStateToProps = state => {
    return {
        orders: state.orders,
        orderLoading: state.orderLoading,
        orderErr: state.orderErr,
        token: state.token,
        userId: state.userId
    }
}

const mapDispactchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
    }
}

export class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
    }
    // componentDidUpdate() {
    //     console.log(this.props);
    //     this.props.fetchOrders();
    // }
    render() {
        let orders = null
        if (this.props.orderErr) {
            orders = <p style={{ border: "1px solid grey", borderRadius: "5px", padding: "5px", marginRight: "10px", textAlign: "center" }} className="text-danger">Faild To Load Orders!</p>
        }
        else {
            if (this.props.orders.length === 0) {
                orders = <p style={{ border: "1px solid grey", borderRadius: "5px", padding: "5px", marginRight: "10px", textAlign: "center" }} className="text-secondary">You have no orders!</p>
            }
            else {
                orders = this.props.orders.map(order => {
                    return <Order order={order} key={order.id} />
                })
            }

        }

        return (
            <div className="">
                {this.props.orderLoading ? <Spinner /> : orders}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispactchToProps)(Orders);
