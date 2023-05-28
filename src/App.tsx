import * as React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Tip from "./components/common/Tip";
import Layout from "./components/layout/Layout";
import EmployeesTable from "./components/employees/EmployeesTable";
import AddEmployee from "./components/employees/AddEmployee";
import EmployeeStatistics from "./components/statistics";
import ReactECharts from "echarts-for-react";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Tip />} />
          <Route path="/dashboard" element={<EmployeesTable />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/stats" element={<EmployeeStatistics />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
