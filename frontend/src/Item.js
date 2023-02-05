import React from "react";
import axios from "axios";
import { Spinner, Alert } from "react-bootstrap";
import App from "./App";
import { useParams } from "react-router";
import { API_ENDPOINT } from "./config";

export function ItemView() {
  const { id } = useParams();

  const [error, setError] = React.useState();
  const [item, setItem] = React.useState();

  React.useEffect(() => {
    axios
      .get(`${API_ENDPOINT}/item`, {
        params: { id: id },
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "json",
      })
      .then((response) => {
        setItem(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data);
      });
  }, [id]);

  return (
    <App>
      {error && (
        <Alert id="errorAlert" variant="danger">
          {error}
        </Alert>
      )}
      {!item ? (
        <Spinner animation="border" />
      ) : (
        <>
          <h1>{item.title}</h1>
          <br />
          <br />
          <pre>{item.content}</pre>
        </>
      )}
    </App>
  );
}
