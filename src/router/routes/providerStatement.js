import { lazy } from 'react'

const ProviderStatementRoutes = [
    {
        path: '/providerStatement',
        component: lazy(() => import('../../views/providerStatement')),
        exact: true
    },
]

export default ProviderStatementRoutes