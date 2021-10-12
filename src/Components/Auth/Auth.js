import React, { Component } from 'react';
import { Formik } from 'formik';
import { auth } from '../../redux/authActionCreator';
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import { Alert } from 'reactstrap';

const mapStateToProps = state => {
    return {
        authLoading: state.authLoading,
        authFailedMsg: state.authFailedMsg
    }
}

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, mode) => dispatch(auth(email, password, mode))
    }
}

class Auth extends Component {
    state = {
        mode: "Sign Up"
    }
    switchHandler = () => {
        this.setState({
            mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up"
        })
    }
    render() {
        let authError = null;
        if (this.props.authFailedMsg !== null) {
            authError = <Alert color="danger">{this.props.authFailedMsg}</Alert>;;
        }
        let form = null;
        if (this.props.authLoading) {
            form = <Spinner />
        }
        else {
            form = (
                <Formik initialValues={
                    {
                        email: "",
                        password: "",
                        passwordConfirm: "",
                    }
                }
                    onSubmit={
                        (values) => {
                            //console.log("Values", values);
                            this.props.auth(values.email, values.password, this.state.mode);
                        }
                    }
                    validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                            errors.email = "Invaild Email Address!!";
                        }
                        if (!values.password) {
                            errors.password = "Required"
                        }
                        else if (values.password.length < 4) {
                            errors.password = "Must be atleast 4 Characters"
                        }
                        if (this.state.mode === "Sign Up") {
                            if (!values.passwordConfirm) {
                                errors.passwordConfirm = "Required"
                            }
                            else if (values.password !== values.passwordConfirm) {
                                errors.passwordConfirm = "password Doesn't Match"
                            }
                        }

                        //console.log("Errors:", errors)
                        return errors;

                    }}
                >
                    {({ values, handleChange, handleSubmit, errors }) => (
                        <div style={{
                            border: "1px solid grey",
                            padding: "15px",
                            borderRadius: "5px"
                        }}>
                            <button style={{
                                width: "100%",
                                backgroundColor: "#D70F64",
                                color: "white"
                            }}
                                className="btn btn-lg" onClick={this.switchHandler}
                            >Click here switch To {this.state.mode === "Sign Up" ? "Login" : "Sign Up"} </button>
                            <br /><br />
                            <form onSubmit={handleSubmit}>
                                <input
                                    name="email"
                                    placeholder="Enter your Email"
                                    className="form-control"
                                    value={values.email}
                                    onChange={handleChange} />
                                <span className="text-danger">{errors.email}</span>
                                <br />
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    className="form-control"
                                    value={values.password}
                                    onChange={handleChange} />
                                <span className="text-danger">{errors.password}</span>
                                <br />
                                {this.state.mode === "Sign Up" ? <div>  <input
                                    name="passwordConfirm"
                                    type="password"
                                    placeholder="Re-enter Password"
                                    className="form-control"
                                    value={values.passwordConfirm}
                                    onChange={handleChange}

                                />
                                    <span className="text-danger">{errors.passwordConfirm}</span>
                                    <br /></div> : null}

                                <button
                                    type="submit"
                                    className="btn btn-success">
                                    {this.state.mode === "Sign Up" ? "Sign Up" : "Login"}
                                </button>
                            </form>
                        </div>
                    )}

                </Formik>

            )
        }
        return (
            <div>
                {authError}
                {form}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
