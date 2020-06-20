import React, { Component, Fragment } from 'react';
import TmpltNavbar from '../../templates/layouts/navbar/TmpltNavbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from '../../routes/appRoute';


class Home extends Component {
    render() {
        return (
            <Fragment>
                <TmpltNavbar />
                <Switch>
                    {routes.map((route, i) => <Route key={i} {...route} />)}
                </Switch>
            </Fragment>
        );
    }
}

export default Home;
