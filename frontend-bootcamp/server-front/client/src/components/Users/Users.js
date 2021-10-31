import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

import api from '../../api/index';
import './Users.css';

const Users = () => {
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        api.getAllUsers()
            .then(users => {
                setUsersList(users.data.data);
            })
            .catch(err => console.log(err));
    }, []);
    
    const openUserHandler = (event) => {
        event.preventDefault();
        console.log(event.target.id);
        
        api.getOneUser(event.target.id)
        .then(res => {
            return (
                window.location.href = `${res.config.url}`
                )})
        .catch(err => console.log(err));
        console.log('open user detail clicked');
        // console.log(event);
        
    }

    const renderUser = (user) => {
        return (
            <div key={user._id} className="col col-sm-6 col-lg-4 li">
                 <Card className="card" style={{ width: '18rem' }}>
                    <Card.Img className="card-img-top" variant="top" src={user.picture} />
                    <Card.Body className="card-body">
                        <Card.Title>{user.name}</Card.Title>
                        <Card.Text>
                        {user.description}
                        {user.username}
                        </Card.Text>
                        <Button id={user._id} onClick={(event) => openUserHandler(event)} variant="primary">Ver Detalhe</Button>
                    </Card.Body>
                    </Card>
            </div>
        );
    };

    return(
        <div className="container cards">
        <div className="row">
            
                {(usersList.length > 0) ? (
                usersList.map(user => {
                    return renderUser(user)
                    })
                ) : (
                <p>Por enquanto é o fim!</p>
                )}
            
            </div>
        </div>
    );
};

export default Users;


