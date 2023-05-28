import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { IEmployee } from "./employeeType";

type Order = "asc" | "desc";

interface IEmployeesStore {
  employees: IEmployee[];
  loading: boolean;
  addEmployee: (employee: IEmployee) => void;
  importEmployees: (employees: IEmployee[]) => void;
  removeEmployee: (name: string) => void;
  removeAllEmployees: () => void;
  setLoading: (loading: boolean) => void;
  orderBy: string;
  setOrderBy: (orderBy: string) => void;
  order: Order;
  setOrder: (order: Order) => void;
}

const initState = {
  employees: [] as IEmployee[],
  loading: false,
  orderBy: "name",
  order: "asc" as Order,
};

const employeeStore = (set: any) => ({
  ...initState,
  importEmployees: (employees: IEmployee[]) => {
    set((state: IEmployeesStore) => ({ employees }));
  },
  addEmployee: (employee: IEmployee) =>
    set((state: IEmployeesStore) => ({
      employees: [...state.employees, employee],
    })),
  removeEmployee: (name: string) =>
    set((state: IEmployeesStore) => ({
      employees: state.employees.filter(
        (employee: IEmployee) => employee.name !== name
      ),
    })),
  removeAllEmployees: () => set({ employees: [] }),
  setLoading: (loading: boolean) =>
    set((state: IEmployeesStore) => ({
      loading,
    })),
  setOrderBy: (orderBy: string) =>
    set((state: IEmployeesStore) => ({
      orderBy,
    })),
  setOrder: (order: Order) =>
    set((state: IEmployeesStore) => ({
      order,
    })),
});

const storeWithDevTools = devtools(employeeStore);

export const useEmployeeStore = create<IEmployeesStore>()(storeWithDevTools);
