import { Fragment, useState } from "react"
import DataTable from "react-data-table-component"
import { Edit2, Trash } from "react-feather"
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap"
import FamilyDetailsEdit from "./FamilyDetailsEdit"

const FamilyDetails = (props) => {
    const [openModal, setOpenModal] = useState(undefined)
    const familyColumns = [
        { name: 'Name', selector: 'memberName' },
        { name: 'Relationship', selector: 'relationShip' },
        { name: 'D.O.B', selector: 'memberDOB' },
        { name: 'Contact', selector: 'memberMobileNo' },
        { name: 'Email', selector: 'memberEmail' },
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
    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Family Details
                    </CardTitle>
                </CardHeader>
                <DataTable
                    noHeader
                    data={props.data}
                    columns={familyColumns}
                    className='react-dataTable' />
            </Card>
            {openModal && <FamilyDetailsEdit toggle={() => setOpenModal(false)} />}
        </Fragment>
    )
}
export default FamilyDetails