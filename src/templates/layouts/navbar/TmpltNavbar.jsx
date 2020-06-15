import React, { Component, Fragment } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { BrowserRouter as Router, Switch, Link, Route, NavLink } from 'react-router-dom';
import appRoute from '../../../routes/appRoute';

export default class TmpltNavbar extends Component {
    render() {
        return (
            <Router>
                <Fragment>
                    <Navbar bg="dark" variant="dark">
                        <div className="container">
                            <Navbar.Brand>Book Simply</Navbar.Brand>
                            <Nav className="m-right">
                                <NavLink to="/">Home</NavLink>
                                <NavLink to="/book-list">Book List</NavLink>
                            </Nav>
                        </div>
                    </Navbar>
                </Fragment>
                <Switch>
                    {appRoute.map((route, index) => <Route key={index} {...route} />)}
                </Switch>
            </Router>
        )
    }
}
