import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

const logout = React.memo(props => {

    const { onLogout } = props;

    useEffect(() => {
        onLogout();
    }, [onLogout]);

        return <Redirect to="/" />;
});

const mapDispatchToPropst = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
}

export default connect(null, mapDispatchToPropst) (logout);