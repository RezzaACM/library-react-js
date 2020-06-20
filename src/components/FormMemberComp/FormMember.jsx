import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useFormik } from 'formik';
import { memberValidationSchema } from '../../helpers/validations';
import Modal from 'react-bootstrap/Modal';

const memberValues = {
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    profile: undefined,
    confirmPassword: ''
}


const FormMember = (props) => {
    const match = useRouteMatch();
    const history = useHistory();

    const { id } = match.params;
    const isAddMode = !id;

    const { handleSubmit, handleChange, values, touched, errors, handleBlur, setFieldValue, isSubmitting, setSubmitting } = useFormik({
        initialValues: memberValues,
        validationSchema: memberValidationSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    })

    return (
        <div className="container">
            <Modal.Header closeButton>
                <Modal.Title>{isAddMode ? "New Member" : "Update Member"}</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit} className="modal-body">
                <div className="row">
                    <div className="form-group col-md-12">
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
                    <div className="form-group col-md-12">
                        <label htmlFor="email">Email</label>
                        <input
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="email"
                            name="email"
                            type="email"
                            className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                        />
                        <div className="invalid-feedback">{errors.email}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-12">
                        <label htmlFor="password">Password</label>
                        <input
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="password"
                            name="password"
                            type="password"
                            className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}
                        />
                        <div className="invalid-feedback">{errors.password}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-12">
                        <label htmlFor="confirmPassowrd">Confirm Password</label>
                        <input
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')}
                        />
                        <div className="invalid-feedback">{errors.confirmPassword}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-12">
                        <label htmlFor="address">Phone</label>
                        <input
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="phone"
                            name="phone"
                            type="text"
                            className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')}
                        />
                        <div className="invalid-feedback">{errors.phone}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-12">
                        <label htmlFor="address">Address</label>
                        <textarea
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="address"
                            name="address"
                            type="text"
                            className={'form-control' + (errors.address && touched.address ? ' is-invalid' : '')}
                        />
                        <div className="invalid-feedback">{errors.address}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-12">
                        <label htmlFor="profile">Profile</label>
                        <input
                            value={values.profile}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="profile"
                            name="profile"
                            type="file"
                            className={'form-control' + (errors.profile && touched.profile ? ' is-invalid' : '')}
                        />
                        <div className="invalid-feedback">{errors.profile}</div>
                    </div>
                </div>
                <div className="form-group modal-footer">
                    <button type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary">
                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        {isAddMode ? 'Save' : 'Update'}
                    </button>
                    <button type="button" onClick={props.handleClose} className="btn btn-danger ml-2">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormMember;