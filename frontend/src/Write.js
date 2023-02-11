import React from "react";
import App from "./App";
import { Form, Container, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { API_ENDPOINT } from "./config";

export function WriteView() {
  const [formData, setFormdata] = React.useState({
    title: "",
    content: "",
  });
  const [error, setError] = React.useState();

  function write() {
    axios
      .post(`${API_ENDPOINT}/add`, formData)
      .then((response) => {
        console.log(response);
        window.location.href = "/";
      })
      .catch((e) => {
        console.log(e);
        setError(e.data);
      });
  }

  return (
    <App>
      <Container>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            write();
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label htmlFor="item-title">Title</Form.Label>
            <Form.Control
              id="item-title"
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormdata({
                  title: e.target.value,
                  content: formData.content,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="item-content">Content</Form.Label>
            <Form.Control
              id="item-content"
              as="textarea"
              value={formData.content}
              onChange={(e) =>
                setFormdata({
                  content: e.target.value,
                  title: formData.title,
                })
              }
              style={{ height: "300px" }}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        {error && (
          <Alert variant="danger" role="alert">
            {error}
          </Alert>
        )}
      </Container>
    </App>
  );
}
