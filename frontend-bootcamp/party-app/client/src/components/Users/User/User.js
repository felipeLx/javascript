import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

import api from '../../../api/index';

const User = React.memo((props) => {
    const [renderData, setRenderData] = useState({
        name:'',
        phone: '',
        email: '',
        city: '',
        neighborhood: '',
        businessType: '',
        picture: []
    });

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async() => {
        await api.getOneUser(props.match.params.id)
            .then(res => {
                setRenderData({
                    name: res.data.data.name,
                    phone: res.data.data.phone,
                    city: res.data.data.city,
                    neighborhood: res.data.data.neighborhood,
                    businessType: res.data.data.businessType,
                    email: res.data.data.username,
                    picture: res.data.data.picture
                })
            })
            .catch(err => console.log(err));
    };

    console.log(props);
    return(
    <div>
        <h1 style={{color: 'black', paddingTop: '70px'}}>{renderData.email}</h1>
        <p style={{color: 'black', paddingTop: '70px'}}>I'm user</p>
        
    </div>
    )
});

export default User;