import { lazy } from "react";

const AnalyticsRoutes = [
  {
    path: "/analytics",
    component: lazy(() => import("../../views/analytics")),
    exact: true,
  },

  {
    path: "/analytics/demographics",
    component: lazy(() => import("../../views/analytics/demographics")),
    exact: true,
  },

  {
    path: "/analytics/demographics/:pageNumber",
    component: lazy(() => import("../../views/analytics/demographics")),
    exact: true,
  },
];

export default AnalyticsRoutes;
