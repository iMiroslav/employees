import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import EmployeesTable from "./EmployeesTable";
import { BrowserRouter } from "react-router-dom";
import data from "../../api/employeesData.json";

const server = setupServer(
  rest.get("/api", (req, res, ctx) => {
    return res(ctx.json({ name: "Mike Potts" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

test("render table", async () => {
  render(
    <BrowserRouter>
      <EmployeesTable />
    </BrowserRouter>
  );
  const out = await waitFor(() => screen.findByRole("contentinfo"));
  expect(out).toHaveTextContent("Job Title");
});

test("render testing data in the table", async () => {
  render(
    <BrowserRouter>
      <EmployeesTable />
    </BrowserRouter>
  );
  const tableContentCell = await waitFor(() =>
    screen.findAllByRole("table-content")
  );
  expect(tableContentCell[0]).toHaveTextContent(data[0].name);
  //expect(tableContentCell[0]).toHaveTextContent("to fail");
});
