import React from "react";
import axios from "axios";
import { act, render, screen, cleanup } from "@testing-library/react";
import { Route, MemoryRouter } from "react-router-dom";

import { ItemView } from "./Item";

jest.mock("axios");

afterEach(cleanup);

describe("ItemView", () => {
  it("render item", async () => {
    const mockItem = {
      id: "0",
      title: "Test Title",
      content: "This is test!!!",
    };

    axios.get.mockImplementation(() => Promise.resolve({ data: mockItem }));
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/item/0"]}>
          <Route path="/item/:id">
            <ItemView />
          </Route>
        </MemoryRouter>
      );
    });

    expect(screen.getByText(mockItem.title)).toBeInTheDocument();
    expect(screen.getByText(mockItem.content)).toBeInTheDocument();
  });

  it("failed to get Item", async () => {
    const error = {
      data: "Error!!!",
    };
    axios.get.mockImplementation(() => Promise.reject({ response: error }));
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/item/0"]}>
          <Route path="/item/:id">
            <ItemView />
          </Route>
        </MemoryRouter>
      );
    });

    const errorAlert = screen.getByRole("alert");
    expect(errorAlert).toBeInTheDocument();
    expect(errorAlert.textContent).toBe(error.data);
  });
});
