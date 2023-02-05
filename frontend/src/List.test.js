import React from "react";
import axios from "axios";
import { createRoot } from "react-dom/client";
import { act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { ListView } from "./List";

jest.mock("axios");

let container = null;
let root = null;
beforeEach(() => {
  container = document.createElement("div");
  root = createRoot(container);
});

afterEach(() => {
  container = null;
  root = null;
});

describe("ListView", () => {
  it("render item list", async () => {
    const mockList = [
      { id: "0", title: "Test", content: "Hello World" },
      { id: "1", title: "Second", content: "Item in the list" },
    ];

    axios.get.mockImplementation(() => Promise.resolve({ data: mockList }));
    await act(async () => {
      await root.render(
        <Router>
          <ListView />
        </Router>
      );
    });

    expect(container.querySelector("h2").textContent).toBe("Items");
    const ul = container.querySelector("ul");
    expect(ul.children.length).toBe(mockList.length);
    expect(ul.children[0].textContent).toBe(mockList[0].title);
    expect(ul.children[1].textContent).toBe(mockList[1].title);
  });

  it("failed to get list", async () => {
    axios.get.mockImplementation(() =>
      Promise.reject({ response: { data: "Error!" } })
    );
    await act(async () => {
      await root.render(
        <Router>
          <ListView />
        </Router>
      );
    });
    expect(container.querySelector("h2").textContent).toBe("Items");
    const ul = container.querySelector("ul");
    expect(ul.children.length).toBe(0);
  });
});
