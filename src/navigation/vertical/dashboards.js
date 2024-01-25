import { Home, Circle } from 'react-feather'
import dashboard from '@src/assets/images/icons/dashboard.svg'

export default [
  {
    id: 'dashboards',
    title: 'Dashboard',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="43.155" height="43.156" viewBox="0 0 43.155 43.156">
      <g id="Icon_material-dashboard" data-name="Icon material-dashboard" transform="translate(1.5 1.5)">
        <path id="Icon_material-dashboard-2" data-name="Icon material-dashboard" d="M4.5,26.809H22.347V4.5H4.5Zm0,17.847H22.347V31.271H4.5Zm22.309,0H44.656V22.347H26.809Zm0-40.156V17.885H44.656V4.5Z" transform="translate(-4.5 -4.5)" fill="none" stroke="currentColor" strokeWidth="3" />
      </g>
    </svg>,
    navLink: '/dashboard'
    // badge: 'light-warning',
    // badgeText: '2'
    // children: [
    //   {
    //     id: 'analyticsDash',
    //     title: 'Analytics',
    //     icon: <Circle size={12} />,
    //     navLink: '/dashboard/analytics'
    //   },
    //   {
    //     id: 'eCommerceDash',
    //     title: 'eCommerce',
    //     icon: <Circle size={12} />,
    //     navLink: '/dashboard/ecommerce'
    //   }
    // ]
  }
]
