// import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
// import { Route, Redirect } from 'react-router-dom';
// import { Form, Col, Button } from 'react-bootstrap';
// import PropTypes from 'prop-types';

// import api from '../../api/index';
// import classes from './Register.module.css';

// const register = (props) => {

//     const [user, setUser] = useState({
//         name: '',
//         city: '',
//         neighborhood: '',
//         description: '',
//         phone: '',
//         picture: [],
//         businessType: ''
//     });

//     useEffect(() => {
//         console.log(props);
//         api.getUserById(props.match.params.id) 
//                 .then(res => {
//                     console.log(res);
//                     setUser({
//                         name: res.data.name,
//                         city: res.data.city,
//                         neighborhood: res.data.neighborhood,
//                         description: res.data.description,
//                         phone: res.data.phone,
//                         businessType: res.data.businessType
//                     })
//                 })
//                 .catch(err => {
//                     console.log('ops, problem with your id? ' + err.message);
//                 });
//     },[]);

//     const updateUserHandler = async() => {
//         console.log(props);  
            
//             const newUser = {
//                 name: user.name,
//                 city: user.city,
//                 neighborhood: user.neighborhood,
//                 description: user.description,
//                 phone: user.phone,
//                 businessType: user.businessType,
//                 // picture: user.picture[0]
//             }

//         await api.updateUserById(props.match.params.id, newUser)
//             .then(res => {console.log(res)})
//             .catch(err => console.log(err));
//     };


//     const onChangeName = (e) => {
//         setUser({
//           name: e.target.value
//         });
//     };

//     const onChangeCity = (e) => {
//         setUser({
//           city: e.target.value
//         });
//     };

//     const onChangeNeighborhood = (e) => {
//         setUser({
//           neighborhood: e.target.value
//         });
//     };

//     const onChangeDescription = (e) => {
//         setUser({
//             description: e.target.value
//         });
//     };

//     const onChangePhone = (e) => {
//         setUser({
//             phone: e.target.value
//         });
//     };

//     const onChangeBusinessType = (e) => {
//         setUser({
//             businessType: e.target.value
//         });
//     };

//     // const fileSelectedHandler = (e) => {
//     //     setUser({
//     //         picture: e.target.value
//     //     });
//     // };
    
//         return(
            
//             <div style={{paddingTop: '70px', padding: '10px'}}>
            
//             <div className="container cards">
//                 <h2>Espaço do usuário</h2>
//                 <h5>Altere dados ou acrescente fotos, seu espaço!</h5>

//                 <div className="row">
//                 <div className="col col-sm-6 col-lg-4 li">
//                  <Form className={classes.formGroup} action={"/register/" + props.match.params.id} method="POST">
//                         <Form.Label>Nome da empresa</Form.Label>
//                         <Form.Control onChange={onChangeName} type="text" name="name" value={user.username}   />
//                         <Form.Row>
//                             <Col className="col col-sm-4">    
//                                 <Form.Label>Telefone</Form.Label>
//                                 <Form.Control onChange={onChangePhone} type="text" name="phone" value={user.phone} />
//                             </Col>
                        
//                             <Col>
//                                 <Form.Label>Tipo de serviço:</Form.Label>
//                                 <Form.Control onChange={onChangeBusinessType} as="select" name="businessType" value={user.businessType}>
//                                 <option></option>
//                                 <option>Casa de Festas</option>
//                                 <option>Serviço para Festas</option>
//                                 <option>Comércio de produtos de festa</option>
//                                 </Form.Control>
//                             </Col>
//                             <Col>    
//                                 <Form.Label>Cidade</Form.Label>
//                                 <Form.Control onChange={onChangeCity} type="text" name="city" value={user.city} />
//                             </Col>    
//                             <Col>
//                                 <Form.Label>Bairro</Form.Label>
//                                 <Form.Control onChange={onChangeNeighborhood} type="text" name="neighborhood" value={user.neighborhood} />
//                             </Col>
//                             </Form.Row>
//                             <Form.Row>
//                                 <Col className="col col-sm-4"> 
//                                     <Form.Label>Descrição</Form.Label>
//                                     <Form.Control onChange={onChangeDescription} as="textarea" type="textarea" rows="5" name="description" value={user.description} />
//                                 </Col>
//                                 <hr row="2" />
//                                 <Col>
//                                     <Form.Label>Fotos</Form.Label>
//                                     {/* <Form.Control type="file" name="pic" onChange={fileSelectedHandler} /> */}
//                                 </Col>
//                             </Form.Row>
//                     </Form>
            
//                 </div>
//                 </div>
//                 <Button className="btn btn-primary" type="submit" onClick={() => updateUserHandler()}>Registrar</Button>
//             </div>
//             </div>
//         );
// };

// export default register;