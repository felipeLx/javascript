import React from 'react';

import partyLogo from '../../assets/pforall.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={partyLogo} alt="MyPartyLogo" />
    </div>
);

export default logo;