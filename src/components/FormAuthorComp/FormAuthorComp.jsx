import React from 'react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { AuthorValidationSchema } from '../../helpers/validations';
import { useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import API from '../../services/authorService';
// import { useCallback } from 'react';
import NumberFormat from 'react-number-format';

// Toast helper
import { ToastContainer, Zoom } from 'react-toastify';
import toast from '../../helpers/toast';
import '../../assets/toastifycss/toastContainer.css';

const authorValues = {
    name: '',
    email: '',
    phone: '',
    address: '',
}

const FormAuthorComp = (props) => {
    const [isDisable, setisDisable] = useState(true)
    const match = useRouteMatch();
    const history = useHistory();

    const { id } = match.params;
    const isAddMode = !id;

    const { handleSubmit, handleChange, values, touched, errors, handleBlur, setFieldValue, isSubmitting, setSubmitting } = useFormik({
        initialValues: authorValues,
        validationSchema: AuthorValidationSchema,
        onSubmit: (values) => {
            if (isAddMode)
                createAuthor(values)
            else
                updateAuthor(values)
        }
    })

    const createAuthor = (values) => {
        API.postAuthor(values)
            .then((res) => {
                sessionStorage.setItem('flash-message', JSON.stringify(res))
                history.push({
                    pathname: '/author'
                })
            }, err => {
                setSubmitting(false)
                toast.error(err)
                console.log(err)
            })
    }

    const updateAuthor = (values) => {
        API.updateAuthor(values, id)
            .then(res => {
                sessionStorage.setItem('flash-message', JSON.stringify(res))
                history.push({
                    pathname: '/author'
                })
            }, err => {
                setSubmitting(false)
                toast.error(err)
                console.log(err)
            })
    }

    const emailToggle = (e) => {
        let nextState;
        e.preventDefault()
        if (isDisable)
            nextState = false
        else
            nextState = true

        setisDisable(nextState)
    }

    useEffect(() => {
        if (!isAddMode)
            API.getDetailAuthor(id)
                .then(res => {
                    const fields = ['name', 'email', 'address', 'phone']
                    fields.map(field => setFieldValue(field, res.data[field], false))
                })
    }, [id, isAddMode, setFieldValue])


    return (
        <div>
            <ToastContainer transition={Zoom} />
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="name">Name</label>
                        <input
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="name"
                            name="name"
                            type="text"
                            className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')}
                        />
                        <div className="invalid-feedback">{errors.name}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="email">Email</label>
                        <input
                            value={values.email}
                            disabled={!isAddMode ? isDisable : null}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="email"
                            name="email"
                            type="text"
                            className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                        />
                        <div className="invalid-feedback">{errors.email}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="address">Address</label>
                        <input
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="address"
                            name="address"
                            type="textarea"
                            className={'form-control' + (errors.address && touched.address ? ' is-invalid' : '')}
                        />
                        <div className="invalid-feedback">{errors.address}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="phone">Phone</label>
                        <NumberFormat
                            format="(####) ####-####"
                            mask="_"
                            type="text"
                            value={values.phone}
                            onChange={e => {
                                setFieldValue('phone', e.target.value, false)
                            }}
                            name="phone"
                            id="phone"
                            className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')}
                        />
                        <div className="invalid-feedback">{errors.phone}</div>
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary">
                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        {isAddMode ? 'Save' : 'Update'}
                    </button>
                    {!isAddMode ? <button onClick={(e) => emailToggle(e)} className="btn btn-warning ml-2">
                        Change Email
                    </button> : null}
                    <button onClick={e => {
                        e.preventDefault()
                        history.push('/author')
                    }} className="btn btn-info ml-2">
                        Cancel
                    </button>

                </div>
            </form>
        </div>
    );
};

export default FormAuthorComp;