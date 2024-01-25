import dashboard from '@src/assets/images/icons/dashboard.png'
import { Fragment } from "react"
import { Link } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem, Row } from 'reactstrap'
import AccountSettings from '../pages/account-settings'

const EmployeeSettings = () => {

    return (
        <Fragment>
            <Row>
                <div className='font-weight-bold px-1 py-50 mb-1' style={{ borderRight: '2px solid lightgrey' }}>
                    Settings
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
                        Settings
                    </BreadcrumbItem>
                </Breadcrumb>
            </Row>
            <AccountSettings />
        </Fragment>
    )
}
export default EmployeeSettings