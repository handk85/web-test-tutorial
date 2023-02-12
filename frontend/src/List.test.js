import React from "react";
import axios from "axios";
import { act, render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { ListView } from "./List";

jest.mock("axios");

afterEach(cleanup);

describe("ListView", () => {
  it("render item list", async () => {
    const mockList = [
      { id: "0", title: "Test", content: "Hello World" },
      { id: "1", title: "Second", content: "Item in the list" },
    ];

    axios.get.mockImplementation(() => Promise.resolve({ data: mockList }));
    await act(async () => {
      render(
        <Router>
          <ListView />
        </Router>
      );
    });
    expect(screen.getByText("Items")).toBeInTheDocument();
    const ul = screen.getByRole("feed");
    expect(ul.children.length).toBe(mockList.length);
    expect(ul.children[0].textContent).toBe(mockList[0].title);
    expect(ul.children[1].textContent).toBe(mockList[1].title);
  });

  it("failed to get list", async () => {
    const error = {
      data: "Error!!!",
    };
    axios.get.mockImplementation(() => Promise.reject({ response: error }));
    await act(async () => {
      render(
        <Router>
          <ListView />
        </Router>
      );
    });

    expect(screen.getByText("Items")).toBeInTheDocument();
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert.textContent).toEqual(error.data);
  });
});
