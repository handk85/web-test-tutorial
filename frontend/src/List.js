import React from "react";
import axios from "axios";
import App from "./App";
import { Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_ENDPOINT } from "./config";

export function ListView() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    axios.get(`${API_ENDPOINT}/list`).then((resp) => {
      setItems(resp.data);
    });
  }, []);

  return (
    <App>
      <h2>Items</h2>
      {!items ? (
        <Spinner />
      ) : (
        <ul role="feed">
          {items.map((item) => {
            return (
              <li key={item.id}>
                <Link to={`/item/${item.id}`}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
      )}
      <Button href="write">Write</Button>
    </App>
  );
}
