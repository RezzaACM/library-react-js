import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FormMember from '../../components/FormMemberComp/FormMember';
import MemberPage from './MemberPage';

function Member({ match }) {
    const { path } = match;
    return (
        <Switch>
            <Route exact path={path} component={MemberPage} />
            <Route path={`${path}/add`} component={FormMember} />
            <Route path={`${path}/edit/:id`} component={FormMember} />
        </Switch>
    );
}

export { Member };