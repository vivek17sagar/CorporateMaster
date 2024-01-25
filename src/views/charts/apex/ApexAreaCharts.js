import Chart from 'react-apexcharts'
import Flatpickr from 'react-flatpickr'
import { Calendar } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, CardSubtitle } from 'reactstrap'

const areaColors = {
  series1: '#826af9',
  series2: '#d2b0ff',
  series3: '#f8d3ff'
}

const ApexAreaCharts = ({ direction }) => {
  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: false,
      curve: 'straight'
    },
    legend: {
      position: 'top',
      horizontalAlign: 'start'
    },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    colors: [areaColors.series3, areaColors.series2, areaColors.series1],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    fill: {
      opacity: 1,
      type: 'solid'
    },
    tooltip: {
      shared: false
    },
    yaxis: {
      opposite: direction === 'rtl'
    }
  }

  const series = [
    {
      name: 'Profit',
      data: [100, 120, 90, 170, 130, 160, 140, 240, 220, 180, 270, 280]
    },
    {
      name: 'Loss',
      data: [60, 80, 70, 110, 80, 100, 90, 180, 160, 140, 200, 220]
    }
    
  ]

  return (
    <Card>
      <CardHeader className='d-flex flex-md-row flex-column justify-content-md-between justify-content-start align-items-md-center align-items-start'>
        <div>
          <CardTitle className='mb-75' tag='h4'>
            Mothwise Claims
          </CardTitle>
        </div>
        {/* <div className='d-flex align-items-center mt-md-0 mt-1'>
          <Calendar size={17} />
          <Flatpickr
            options={{
              mode: 'range',
              defaultDate: ['2019-05-01', '2019-05-10']
            }}
            className='form-control flat-picker bg-transparent border-0 shadow-none'
          />
        </div> */}
      </CardHeader>
      <CardBody>
        <Chart options={options} series={series} type='area' height={340} />
      </CardBody>
    </Card>
  )
}
export default ApexAreaCharts
