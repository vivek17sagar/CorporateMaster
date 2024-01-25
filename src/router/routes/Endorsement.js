import { lazy } from "react";

const EndorsementRoutes = [
  {
    path: "/endorsement",
    component: lazy(() => import("../../views/endorsement")),
    exact: true,
  },
  {
    path: "/endorsement/track/:id",
    component: lazy(() => import("../../views/endorsement/trackEndorsement")),
    exact: true,
  },
];

export default EndorsementRoutes;
