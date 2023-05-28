import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("SNA UI New Hire Test", () => {
  render(<App />);
  const titleElement = screen.getByText(/SNA UI New Hire Test/i);
  expect(titleElement).toBeInTheDocument();
});
