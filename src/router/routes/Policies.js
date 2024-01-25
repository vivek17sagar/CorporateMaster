import { lazy } from "react";

const PoliciesRoutes = [
  {
    path: "/policies",
    component: lazy(() => import("../../views/policies")),
    exact: true,
  },
  {
    path: "/policies/payment",
    component: lazy(() => import("../../views/policies/payment")),
    exact: true,
  },
];

export default PoliciesRoutes;
