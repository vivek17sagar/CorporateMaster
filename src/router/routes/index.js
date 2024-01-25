// ** Routes Imports
import AppRoutes from './Apps'
import FormRoutes from './Forms'
import PagesRoutes from './Pages'
import TablesRoutes from './Tables'
import ChartMapsRoutes from './ChartsMaps'
import DashboardRoutes from './Dashboards'
import UiElementRoutes from './UiElements'
import ExtensionsRoutes from './Extensions'
import PageLayoutsRoutes from './PageLayouts'
import EmployeesRoutes from './Employees'
import EndorsementRoutes from './Endorsement'
import PoliciesRoutes from './Policies'
import ClaimsRoutes from './Claims'
import ProvidersRoutes from './Providers'
import AnalyticsRoutes from './analytics'
import ProviderStatementRoutes from './providerStatement'
// ** Document title
const TemplateTitle = '%s - HR Dashboard'

// ** Default Route
const DefaultRoute = '/dashboard'

// ** Merge Routes
const Routes = [
  ...DashboardRoutes,
  // ...AppRoutes,
  ...PagesRoutes,
  ...EmployeesRoutes,
  ...EndorsementRoutes,
  ...PoliciesRoutes,
  ...ClaimsRoutes,
  ...ProvidersRoutes,
  ...AnalyticsRoutes,
  ...ProviderStatementRoutes
  // ...UiElementRoutes,
  // ...ExtensionsRoutes,
  // ...PageLayoutsRoutes,
  // ...FormRoutes,
  // ...TablesRoutes,
  // ...ChartMapsRoutes
]

export { DefaultRoute, TemplateTitle, Routes }
