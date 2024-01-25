import Chart from 'react-apexcharts'
import { ArrowDown } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, CardSubtitle, Badge } from 'reactstrap'

const ApexLineChart = ({ inputOptions, inputSeries, categories, height, direction, warning, title }) => {

  const options = Object.assign({
    chart: {
      zoom: {
        enabled: false
      },
      parentHeightOffset: 0,
      toolbar: {
        show: false
      }
    },

    markers: {
      strokeWidth: 7,
      strokeOpacity: 1,
      strokeColors: ['#fff'],
      colors: [warning]
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    colors: [warning],
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    tooltip: {
      custom(data) {
        return `<div class='px-1 py-50'>
              <span>${data.series[data.seriesIndex][data.dataPointIndex]}</span>
            </div>`
      }
    },
    xaxis: {
      categories: categories || [
        '7/12',
        '8/12',
        '9/12',
        '10/12',
        '11/12',
        '12/12',
        '13/12',
        '14/12',
        '15/12',
        '16/12',
        '17/12',
        '18/12',
        '19/12',
        '20/12',
        '21/12'
      ]
    },
    yaxis: {
      opposite: direction === 'rtl'
    }
  }, inputOptions)

  const series = inputSeries || [
    {
      data: [280, 200, 220, 180, 270, 250, 70, 90, 200, 150, 160, 100, 150, 100, 50]
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className='mb-75' tag='h4'>
          {title}
        </CardTitle>
        {/* <div className='d-flex align-items-center flex-wrap mt-sm-0 mt-1'>
          <h5 className='font-weight-bolder mb-0 mr-1'>$ 100,000</h5>
          <Badge color='light-secondary'>
            <ArrowDown size={13} className='text-danger' />
            <span className='align-middle ml-25'>20%</span>
          </Badge>
        </div> */}
      </CardHeader>
      <CardBody>
        <Chart options={options} series={series} type='line' height={height || 280} />
      </CardBody>
    </Card>
  )
}

export default ApexLineChart
