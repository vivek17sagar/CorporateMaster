import { lazy } from "react";

const DashboardRoutes = [
  // Dashboards
  // {
  //   path: '/dashboard/analytics',
  //   component: lazy(() => import('../../views/dashboard/analytics'))
  // },
  {
    path: "/dashboard",
    component: lazy(() => import("../../views/eo2-dashboard")),
    exact: true,
  },
  {
    path: "/dashboard/ecards",
    component: lazy(() => import("../../views/eo2-dashboard/ecards")),
  },
  {
    path: "/dashboard/chat",
    appLayout: true,
    className: "chat-application",
    component: lazy(() => import("../../views/eo2-dashboard/chat")),
  },
  {
    path: "/dashboard/calendar",
    component: lazy(() => import("../../views/eo2-dashboard/calendar")),
  },
];

export default DashboardRoutes;
