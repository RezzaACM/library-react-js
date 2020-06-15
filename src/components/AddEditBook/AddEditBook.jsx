import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { BookValidationSchema } from '../../helpers/validations'
import Axios from 'axios';
import FormData from 'form-data'
import { ToastContainer } from 'react-toastify';

function AddEditBook({ history, match }) {
    const [book, setBook] = useState([])
    const [author, setAuthor] = useState([]);
    const [file, setFile] = useState(null)
    const [previewE, setPreviewE] = useState('')
    const [preview, setPreview] = useState('')
    const { id } = match.params;
    const isAddMode = !id;

    const initialValue = {
        title: '',
        stock: '',
        description: '',
        author: '',
        cover: undefined
    };

    const getAuthor = async () => {
        await Axios.get(`http://localhost:3000/api/authors`)
            .then(res => {
                setAuthor(res.data['data'])
            })
            .catch(err => console.log('Error', err))
    }

    const onSubmit = (values, { setStatus, setSubmitting }) => {
        setStatus();
        let newData;
        if (isAddMode) {
            newData = {
                title: values['title'],
                stock: values['stock'],
                description: values['description'],
                author: values['author'],
                cover: preview
            }
            createBook(newData, setSubmitting)
            // console.log(newData);
            // console.log(values['file']);
        } else {
            // console.log(values);
            // setSubmitting(false)
            updateBook(values, setSubmitting)
        }
        // console.log(values);

    }

    function capitalize(string) {
        return `${string[0].toUpperCase()}${string.slice(1)}`;
    }

    const createBook = (values, setSubmitting,) => {
        const formData = new FormData();
        // console.log(values)
        formData.set('title', capitalize(values['title']));
        formData.set('stock', values['stock']);
        formData.set('description', capitalize(values['description']));
        formData.set('author', values.author);
        formData.append('cover', file)
        Axios({
            method: 'post',
            url: `http://localhost:3000/api/book/create`,
            data: formData,
            headers: { 'content-type': 'multipart/form-data' }
        })
            .then(res => {
                if (res.data['status_code'] === 201) {
                    sessionStorage.setItem('status', JSON.stringify(res.data))
                    history.push({
                        pathname: '/book-list'
                    })
                }
            }, (err) => {
                setSubmitting(false)
                console.log(err.response);
            })
    }


    const updateBook = (values, setSubmitting) => {
        const formData = new FormData();
        // console.log(values)
        formData.set('title', capitalize(values['title']));
        formData.set('stock', values['stock']);
        formData.set('description', capitalize(values['description']));
        if (!isAddMode)
            formData.set('author', values['author']);
        if (file)
            formData.append('cover', file)
        else
            formData.append('cover', '')
        Axios({
            method: 'post',
            url: `http://localhost:3000/api/book/update/${id}`,
            data: formData,
            headers: { 'content-type': 'multipart/form-data' }
        })
            .then(res => {
                if (res.data['status_code'] === 201) {
                    sessionStorage.setItem('status', JSON.stringify(res.data))
                    history.push({
                        pathname: '/book-list'
                    })
                }
            }, (err) => {
                setSubmitting(false)
                console.log(err.response.data);
            })
    }


    // Lifecycle Hooks
    useEffect(() => {
        getAuthor();
    }, [])

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValue}
            validationSchema={BookValidationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched, isSubmitting, setFieldValue }) => {

                // eslint-disable-next-line react-hooks/rules-of-hooks
                useEffect(() => {
                    if (!isAddMode) {
                        Axios.get(`http://localhost:3000/api/book/${id}`)
                            .then(book => {
                                const fields = ['title', 'stock', 'description', 'author']
                                fields.map(field => setFieldValue(field, book.data['data'][field], false))
                                // console.log(book.data['data'])
                                if (!isAddMode) {
                                    setBook(book.data['data']['author'])
                                    setPreview(book.data['data']['cover'])
                                }
                            }, (err) => console.log(err))
                    }
                }, [setFieldValue], []);
                return (

                    <Form className="container" autoComplete="off" >
                        <div>
                            <ToastContainer />
                        </div>
                        <h1>{isAddMode ? 'Add Book' : 'Edit Book'}</h1>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Title</label>
                                <Field name="title" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')}>
                                </Field>
                                <ErrorMessage name="title" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-6">
                                <label>Author</label>
                                <Field name="author" as="select" className={'form-control' + (errors.author && touched.author ? ' is-invalid' : '')}>
                                    {!isAddMode ? <option value={'sadadwadad'}>{book['name']}</option> : <option>Select Author</option>}
                                    {author.map((res, index) => {
                                        if (!isAddMode)
                                            return (
                                                <option key={index + 1} value={res._id}>{res.name}</option>
                                            )
                                        else
                                            return (
                                                <option key={index + 1} value={res._id} >{res.name}</option>
                                            )
                                    })}

                                    {/* {listAuthor} */}
                                </Field>
                                <ErrorMessage name="author" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-6">
                                <label>Stock</label>
                                <Field name="stock" type="text" className={'form-control' + (errors.stock && touched.stock ? ' is-invalid' : '')} />
                                <ErrorMessage name="stock" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-6">
                                <label>Description</label>
                                <Field name="description" as="textarea" type="text" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                                <ErrorMessage name="description" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-6">
                                <label>Cover</label>
                                <Field name="cover" style={{ border: 'none' }} className="form-control" type="file" onChange={(event) => {
                                    setFile(event.currentTarget.files[0])
                                    let binaryData = []
                                    binaryData.push(event.currentTarget.files[0])
                                    setPreview(URL.createObjectURL(new Blob(binaryData, { type: "jpeg/png" })))
                                    setPreviewE(URL.createObjectURL(new Blob(binaryData, { type: "jpeg/png" })))
                                    setFieldValue("file", event.currentTarget.files[0]);
                                }} />
                                {
                                    !isAddMode ? <img width='150px' height='150px' src={`http://localhost:3000/${preview}`} alt="" /> : <img width='150px' height='150px' src={preview} alt="" />
                                }
                                {
                                    !isAddMode ? <img width='150px' height='150px' src={previewE} alt="" /> : null
                                }

                                {/* <img width='150px' height='150px' src={'http://localhost:3000/' + preview} alt="" /> */}
                                <ErrorMessage name="cover" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit"
                                disabled={isSubmitting}
                                className="btn btn-primary">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Save
                            </button>
                        </div>
                    </Form>
                )
            }}

        </Formik>
    );
};

export default AddEditBook;