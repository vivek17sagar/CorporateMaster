import { lazy } from "react";

const EmployeesRoutes = [
  {
    path: "/employees",
    component: lazy(() => import("../../views/employees")),
    exact: true,
  },
  {
    path: "/employees/profile/:id",
    component: lazy(() => import("../../views/employees/profile")),
  },
  {
    path: "/employees/new",
    component: lazy(() => import("../../views/employees/newEmployee")),
  },
  {
    path: "/employees/settings",
    component: lazy(() => import("../../views/employees/settings")),
  },
];

export default EmployeesRoutes;
