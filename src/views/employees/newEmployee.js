import dashboard from '@src/assets/images/icons/dashboard.png'
import { range } from 'lodash'
import { Fragment, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem, Row } from 'reactstrap'
import EmergencyWizard from "./EmergencyWizard"
import FamilyWizard from "./FamilyWizard"
import NewEmergencyContact from "./NewEmergencyContact"
import PersonalWizard from "./PersonalWizard"

const NewEmployee = () => {

    const [familyStepper, setFamilyStepper] = useState(null)
    const [emergencyStepper, setEmergencyStepper] = useState(null)

    const ref = useRef(null)

    const emergencyContactSteps = range(1, 6).map(num => {
        return {
            id: `emergency${num.toString()}`,
            // title: `emergency${num.toString()}`,
            content: <NewEmergencyContact />
        }
    })

    return (
        <Fragment>
            <Row>
                <div className='font-weight-bold px-1 py-50 mb-1' style={{ borderRight: '2px solid lightgrey' }}>
                    New Employee
                </div>
                <Breadcrumb className='pl-0 pb-1'>
                    <BreadcrumbItem tag='li'>
                        <Link to='/'>
                            <img src={dashboard} width='20' height='20' />
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem tag='li'>
                        <Link to='/employees'>
                            Employees
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem tag='li'>
                        New Employee
                    </BreadcrumbItem>
                </Breadcrumb>
            </Row>
            <div className='py-1'>
                <PersonalWizard />
            </div>
            <div className='py-1'>
                <FamilyWizard />
            </div>
            <div className='py-1'>
                <EmergencyWizard />
            </div>
        </Fragment>
    )
}
export default NewEmployee