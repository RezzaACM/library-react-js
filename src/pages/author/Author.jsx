import React, { Component } from 'react'
import Search from '../../components/SearchTable/Search'
import ButtonAdd from '../../components/ButtonAdd/ButtonAdd'
import AuthorTable from '../../containers/author-list/AuthorTable'


export default class Author extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }


    render() {
        const buttonName = "Add New Author";
        const pathButton = "create-author"
        return (
            <div className="container mt-2">
                <div className="row">
                    <div className="col-md-6">
                        <Search />
                    </div>
                    <div className="col-md-3 offset-md-3">
                        <ButtonAdd buttonName={buttonName} pathButton={pathButton} />
                    </div>
                </div>
                <div className="row mt-2 ">
                    <div className="col-md-12">
                        <AuthorTable />
                    </div>
                </div>
            </div>
        )
    }
}
