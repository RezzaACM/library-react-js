import React, { Component, Fragment } from 'react'
import Table from 'react-bootstrap/Table'
import API from '../../services/authorService';
import { Link } from 'react-router-dom';

// Toast helper
import { ToastContainer, Zoom } from 'react-toastify';
import toast from '../../helpers/toast';
import '../../assets/toastifycss/toastContainer.css';
import { confirmAlert } from 'react-confirm-alert';
import { connect } from 'react-redux';

class AuthorTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            author: [],
            isLoading: true
        }
    }


    componentDidMount() {
        this.getAuhtorAPI()
    }

    componentDidUpdate() {
        this.showToastMessage()
    }

    showToastMessage = () => {
        let status = JSON.parse(sessionStorage.getItem('flash-message'))
        if (sessionStorage.getItem('flash-message')) {
            toast.success(status.status_message);
        }
        sessionStorage.removeItem('flash-message')
    }


    getAuhtorAPI = () => {
        API.getAuthor()
            .then(res => {
                this.setState({
                    isLoading: false,
                    author: res.data
                })
            })
    }

    handleDelete = (e, id) => {
        e.preventDefault()
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        API.deleteAuthor(id)
                            .then(res => {
                                sessionStorage.setItem('flash-message', JSON.stringify(res))
                                this.getAuhtorAPI();
                            }, err => {
                                toast.error(err)
                            })
                    }
                },
                {
                    label: 'No',
                }
            ]
        });

    }


    render() {
        const authors = this.state.author.filter((author) => {
            return author.name.toLowerCase().includes(this.props.searchValue.toLowerCase())
        })
        return (
            <Fragment>
                <ToastContainer transition={Zoom} />
                <Table striped bordered hover size="sm">
                    <thead >
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.isLoading ? <tr>
                            <td colSpan="6" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr> :
                            authors.map((res, i) => {
                                return (
                                    <tr key={res._id} >
                                        <td>{i + 1}</td>
                                        <td>{res.name}</td>
                                        <td>{res.email}</td>
                                        <td>{res.phone}</td>
                                        <td>{res.address}</td>
                                        <td>
                                            <a href={res._id} onClick={e => this.handleDelete(e, res._id)}>Delete</a> || &nbsp;
                                            <Link to={`edit-author/${res._id}`} >Edit</Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        {!authors.length && !this.state.isLoading ? <tr>
                            <td colSpan="6" className="text-center">
                                <div className="p-2">No Author To Display</div>
                            </td>
                        </tr> : null}
                    </tbody>
                </Table>
            </Fragment>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        searchValue: state.searchValue
    }
}

export default connect(mapStateToProps)(AuthorTable)