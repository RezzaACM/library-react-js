import React, { useState, useEffect, useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { BookValidationSchema } from '../../helpers/validations'
import Axios from 'axios';
import { withRouter } from 'react-router';


const BookAdd = (props) => {
    const [author, setAuthor] = useState([]);
    const [detailBook, setDetailBook] = useState([]);
    const [id] = useState(props.location.state.id)

    // function get author list
    const getAuthor = async () => {
        await Axios.get(`http://localhost:3000/api/authors`)
            .then(res => {
                setAuthor(res.data['data'])
            })
            .catch(err => console.log('Error', err))
    }

    const getBookDetail = useCallback(() => {
        if (props.location.state.titlePage === "EDIT")
            Axios.get(`http://localhost:3000/api/book/${id}`)
                .then(res => {
                    setDetailBook(res.data['data'])
                }, (err) => console.log(err))
        return;
    }, [id, props.location.state.titlePage])


    // function post new book
    const postBook = (values) => {
        Axios.post(`http://localhost:3000/api/book/create`, values)
            .then(res => {
                if (res.data['status_code'] === 201) {
                    props.history.push('/book-list')
                }
            }, (err) => {
                console.log(err);
            })
    }

    // Lifecycle Hooks
    useEffect(() => {
        getAuthor();
        getBookDetail()
    }, [getBookDetail, id])

    const onSubmit = (values, { setSubmitting }) => {
        // postBook(values)
        console.log(values);
    }

    const listAuthor = author.map((author, index) => {
        return (
            <option key={index + 1} value={author._id} >{author.name}</option>
        )
    })

    // console.log(props.location.state.id)
    let initialValues = {}
    let titlePage;
    if (props.location.state.titlePage === "ADD") {
        titlePage = <h1 className="text-center">Add New Book</h1>;
        initialValues = {
            title: '',
            stock: 0,
            description: '',
            author: '',
        }
    } else {
        titlePage = <h1 className="text-center">Edit New Book</h1>;
        // let titleNew = detailBook['title'].toString()
        initialValues = {
            title: 'titleNew sdadw',
            stock: '1',
            description: '',
            author: '',
        }
    }


    // const initialValues = {
    //     title: '',
    //     stock: 0,
    //     description: '',
    //     author: '',
    // }

    return (
        <div className="container">
            {titlePage}
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={BookValidationSchema}
                onSubmit={onSubmit}
            >
                {({ touched, errors, isSubmitting, setFieldValue }) => (
                    <Form autoComplete="off">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <Field
                                type="text"
                                name="title"
                                className={`form-control col-md-6 ${
                                    touched.title && errors.title ? "is-invalid" : ""
                                    }`}
                            />
                            <ErrorMessage
                                name='title'
                                component="div"
                                className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Author</label>
                            <Field name="author" as="select" placeholder="Favorite Color" className={`form-control col-md-6 ${
                                touched.author && errors.author ? "is-invalid" : ""
                                }`} >
                                <option>Select Author</option>
                                {listAuthor}
                            </Field>
                            <ErrorMessage
                                component="div"
                                className="invalid-feedback"
                                name="author" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="stock">Stock</label>
                            <Field
                                min="0"
                                max="100"
                                type="number"
                                name="stock"
                                className={`form-control col-md-6 ${
                                    touched.stock && errors.stock ? "is-invalid" : ""
                                    }`}
                            />
                            <ErrorMessage
                                name='stock'
                                component="div"
                                className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <Field
                                rows="8"
                                as="textarea"
                                type="text"
                                name="description"
                                className={`form-control col-md-6 ${
                                    touched.description && errors.description ? "is-invalid" : ""
                                    }`}
                            />
                            <ErrorMessage
                                name='description'
                                component="div"
                                className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className='btn btn-primary' disabled={isSubmitting}>{isSubmitting ? "Please wait..." : "Submit"}</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default withRouter(BookAdd);