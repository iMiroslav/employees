import React, { useEffect, useCallback, useRef } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";
import { fetchEmployees } from "../../api/employeesApi";
import { useEmployeeStore } from "../../store/employeesStore";
import Title from "../common/Title";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { IEmployee } from "../../store/employeeType";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";

type EChartsOption = echarts.EChartsOption;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const EmployeeStatistics = () => {
  const navigate = useNavigate();
  const employees = useEmployeeStore((state) => state.employees);
  const loading = useEmployeeStore((state) => state.loading);
  const setLoading = useEmployeeStore((state) => state.setLoading);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEmployees();
      //console.log(data); // for debugging
      setLoading(false);
    };
    setLoading(true);
    fetchData();
  }, [setLoading, employees]);

  const handleClose = () => {
    navigate("/");
  };

  const groupEmployees = useCallback(
    (groupBy: keyof IEmployee) => {
      if (employees.length > 0) {
        const sortedArray = _.groupBy(
          employees,
          (employee: IEmployee) => employee[groupBy]
        );
        let sorted: { name: string; value: number }[] = [];
        Object.keys(sortedArray).forEach((key, index) => {
          const item = sortedArray[key];
          const length = item.length;
          sorted.push({ name: key, value: length });
        });
        return sorted;
      } else {
        return [];
      }
    },
    [employees]
  );

  const chart1El = useRef(null);
  const chart1Option: EChartsOption = {
    title: {
      text: "Employees by Job Title",
      subtext: "Demo Data",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Employees",
        type: "pie",
        radius: "50%",
        data: groupEmployees("jobTitle"),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  const chart2El = useRef(null);
  const employeesByGender = groupEmployees("gender");
  const chart2Option: EChartsOption = {
    title: {
      text: "Employees by Gender",
      subtext: "Demo Data",
      left: "center",
    },
    xAxis: {
      type: "category",
      data: employeesByGender.map((employee) => employee.name),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: employeesByGender.map((employee) => employee.value),
        type: "bar",
      },
    ],
  };

  const chartStyle = {
    height: "320px",
    width: "100%",
  };

  return (
    <Card>
      <CardContent>
        <Title>Statistics</Title>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Item>
                <ReactEcharts
                  option={chart1Option}
                  style={chartStyle}
                  ref={chart1El}
                />
              </Item>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Item>
                <ReactEcharts
                  option={chart2Option}
                  style={chartStyle}
                  ref={chart2El}
                />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <CardActions>
        <Button onClick={handleClose}>Home</Button>
      </CardActions>
    </Card>
  );
};

export default EmployeeStatistics;
