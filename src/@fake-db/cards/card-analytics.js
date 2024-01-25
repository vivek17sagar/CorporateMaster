import mock from '../mock'

const data = {
  support_tracker: {
    title: 'Support Tracker',
    last_days: ['Last 28 Days', 'Last Month', 'Last Year'],
    totalTicket: 163,
    newTicket: 29,
    openTicket: 63,
    responseTime: 1
  },
  avg_sessions: {
    sessions: 2700,
    last_days: ['Last 28 Days', 'Last Month', 'Last Year'],
    growth: '+5.2%',
    goal: 100000,
    users: 100000,
    retention: 90,
    duration: 1
  },
  revenue_report: {
    years: ['2020', '2019', '2018'],
    price: '25,852',
    budget: '56,800'
  },
  goal_overview: {
    completed: '786,617',
    inProgress: '13,561'
  },
  revenue: {
    thisMonth: '86,589',
    lastMonth: '73,683'
  },
  product_orders: {
    last_days: ['Last 28 Days', 'Last Month', 'Last Year'],
    chart_info: { finished: 23043, pending: 14658, rejected: 4758 }
  },
  sessions_device: {
    last_days: ['Last 28 Days', 'Last Month', 'Last Year'],
    chart_info: [
      {
        icon: 'Square',
        name: 'Employees',
        iconColor: 'text-primary',
        usage: '500,000',
        upDown: 2
      },
      {
        icon: 'Square',
        name: 'Spouse',
        iconColor: 'text-warning',
        usage: '100,000',
        upDown: 8
      },
      {
        icon: 'Square',
        name: 'Children',
        iconColor: 'text-danger',
        usage: '50,000',
        upDown: -5
      },
      {
        icon: 'Square',
        name: 'Parents',
        iconColor: 'text-success',
        usage: '300,000',
        upDown: -5
      }
    ]
  },
  customers: {
    last_days: ['Last 28 Days', 'Last Month', 'Last Year'],
    listData: [
      {
        icon: 'Circle',
        iconColor: 'text-primary',
        text: 'New',
        result: 690
      },
      {
        icon: 'Circle',
        iconColor: 'text-warning',
        text: 'Returning',
        result: 258
      },
      {
        icon: 'Circle',
        iconColor: 'text-danger',
        text: 'Referrals',
        result: 149
      }
    ]
  }
}

mock.onGet('/card/card-analytics/support-tracker').reply(() => [200, data.support_tracker])
mock.onGet('/card/card-analytics/avg-sessions').reply(() => [200, data.avg_sessions])
mock.onGet('/card/card-analytics/revenue-report').reply(() => [200, data.revenue_report])
mock.onGet('/card/card-analytics/goal-overview').reply(() => [200, data.goal_overview])
mock.onGet('/card/card-analytics/revenue').reply(() => [200, data.revenue])
mock.onGet('/card/card-analytics/product-orders').reply(() => [200, data.product_orders])
mock.onGet('/card/card-analytics/sessions-device').reply(() => [200, data.sessions_device])
mock.onGet('/card/card-analytics/customers').reply(() => [200, data.customers])
