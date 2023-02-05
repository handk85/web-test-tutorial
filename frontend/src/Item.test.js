import React from "react";
import axios from "axios";
import { createRoot } from "react-dom/client";
import { act } from "@testing-library/react";
import { Route, MemoryRouter } from "react-router-dom";

import { ItemView } from "./Item";

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

describe("ItemView", () => {
  it("render item", async () => {
    const mockItem = {
      id: "0",
      title: "Test Title",
      content: "This is test!!!",
    };

    axios.get.mockImplementation(() => Promise.resolve({ data: mockItem }));
    await act(async () => {
      await root.render(
        <MemoryRouter initialEntries={["/item/0"]}>
          <Route path="/item/:id">
            <ItemView />
          </Route>
        </MemoryRouter>
      );
    });
    expect(container.querySelector("h1").textContent).toBe(mockItem.title);
    expect(container.querySelector("pre").textContent).toBe(mockItem.content);
  });

  it("failed to get Item", async () => {
    const errorMessage = "This is a test Error";
    axios.get.mockImplementation(() =>
      Promise.reject({ response: { data: errorMessage } })
    );
    await act(async () => {
      await root.render(
        <MemoryRouter initialEntries={["/item/0"]}>
          <Route path="/item/:id">
            <ItemView />
          </Route>
        </MemoryRouter>
      );
    });
    const errorAlert = container.querySelector("#errorAlert");
    expect(errorAlert).toBeValid();
    expect(errorAlert.textContent).toBe(errorMessage);
    expect(container.querySelector("h1")).toBeNull();
    expect(container.querySelector("pre")).toBeNull();
  });
});
