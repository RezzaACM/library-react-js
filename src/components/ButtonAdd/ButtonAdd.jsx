import React from 'react';
import { useHistory } from 'react-router-dom';


const ButtonAdd = (props) => {
    const history = useHistory()

    const routeChange = (path) => {
        history.push(path)
    }

    return (
        <div>
            <button className="col-md-12 btn btn-primary" onClick={() => routeChange(props.pathButton)} >{props.buttonName}</button>
        </div>
    );
};

export default ButtonAdd;