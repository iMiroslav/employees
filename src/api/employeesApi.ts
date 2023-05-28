import data from "./employeesData.json";
import { IEmployee } from "../store/employeeType";
import { useEmployeeStore } from "../store/employeesStore";

export const fetchEmployees = async (): Promise<IEmployee[]> => {
  const existedState = useEmployeeStore.getState().employees;
  const employees: IEmployee[] = await new Promise((resolve, reject) =>
    setTimeout(() => resolve(data), 1000)
  );
  if (existedState.length === 0) {
    useEmployeeStore.setState({ employees });
    return employees;
  } else {
    return existedState;
  }
};
