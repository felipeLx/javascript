import React, { useState, useEffect} from 'react';
import {Link, useParams } from 'react-router-dom';

import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import api from '../../../api/index';

const navigationItems = React.memo((props) => {
    console.log(props);
    return(
    <ul className="NavigationItems">
        <NavigationItem link="/">PartyApp</NavigationItem>
        {!props.isAuthenticated ?
            <NavigationItem link="/service">Serviços</NavigationItem>  
            : null }
        {!props.isAuthenticated ?
            <NavigationItem link="/places">Lugares</NavigationItem>
            : null }
        {!props.isAuthenticated ?
            <NavigationItem link="/about">Sobre Nós</NavigationItem>
            : null }
        {props.isAuthenticated ?
            <NavigationItem link={"/register/" + props._id}>Seu Espaço</NavigationItem>
            : null }
        {!props.isAuthenticated ?
            <NavigationItem link="/auth">Registrar</NavigationItem>
            : null }
        {!props.isAuthenticated ?
            <NavigationItem link="/login">Login</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
    )   
});

export default navigationItems;