import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import Axios from 'axios';
import { Link } from 'react-router-dom'
import { ToastContainer, Zoom } from 'react-toastify';
import toast from '../../helpers/toast';
// import { css } from 'glamor'
import './BookList.css'
import '../../assets/toastifycss/toastContainer.css'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

export default class BookList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            books: [],
            sort: {
                config: 'asc'
            },
            searchValue: '',
            isLoading: true
        }
        this.sortingHandle = this.sortingHandle.bind(this)

    }

    componentDidMount() {
        setTimeout(() => {
            this.getBooks()
        }, 700);
    }

    componentDidUpdate() {
        this.showToastMessage()
    }


    showToastMessage = () => {
        let status = JSON.parse(sessionStorage.getItem('status'))
        if (sessionStorage.getItem('status')) {
            toast.success(status['status_message']);
        }
        sessionStorage.removeItem('status')
    }

    // handle getBook List
    getBooks() {
        Axios.get(`http://localhost:3000/api/books`)
            .then(res => this.setState({
                isLoading: false,
                books: res.data['data']
            }))
    }

    sortingHandle = (e, key) => {
        const { config } = this.state.sort
        const booksSorted = this.state.books;
        let nextSort;
        if (config === 'asc') {
            if (key === 'stock') {
                booksSorted.sort((a, b) => {
                    if (key === "stock") {
                        return a[key] - b[key]
                    }
                    return 0;
                })
            } else {
                booksSorted.sort((a, b) => {
                    if (a[key] < b[key]) {
                        return -1
                    }
                    if (a[key] > b[key]) {
                        return 1
                    }

                    return 0
                })
            }
            nextSort = 'desc'
        }

        if (config === 'desc') {
            booksSorted.reverse()
            nextSort = 'asc'
        }

        this.setState({
            books: booksSorted,
            sort: {
                config: nextSort
            }
        });
    }

    handleSearch = (e) => {
        this.setState({ searchValue: e.target.value })
    }

    handleDelete = (e, id) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        Axios.delete(`http://localhost:3000/api/book/delete/${id}`)
                            .then(res => {
                                sessionStorage.setItem('status', JSON.stringify(res.data))
                                this.getBooks()
                            }, err => console.log(err))
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
        e.preventDefault()
    }

    render() {

        const myStyle = {
            cursor: 'pointer'
        }

        const filterBooks = this.state.books.filter((book) => {
            return book.title.toLowerCase().includes(this.state.searchValue.toLocaleLowerCase())
            // console.log(book);
        })

        const bookTable = filterBooks
            .map((book, index) => {
                return (
                    <tr key={book._id} >
                        <td>{index + 1}</td>
                        <td>{book.title}</td>
                        <td>{book['author']['name']}</td>
                        <td>{book.description}</td>
                        <td>{book.stock}</td>
                        <td><img width="130px" height="130px" src={`http://localhost:3000/${book.cover}`} alt={book.cover} /></td>
                        <td>
                            <a href={book._id} onClick={(e) => this.handleDelete(e, book._id)}>Delete</a> || &nbsp;
                            <Link to={`edit/${book._id}`} >Edit</Link>
                        </td>
                    </tr>
                )
            })

        return (
            <div className="container">
                <ToastContainer transition={Zoom} />
                <div className="search mt-2 mb-2">
                    <div className="row">
                        <input type="text" className="form-control col-md-6" name="" onChange={this.handleSearch} placeholder="search here ..." id="" value={this.state.searchValue} />
                        <Link to='add' className="col-md-3 offset-md-3 btn btn-primary">Add New</Link>
                    </div>
                </div>
                <Table striped bordered hover size="sm">
                    <thead >
                        <tr style={myStyle}>
                            <th>#</th>
                            <th onClick={(e) => this.sortingHandle(e, 'title')}>Book Title</th>
                            <th onClick={(e) => this.sortingHandle(e, 'author')}>Auhtor Name</th>
                            <th onClick={(e) => this.sortingHandle(e, 'description')}>Desctiption</th>
                            <th onClick={(e) => this.sortingHandle(e, 'stock')}>Book Stock</th>
                            <th>Cover</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.isLoading ? <tr>
                            <td colSpan="7" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr> : bookTable}
                        {!bookTable.length && !this.state.isLoading ? <tr>
                            <td colSpan="7" className="text-center">
                                <div className="p-2">No Users To Display</div>
                            </td>
                        </tr> : null}
                    </tbody>
                </Table>
            </div >
        )
    }
}
