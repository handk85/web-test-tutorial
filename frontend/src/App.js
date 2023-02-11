import { Link } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";

function App(props) {
  return (
    <>
      <Navbar bg="light" expand="lg" style={{ marginBottom: "5rem" }}>
        <Container>
          <Navbar.Brand as={Link} to="/">
            Simple Blog
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>

      <Container style={{ minHeight: "1000px" }}>{props.children}</Container>

      <footer style={{ marginTop: "3rem", marginBottom: "3rem" }}>
        <Container>
          <hr />
          <p className="text-center">&copy; 2023 DongGyun Han</p>
        </Container>
      </footer>
    </>
  );
}

export default App;
