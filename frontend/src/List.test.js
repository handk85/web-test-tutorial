import React from "react";
import axios from "axios";
import { act, render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { ListView } from "./List";

jest.mock("axios");

afterEach(cleanup);

describe("ListView tests", () => {
  test("Render item list", async () => {
    const mockList = [
      { id: "0", title: "asdjklfdsj", content: "sdjklfjsaklfjdsa" },
      { id: "1", title: "dahjkfldah", content: "dahdhjkdskljds" },
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
    mockList.map((mockItem, i) => {
      expect(ul.children[i].textContent).toBe(mockItem.title);
    });
  });

  test("Failed to get list from backend", async () => {
    const error = {
      data: "Failed to get list",
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
    expect(alert.textContent).toBe(error.data);
  });
});
