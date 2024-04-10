// ** Navigation sections imports
import apps from "./apps";
import pages from "./pages";
import forms from "./forms";
import tables from "./tables";
import others from "./others";
import dashboards from "./dashboards";
import uiElements from "./ui-elements";
import chartsAndMaps from "./charts-maps";
import employees from "./employees";
import endorsement from "./endorsement";
import policies from "./policies";
import claims from "./claims";
import providers from "./providers";
import analytics from "./analytics";
import providerStatement from "./providerStatement";

// ** Merge & Export
export default [
  ...dashboards,
  ...policies,
  ...employees,
  ...endorsement,
  ...claims,
  ...providers,
  ...analytics,
  // ...providerStatement
  // ...apps,
  // ...pages,
  // ...uiElements,
  // ...forms,
  // ...tables,
  // ...chartsAndMaps,
  // ...others
];
