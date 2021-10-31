import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

import './Filter.css';

const Filter = () => {
    return (
        <div className="Filter">
            <Form>
                <Row>
                    <div className="Box">
                        <Col>
                            <Form.Label>Serviço:</Form.Label>
                            <Form.Control as="select">
                                <option>Casa de Festas</option>
                                <option>Serviço para Festas</option>
                                <option>Comércio de produtos de festa</option>
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>Empresa</Form.Label>
                            <Form.Control type="text" placeholder="Doces da Vóvo" />
                        </Col>
                        <Col>    
                                <Form.Label>Bairro</Form.Label>
                                <Form.Control as="select" multiple>
                                <option>Barra da Tijuca</option>
                                <option>Recreio</option>
                                <option>Botafogo</option>
                                </Form.Control>
                        </Col>
                    </div>        
                </Row>
            </Form>
        </div>
    );
};

export default Filter;