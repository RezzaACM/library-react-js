import React, { Component } from 'react'
import FormAuthorComp from '../../components/FormAuthorComp/FormAuthorComp';

export default class FormAuthor extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <FormAuthorComp />
                    </div>
                </div>
            </div>
        )
    }
}
