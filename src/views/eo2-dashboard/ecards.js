import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { Fragment, useContext, useState } from 'react'
import { Clock, Copy, DownloadCloud, Users } from 'react-feather'
import { Col, Row } from 'reactstrap'
import ActiveAdmissions from './activeAdmissions'
import { ActiveHealth } from './activeHealth'
import CommonDiseases from './commonDiseases'
import ECardTable from './ecard-table'
import Policies from './policies'
import TableServerSide from './tableServerSide'
import claimsIcon from '@src/assets/images/icons/claims.png'
import Dashboard from '.'

const DashboardECard = () => {
    return (
        <Dashboard showECard={true} />
    )
}

export default DashboardECard