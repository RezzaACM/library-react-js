import React, { Fragment } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link } from 'react-router-dom';
import routes from '../../../routes/appRoute';
import './TmpltNavbar.css';

const TmpltNavbar = () => {
    return (
        <div>
            <Fragment>
                <Navbar bg="dark" variant="dark">
                    <div className="container">
                        <Navbar.Brand>Book Simply</Navbar.Brand>
                        <Nav className="m-right">
                            <Link to="/">Home</Link>
                            <Link to="/book-list">Book List</Link>
                            <Link to="/author">Author</Link>
                            <Link to="/member">Members</Link>
                        </Nav>
                    </div>
                </Navbar>
            </Fragment>
        </div>
    );
};

export default TmpltNavbar;

