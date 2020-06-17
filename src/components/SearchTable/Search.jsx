import React from 'react';
import { connect } from 'react-redux';

const Search = (props) => {
    return (
        <div>
            {
                props.searchhValue
            }
            <input type="text" value={props.searchValue} onChange={e => props.handleChange(e.target.value)} className="form-control col-md-12" name="" placeholder="search here ..." id="" />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        searchValue: state.searchValue
    }
}

const mapsDispatchToProps = dispatch => ({
    handleChange: (value) => dispatch({ type: "SEARCH_VALUE", value })
});

export default connect(mapStateToProps, mapsDispatchToProps)(Search);