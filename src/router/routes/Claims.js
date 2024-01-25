import { lazy } from "react";

const ClaimsRoutes = [
  {
    path: "/claims",
    component: lazy(() => import("../../views/claims")),
    exact: true,
  },
];

export default ClaimsRoutes;
