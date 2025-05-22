// src/components/DashboardCards.tsx
import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const cardData = [
  {
    title: 'Daño',
    description: 'Resumen del análisis de daño estructural.',
    link: '/pages/Dano',
  },
  {
    title: 'Aceleración vs Tiempo',
    description: 'Visualización de la aceleración en función del tiempo.',
    link: '/pages/AccVSTime',
  },
  {
    title: 'Dummy',
    description: 'Información detallada del dummy utilizado.',
    link: '/pages/Bod',
  },
  {
    title: 'Centro de Carga',
    description: 'Análisis del centro de carga del vehículo.',
    link: '/pages/CDC',
  },
];

const DashboardCards: React.FC = () => {
  return (
    <Row>
      {cardData.map((card, index) => (
        <Col key={index} md={6} lg={3} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>{card.title}</Card.Title>
              <Card.Text>{card.description}</Card.Text>
              <Link to={card.link}>
                <Button variant="primary">Ver más</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DashboardCards;
