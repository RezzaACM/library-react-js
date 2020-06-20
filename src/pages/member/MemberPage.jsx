import React, { Component } from 'react';
import Search from '../../components/SearchTable/Search';
import ButtonAdd from '../../components/ButtonAdd/ButtonAdd';
import Modal from 'react-bootstrap/Modal';
import ModalComp from '../../components/ModalComp/ModalComp';
import FormMember from '../../components/FormMemberComp/FormMember';



class MemberPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        }
    }

    handleShow = () => {
        this.setState({
            show: true
        })
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }


    render() {
        // const { path, url } = this.props.match
        // const buttonName = 'Add New Member';
        // const pathButton = url + '/add'
        return (
            <div className="container mt-2">
                <ModalComp show={this.state.show} handleClose={this.handleClose} >
                    <FormMember handleClose={this.handleClose} />
                </ModalComp>
                <div className="row">
                    <div className="col-md-6">
                        <Search />
                    </div>
                    <div className="col-md-3 offset-md-3">
                        {/* <ButtonAdd buttonName={buttonName} pathButton={pathButton} /> */}
                        <button className="btn btn-primary" onClick={() => this.handleShow()} >New Member</button>
                    </div>
                </div>
                <div className="row mt-2 ">
                    <div className="col-md-12">
                    </div>
                </div>
            </div>
        );
    }
}

export default MemberPage;