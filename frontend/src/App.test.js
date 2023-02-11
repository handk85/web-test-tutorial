import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

afterEach(cleanup);

describe("App", () => {
  it("Render correctly", async () => {
    render(
      <Router>
        <App>
          <h1>Hello World!</h1>
        </App>
      </Router>
    );

    expect(screen.getByText(/Simple blog/i)).toBeInTheDocument();
    expect(screen.getByText(/2023 DongGyun Han/)).toBeInTheDocument();
    expect(screen.getByText("Hello World!")).toBeInTheDocument();
  });
});
