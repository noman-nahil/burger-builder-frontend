import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import './Header.css';
import Logo from '../../assets/b.png';
import { connect } from 'react-redux';
import Logout from '../Auth/Logout';

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

const Header = (props) => {
    let links = null;
    if (props.token === null) {
        links = (
            <Nav className="mr-md-5">
                <NavItem>
                    <NavLink exact to="/login" className="NavLink">Login</NavLink>
                </NavItem>
            </Nav>
        )


    } else {
        links = (
            <Nav lassName="mr-md-5">
                <NavItem>
                    <NavLink exact to="/" className="NavLink">Burger Builder</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink exact to="/orders" className="NavLink">Order List</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink exact to="/logout" className="NavLink">Logout</NavLink>
                </NavItem>
            </Nav>
        )
    }
    return (
        <div className="Navigation">
            <Navbar style={{ background: "#D70F64", height: "70px" }}>
                <NavbarBrand href="/" className="mr-auto ml-5 Brand"><img src={Logo} alt="logo" width="80px" /></NavbarBrand>
                {links}
            </Navbar>
        </div>
    );
}
export default connect(mapStateToProps, null)(Header);