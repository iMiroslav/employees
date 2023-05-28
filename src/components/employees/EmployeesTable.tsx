import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { Button } from "@mui/material";
import Title from "../common/Title";
import { useEmployeeStore } from "../../store/employeesStore";
import { IEmployee } from "../../store/employeeType";
import { fetchEmployees } from "../../api/employeesApi";
import { useNavigate } from "react-router-dom";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const EmployeesTable = () => {
  const employees = useEmployeeStore((state) => state.employees);
  const removeEmployee = useEmployeeStore((state) => state.removeEmployee);
  const loading = useEmployeeStore((state) => state.loading);
  const orderBy = useEmployeeStore((state) => state.orderBy);
  const setOrderBy = useEmployeeStore((state) => state.setOrderBy);
  const order = useEmployeeStore((state) => state.order);
  const setOrder = useEmployeeStore((state) => state.setOrder);
  const setLoading = useEmployeeStore((state) => state.setLoading);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    navigate("/add");
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEmployees();
      console.log(data); // for debugging
      setLoading(false);
    };
    setLoading(true);
    fetchData();
  }, [setLoading, employees]);

  const onRemove = (event: React.MouseEvent<HTMLElement>, name: string) => {
    event.preventDefault();
    removeEmployee(name);
  };

  const sortData = () => {
    const orderByKeys: (keyof IEmployee)[] = [
      "name",
      "jobTitle",
      "tenure",
      "gender",
    ];
    const orderIndex = orderByKeys.findIndex((item) => item === orderBy);
    sortedEmployees = employees.sort((a, b) => {
      switch (orderBy) {
        case "tenure":
          const intA = parseInt(a["tenure"]);
          const intB = parseInt(b["tenure"]);
          if (intA < intB) {
            return order === "asc" ? -1 : 1;
          }
          if (intA > intB) {
            return order === "asc" ? 1 : -1;
          }
          return 0;
        default:
          const valueA = a[orderByKeys[orderIndex]].toUpperCase(); // should be a[orderBy] but this cause typescript error
          const valueB = b[orderByKeys[orderIndex]].toUpperCase();
          if (valueA < valueB) {
            return order === "asc" ? -1 : 1;
          }
          if (valueA > valueB) {
            return order === "asc" ? 1 : -1;
          }
          return 0;
      }
    });
  };

  const createSortHandler = (cellId: string) => {
    setOrderBy(cellId);
    setOrder(order === "asc" ? "desc" : "asc");
  };

  let sortedEmployees = employees;
  sortData();

  return (
    <>
      <Grid justifyContent="space-between" container spacing={2}>
        <Title ml={3} mt={3}>
          Employees
        </Title>
        <Box>
          <Button variant="contained" onClick={handleClickOpen}>
            Add
          </Button>
        </Box>
      </Grid>
      {loading ? (
        <Box>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      ) : (
        <Table size="small" role="contentinfo">
          <TableHead>
            <TableRow>
              <TableCell key="name">
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={(e) => createSortHandler("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell key="jobTitle">
                <TableSortLabel
                  active={orderBy === "jobTitle"}
                  direction={orderBy === "jobTitle" ? order : "asc"}
                  onClick={(e) => createSortHandler("jobTitle")}
                >
                  Job Title
                </TableSortLabel>
              </TableCell>
              <TableCell key="tenure">
                <TableSortLabel
                  active={orderBy === "tenure"}
                  direction={orderBy === "tenure" ? order : "asc"}
                  onClick={(e) => createSortHandler("tenure")}
                >
                  Tenure
                </TableSortLabel>
              </TableCell>
              <TableCell key="gender">
                <TableSortLabel
                  active={orderBy === "gender"}
                  direction={orderBy === "gender" ? order : "asc"}
                  onClick={(e) => createSortHandler("gender")}
                >
                  Gender
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedEmployees.map((employee) => (
              <StyledTableRow key={employee.name}>
                <TableCell role="table-content">{employee.name}</TableCell>
                <TableCell role="table-content">{employee.jobTitle}</TableCell>
                <TableCell align="right" role="table-content">
                  {employee.tenure}
                </TableCell>
                <TableCell role="table-content">{employee.gender}</TableCell>
                <TableCell align="right">
                  <Link
                    component="button"
                    variant="body2"
                    onClick={(e) => onRemove(e, employee.name)}
                  >
                    Remove
                  </Link>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default EmployeesTable;
