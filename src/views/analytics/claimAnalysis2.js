import ApexLineChart from '../charts/apex/ApexLineChart'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { Fragment, useContext, useState } from "react"
import DataTable from "react-data-table-component"
import { ChevronDown } from "react-feather"
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap"
import { Bar } from 'react-chartjs-2'
import ApexBarChart from '../charts/apex/ApexBarChart'
import Chart from 'react-apexcharts'
import LineChart from '../charts/recharts/LineChart'

const ClaimAnalysis2 = () => {
    const { colors } = useContext(ThemeColors)
    const tooltipShadow = 'rgba(0, 0, 0, 0.25)',
        labelColor = '#6e6b7b',
        gridLineColor = 'rgba(200, 200, 200, 0.2)',
        lineChartPrimary = '#666ee8',
        lineChartDanger = '#ff4961',
        warningColorShade = '#ffe802',
        warningLightColor = '#FDAC34',
        successColorShade = '#28dac6',
        primaryColorShade = '#836AF9',
        infoColorShade = '#299AFF',
        yellowColor = '#ffe800',
        greyColor = '#4F5D70',
        blueColor = '#2c9aff',
        blueLightColor = '#84D0FF',
        greyLightColor = '#EDF1F4'

    const statusWiseGridColumns = [
        { name: 'CLAIM STATUS', selector: 'status', sortable: true },
        { name: 'NO. OF CLAIMS', selector: 'noOfClaims', sortable: true, center: true },
        {
            name: 'CLAIM COST',
            selector: 'cost',
            sortable: true,
            style: { 'justify-content': 'end' },
            cell: (row) => (
                <Row className='justify-content-end w-50'>
                    <div>{row.cost}</div>
                </Row>
            )
        }
    ]

    const [data, setData] = useState([
        { status: 'Settled', noOfClaims: '20', cost: '11111' },
        { status: 'Outstanding', noOfClaims: '20', cost: '222222' },
        { status: 'Cashless Received pending for statement', noOfClaims: '14', cost: '333333' },
        { status: 'Rejected', noOfClaims: '08', cost: '444444' },
        { status: 'Grand Total', noOfClaims: '52', cost: '55555' }
    ])

    const ratioData = {
        labels: ['7/12', '8/12', '9/12', '10/12', '11/12', '12/12', '13/12', '14/12', '15/12', '16/12', '17/12'],
        datasets: [
            {
                data: [275, 90, 190, 205, 125, 85, 55, 87, 127, 150, 230, 280, 190],
                backgroundColor: successColorShade,
                borderColor: 'transparent',
                barThickness: 15
            }
        ]
    }

    const options = {
        elements: {
            rectangle: {
                borderWidth: 2,
                borderSkipped: 'bottom'
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration: 500,
        legend: {
            display: false
        },
        tooltips: {
            // Updated default tooltip UI
            shadowOffsetX: 1,
            shadowOffsetY: 1,
            shadowBlur: 8,
            shadowColor: tooltipShadow,
            backgroundColor: '#fff',
            titleFontColor: '#000',
            bodyFontColor: '#000'
        },
        scales: {
            xAxes: [
                {
                    display: true,
                    gridLines: {
                        display: true,
                        color: gridLineColor,
                        zeroLineColor: gridLineColor
                    },
                    scaleLabel: {
                        display: false
                    },
                    ticks: {
                        fontColor: labelColor
                    }
                }
            ],
            yAxes: [
                {
                    display: true,
                    gridLines: {
                        color: gridLineColor,
                        zeroLineColor: gridLineColor
                    },
                    ticks: {
                        stepSize: 100,
                        min: 0,
                        max: 400,
                        fontColor: labelColor
                    }
                }
            ]
        }
    }

    const [incidenceRatioProjection, setIncidenceRatioProjection] = useState(
        [
            { relation: "Employee", currentMembers1: '668', currentMembers2: '10', eopClaims: '38', currentIncidence: '1%', claimCost: '5%' },
            { relation: "Spouse", currentMembers1: '533', currentMembers2: '18', eopClaims: '68', currentIncidence: '3%', claimCost: '12%' },
            { relation: "Child", currentMembers1: '699', currentMembers2: '0', eopClaims: '0', currentIncidence: '0%', claimCost: '0%' },
            { relation: "Parent", currentMembers1: '973', currentMembers2: '20', eopClaims: '76', currentIncidence: '2%', claimCost: '7%' },
            { relation: "Grand Total", currentMembers1: '2873', currentMembers2: '48', eopClaims: '183', currentIncidence: '2%', claimCost: '6%' }
        ])

    const incidenceRatioProjectionColumns = [
        { name: 'RELATION', sortable: true, selector: 'relation' },
        { name: 'CURRENT MEMBERS', sortable: true, selector: 'currentMembers1', center: true },
        { name: 'CURRENT MEMBERS', sortable: true, selector: 'currentMembers2', center: true },
        { name: 'EOP CLAIMS', sortable: true, selector: 'eopClaims', minWidth: '50px', center: true },
        { name: 'CURRENT INCIDENCE', sortable: true, selector: 'currentIncidence', minWidth: '50px', center: true },
        { name: 'CLAIM COST', sortable: true, selector: 'claimCost', minWidth: '50px', center: true }
    ]

    const [statusWiseGridData, setStatusWiseGridData] = useState([
        { status: 'Settled', noOfClaims: '20', cost: '11,111' },
        { status: 'Outstanding', noOfClaims: '20', cost: '222,222' },
        { status: 'Cashless Received pending for statement', noOfClaims: '14', cost: '333,333' },
        { status: 'Rejected', noOfClaims: '08', cost: '444,444' },
        { status: 'Grand Total', noOfClaims: '52', cost: '55,555' }
    ])

    const series = [
        {
            name: 'Z India Pvt Ltd',
            data: [90, 120, 55, 100, 80]
        },
        {
            name: 'Industry',
            data: [85, 100, 30, 40, 95]
        }
    ]

    const columnColors = {
        series1: '#826af9',
        series2: '#d2b0ff',
        bg: '#f8d3ff'
    }

    const averageClaimChartOptions = {
        chart: {
            height: 400,
            type: 'bar',
            stacked: true,
            parentHeightOffset: 0,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                columnWidth: '15%',
                colors: {
                    backgroundBarColors: [columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg],
                    backgroundBarRadius: 10
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            position: 'top',
            horizontalAlign: 'start'
        },
        colors: [columnColors.series1, columnColors.series2],
        stroke: {
            show: true,
            colors: ['transparent']
        },
        grid: {
            xaxis: {
                lines: {
                    show: true
                }
            }
        },
        xaxis: {
            categories: ['Group', 'Parent', 'Child', 'Spouse', 'Employee']
        },
        fill: {
            opacity: 1
        }
    }

    const ratioSeries = [
        {
            data: [40, 20, 30, 10, 40]
        }
    ]

    const ratioChartOptions = {
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
            colors: [colors.warning.main]
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        colors: [colors.warning.main],
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
                  <span>${data.series[data.seriesIndex][data.dataPointIndex]}%</span>
                </div>`
            }
        },
        xaxis: {
            categories: ['Employees', 'Spouse', 'Children', 'Parents', 'Groups']
        }
    }

    return (
        <Fragment>
            <Row>
                <Col xs='12'>
                    <Card>
                        <CardHeader>
                            <CardTitle tag='h3'>
                                Claim Incidence Ratio & Projection
                            </CardTitle>
                        </CardHeader>
                        <Row>
                            <Col lg='6' xs='12'>

                                <DataTable
                                    noHeader
                                    data={incidenceRatioProjection}
                                    columns={incidenceRatioProjectionColumns}
                                    className='react-dataTable'
                                    sortIcon={<ChevronDown size={10} />}
                                />
                            </Col>
                            <Col lg='6' xs='12'>
                                <Chart options={ratioChartOptions} series={ratioSeries} type='line' height={280} />
                                {/* <ApexLineChart height={280} inputSeries={ratioSeries} categories={categories} warning={colors.warning.main} /> */}
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xs='12' lg='6'>
                    <Card>
                        <CardHeader>
                            <CardTitle tag='h3'>
                                Status Wise Claim Summary & Claim Ratios
                            </CardTitle>
                        </CardHeader>
                        {/* <CardBody> */}
                        <DataTable
                            noHeader
                            data={statusWiseGridData}
                            columns={statusWiseGridColumns}
                            className='react-dataTable mb-1'
                            sortIcon={<ChevronDown size={10} />}
                        />
                        {/* </CardBody> */}
                    </Card>
                </Col>

                <Col xs='12' lg='6'>
                    {/* <Card> */}
                    {/* <CardHeader className='d-flex flex-md-row flex-column justify-content-md-between justify-content-start align-items-md-center align-items-start'>
                            <CardTitle tag='h4'>Average of claim cost</CardTitle>
                        </CardHeader>
                        <CardBody> */}

                    {/* </CardBody> */}
                    {/* </Card> */}
                    <Card>
                        <CardHeader className='d-flex flex-md-row flex-column justify-content-md-between justify-content-start align-items-md-center align-items-start'>
                            <CardTitle tag='h4'>Average of claim cost</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Chart options={averageClaimChartOptions} series={series} type='bar' height={300} />
                        </CardBody>
                    </Card>
                </Col>

                <Col xs='12'>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Notes
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <ul>
                                <li>Parent are the highest claiming group in terms of both no. of claims and claim cost.</li>
                                <li>Average claim cost for Heinz India Pvt Ltd as a whole is above industry.</li>
                                <li>Only settled claims are considered for average claim cost.</li>
                            </ul>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Fragment >
    )
}

export default ClaimAnalysis2