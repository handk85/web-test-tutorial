import React from "react";
import axios from "axios";
import {
  act,
  render,
  screen,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { WriteView } from "./Write";

jest.mock("axios");

let title,
  content,
  button = null;

beforeEach(() => {
  render(
    <Router>
      <WriteView />
    </Router>
  );
  title = screen.getByLabelText("Title");
  content = screen.getByLabelText("Content");
  button = screen.getByText("Submit");
});

afterEach(cleanup);

describe("WriteView", () => {
  it("Render correctly", async () => {
    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("Succesful submission", () => {
    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    // mocking
    axios.post.mockImplementation(() => Promise.resolve({ data: "" }));

    // submitting an item
    fireEvent.change(title, { target: { value: "Test " } });
    fireEvent.change(content, { target: { value: "Test Value" } });
    fireEvent.click(button);

    expect(axios.post).toBeCalled();
  });

  it("Failed submission", async () => {
    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    // mocking
    const error = {
      data: "Error!!!",
    };
    axios.post.mockImplementation(() => Promise.reject({ response: error }));

    // submitting an item
    await act(async () => {
      fireEvent.change(title, { target: { value: "Test " } });
      fireEvent.change(content, { target: { value: "Test Value" } });
      fireEvent.click(button);
    });

    expect(axios.post).toBeCalled();
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert.textContent).toEqual(error.data);
  });
});
