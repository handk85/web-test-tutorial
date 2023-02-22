import React from "react";
import axios from "axios";
import { act, render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { ListView } from "./List";

jest.mock("axios");

afterEach(cleanup);

describe("ListView Test", () => {
  test("render item list", async () => {
    const mockList = [
      { id: "0", title: "Test", content: "Hello!" },
      { id: "1", title: "Tekjljkl", content: "sadhklghsdjklg!" },
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
    mockList.forEach((item, i) => {
      expect(ul.children[i].textContent).toBe(item.title);
    });
  });

  test("Failed to get list", async () => {
    const error = {
      data: "Error!!!!!!",
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
