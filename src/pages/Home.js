import { Col, Container, Row } from "react-bootstrap";
import Cart from "../components/Cart/Cart";
import Landing from "../components/Landing/Landing";

const Home = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={8} className="p-0"><Landing /></Col>
        <Col xs={12} md={4} className="p-0"><Cart /></Col>
      </Row>
    </Container>
  );
};

export default Home;