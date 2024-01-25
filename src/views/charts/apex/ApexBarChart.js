import Chart from 'react-apexcharts'
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap'

const ApexBarChart = ({ inputOptions, inputSeries, categories, info, direction, title, height }) => {
  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '30%',
        endingShape: 'rounded'
      }
    },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      },
      padding: {
        top: 0
      }
    },
    colors: info,
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: categories || ['MON, 11', 'THU, 14', 'FRI, 15', 'MON, 18', 'WED, 20']
    },
    yaxis: {
      opposite: direction === 'rtl'
    }
  }

  const series = [
    {
      data: [700, 350, 480, 600, 210]
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className=''>{title}</CardTitle>
      </CardHeader>
      <CardBody>
        <Chart options={inputOptions || options} series={inputSeries || series} type='bar' height={height || 300} />
      </CardBody>
    </Card>
  )
}

export default ApexBarChart
