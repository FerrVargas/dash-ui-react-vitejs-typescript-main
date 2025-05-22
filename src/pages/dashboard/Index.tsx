// import node module libraries
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Col, Row, Card, Button } from "react-bootstrap";

const Dashboard = () => {
  const cardData = [
    {
      title: "Daño",
      description: "Resumen del análisis de daño estructural",
      link: "/pages/Dano",
    },
    {
      title: "Aceleración vs Tiempo",
      description: "Visualización de la aceleración en función del tiempo",
      link: "/pages/AccVSTime",
    },
    {
      title: "Centro de Carga",
      description: "Carga de las baterías y posición",
      link: "/pages/CDC",
    },
    {
      title: "Dummy",
      description: "Información detallada del dummy",
      link: "/pages/Bod",
    },
  ];

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} className="mb-4">
            <h3 className="text-white">Panel Principal</h3>
          </Col>

          {cardData.map((card, index) => (
            <Col xl={3} lg={6} md={12} key={index} className="mb-4">
              <Card className="shadow border-0">
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
      </Container>
    </Fragment>
  );
};

export default Dashboard;
