import { Fragment, useState } from "react"
import DataTable from "react-data-table-component"
import { Edit2, Trash } from "react-feather"
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap"
import EmergencyContactEdit from "./EmergencyContactEdit"

const EmergencyContact = (props) => {
    const [openModal, setOpenModal] = useState(undefined)
    const emergencyColumns = [
        { name: 'Name', selector: 'name' },
        { name: 'Relationship', selector: 'relationship' },
        { name: 'Contact', selector: 'contact' },
        // {
        //     name: 'Action',
        //     width: '100px',
        //     cell: (row) => {
        //         return (
        //             <div>
        //                 <Edit2 className='cursor-pointer mr-50' size={14} onClick={() => setOpenModal(true)} />
        //                 <Trash size={14} />
        //             </div>
        //         )
        //     }
        // }
    ]
    const emergencyData = [
        // { name: 'Rakesh', relationship: 'Father', contact: '+91 2365412758' },
        // { name: 'Pooja', relationship: 'Mother', contact: '+91 5467891234' },
        // { name: 'Rohit', relationship: 'Brother', contact: '+91 5467891234' }
    ]
    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Emergency Contact
                    </CardTitle>
                </CardHeader>
                <CardBody className='p-xl-75'>
                    <DataTable
                        noHeader
                        data={emergencyData}
                        columns={emergencyColumns}
                        className='react-dataTable' />
                </CardBody>
            </Card>
            {openModal && <EmergencyContactEdit toggle={() => setOpenModal(false)} />}
        </Fragment>
    )
}
export default EmergencyContact