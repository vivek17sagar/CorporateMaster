import { lazy } from "react";

const ProvidersRoutes = [
  {
    path: "/providers",
    component: lazy(() => import("../../views/providers")),
    exact: true,
  },
];

export default ProvidersRoutes;
