import React, { Component } from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import Spinner from '../../Spinner/Spinner';
import { resetIngredients } from '../../../redux/actionCreator';
import { Formik } from 'formik';


const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchaseAble: state.purchaseAble,
        userId: state.userId,
        token: state.token
    }
}
const mapDispactToProps = dispatch => {
    return {
        resetIngredients: () => dispatch(resetIngredients()),
    }
}

class Checkout extends Component {
    state = {
        isLoading: false,
        isModalOpen: false,
        modalMsg: ""
    }
    goBack = () => {
        this.props.history.goBack("/");
    }

    render() {
        let form = (<div>
            <Formik initialValues={
                {
                    deliveryAddress: "",
                    phone: "",
                    paymentType: "Cash On Delivery"
                }
            }
                onSubmit={
                    (values) => {
                        //console.log("Values", values)
                        this.setState({
                            isLoading: true
                        })
                        const order = {
                            ingredients: this.props.ingredients,
                            customerInfo: values,
                            price: this.props.totalPrice,
                            orderTime: new Date(),
                            userId: this.props.userId
                        }
                        axios.post("https://burger-builder-e5858-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json?auth=" + this.props.token, order)
                            .then(response => {
                                if (response.status === 200) {
                                    this.setState({
                                        isLoading: false,
                                        isModalOpen: true,
                                        modalMsg: "Order Placed Successfully",
                                    })
                                    this.props.resetIngredients();
                                }
                                else {
                                    this.setState({
                                        isLoading: false,
                                        isModalOpen: true,
                                        modalMsg: "Something Went wrong! Try Again!"
                                    })
                                }
                            })
                            .catch(err => {
                                this.setState({
                                    isLoading: false,
                                    isModalOpen: true,
                                    modalMsg: "Something Went wrong! Try Again!"
                                })
                            });
                        console.log(order);
                    }
                }
                validate={(values) => {
                    const errors = {};
                    if (!values.deliveryAddress) {
                        errors.deliveryAddress = "Required"
                    }

                    if (!values.phone) {
                        errors.phone = "Required"
                    }
                    else if (values.phone.length < 10) {
                        errors.phone = "Phone number Must be 11 Digits"
                    }

                    return errors;
                }}




            >{({ values, handleChange, handleSubmit, errors }) => (
                <div>
                    <h4 style={{ border: "1px solid grey", boxShadow: "1px 1px #888888", borderRadius: "5px", padding: "20px" }}>Payment: {this.props.totalPrice} BDT</h4>
                    <form style={{ border: "1px solid grey", boxShadow: "1px 1px #888888", borderRadius: "5px", padding: "20px" }} onSubmit={handleSubmit}>
                        <input
                            name="deliveryAddress"
                            className="form-control"
                            placeholder="Your Delivery Address"
                            value={values.deliveryAddress}
                            onChange={handleChange}
                        />
                        <span className="text-danger">{errors.deliveryAddress}</span>
                        <br />
                        <input
                            name="phone"
                            className="form-control"
                            placeholder="Your Phone Number"
                            value={values.phone}
                            onChange={handleChange}
                        />
                        <span className="text-danger">{errors.phone}</span>
                        <br />
                        <select
                            name="paymentType"
                            className="form-control"
                            value={values.paymentType}
                            onChange={handleChange}
                        >
                            <option value="Cash On Delivery">Cash On Delivery</option>
                            <option value="Bkash">Bkash</option>
                        </select>
                        <Button className="mr-auto mt-1" style={{ backgroundColor: "#D70F64" }} disabled={!this.props.purchaseAble} type="submit">Place Order</Button>
                        <Button className="ml-1 mt-1" color="secondary" onClick={this.goBack}>Cancel</Button>
                    </form>
                </div>
            )}

            </Formik>

        </div>)
        return (
            <div>
                {this.state.isLoading ? <Spinner /> : form}
                <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
                    <ModalBody>
                        <p>{this.state.modalMsg}</p>
                    </ModalBody>
                </Modal>
            </div >
        )
    }
}

export default connect(mapStateToProps, mapDispactToProps)(Checkout);
