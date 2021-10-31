import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = React.memo(props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }

        return (
            <Aux>
                <Toolbar
                    // id={props.match.params.id}
                    isAuth={props.isAuthenticated} 
                    drawerToggleClicked={sideDrawerToggleHandler} />
                <SideDrawer
                    // id={props.match.params.id}
                    isAuth={props.isAuthenticated} 
                    open={showSideDrawer}
                    closed={sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {props.children}
                </main>
            </Aux>
        )
});

const mapStateToPropst = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect (mapStateToPropst) (layout);