import Timeline from '@components/timeline'
import dashboard from '@src/assets/images/icons/dashboard.png'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import DataTable from "react-data-table-component"
import { ChevronDown } from "react-feather"
import { Link, useParams } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, CardTitle, Col, Label, Row } from 'reactstrap'


const TrackEndorsement = () => {

    const endorsementNo = useParams().id

    const timelineData = [
        {
            title: 'Form Submitted',
            content: 'Lorem Ipsum is simply dummy text of the printing',
            meta: '5 days ago'
        },
        {
            title: 'Received to Insurance comapny',
            content: 'Lorem Ipsum is simply dummy text of the printing',
            meta: '4 days ago'
        }, {
            title: 'Reviewing',
            content: 'Lorem Ipsum is simply dummy text of the printing',
            meta: '3 days ago'
        },
        {
            title: 'Document Analysis',
            content: 'Lorem Ipsum is simply dummy text of the printing',
            meta: '2 days ago'
        },
        {
            title: 'Decision Pending',
            content: 'Lorem Ipsum is simply dummy text of the printing',
            meta: '1 days ago'
        }
    ]

    const gridData = [
        { name: 'Rahul Saxena', dob: '12 June 1980', relationship: 'Spouse', contact: '+ 91 2365412758' },
        { name: 'Anjali Saxena', dob: '20 Aug 1990', relationship: 'Son', contact: '+ 91 5467891234' },
        { name: 'Riya Saxena', dob: '02 sept 1993', relationship: 'Daughter', contact: '+ 91 5467891234' },
        { name: 'Rakesh Saxena', dob: '20 June 1971', relationship: 'Father', contact: '+ 91 5467891234' },
        { name: 'Pooja Saxena', dob: '02 sept 1973', relationship: 'Mother', contact: '+ 91 5467891234' }
    ]

    const gridColumns = [
        { name: 'Name', sortable: false, selector: 'name' },
        { name: 'Relationship', sortable: false, selector: 'relationship' },
        { name: 'D.O.B', sortable: false, selector: 'dob' },
        { name: 'Contact', sortable: false, selector: 'contact' }
    ]

    return (
        <Row>
            <Col xs='12'>
                <Row>

                    <div className='font-weight-bold px-1 py-50 mb-1' style={{ borderRight: '2px solid lightgrey' }}>
                        Track Endorsement
                    </div>
                    <Breadcrumb className='pl-0 pb-1'>
                        <BreadcrumbItem tag='li'>
                            <Link to='/'>
                                <img src={dashboard} width='20' height='20' />
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem tag='li'>
                            <Link to='/endorsement'>
                                Endorsement
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem tag='li'>
                            Track Endorsement
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Row>
            </Col>
            <Col xs='12' lg='6'>
                <Card style={{ height: '40vh' }} >
                    <CardHeader>
                        <CardTitle>Endorsement Ticket No. {decodeURIComponent(endorsementNo)} </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col>
                                <Label className='mb-0'>Policy Holder Name</Label>
                                <div>Rahul Saxena </div>
                            </Col>
                            <Col>
                                <Label className='mb-0'>Policy No.</Label>
                                <div>E01356352657 </div>
                            </Col>
                        </Row>
                        <Row className='my-75'>

                            <Col>
                                <Label className='mb-0'>Today date</Label>
                                <div>30 February 2021 </div>
                            </Col>
                            <Col>
                                <Label className='mb-0'>Phone</Label>
                                <div>+ 91 1236547890 </div>
                            </Col>
                        </Row>
                        <Row className='my-75'>
                            <Col>
                                <Label className='mb-0'>Email</Label>
                                <div>Rahul@gmail.com </div>
                            </Col>
                            <Col>
                                <Label className='mb-0'>Changes in Premium frequency</Label>
                                <div>Monthly </div>
                            </Col>
                        </Row>
                        <Row className='my-75'>
                            <Col>
                                <Label className='mb-0'>Changes in Nominee(Max 3)</Label>
                                <div>02 </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                <Card style={{ height: '60vh' }}>
                    <CardHeader>
                        <CardTitle>Family Members</CardTitle>
                    </CardHeader>
                    {/* <CardBody> */}
                    <DataTable
                        noHeader
                        data={gridData}
                        columns={gridColumns}
                        className='react-dataTable endorsement-tracking'
                        sortIcon={<ChevronDown size={10} />}
                    />
                    {/* </CardBody> */}
                </Card>
            </Col>
            <Col lg='6' xs='12'>
                <Card style={{ height: '104vh' }}>
                    <CardBody>
                        <Timeline data={timelineData} />
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}
export default TrackEndorsement