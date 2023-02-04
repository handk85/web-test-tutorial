import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ListView } from "./List";
import { ItemView } from "./Item";
import { WriteView } from "./Write";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/item/:id" component={ItemView} />
        <Route path="/write" component={WriteView} />
        <Route path="/" component={ListView} />
      </Switch>
    </Router>
  </React.StrictMode>
);
