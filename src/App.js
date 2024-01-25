import { handleLogout } from '@store/actions/auth'
// ** Router Import
import Router from './router/Router'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Fragment, useState } from 'react';
import {Modal} from 'reactstrap';
import { SessionHandler } from './SessionHandler';
import { apiData, setAPIData } from './@core/api/serviceConfig';


const App = props => {
    
    return <Fragment>
        {/* {apiInProgress && <Modal isOpen={true}>asdasdasd</Modal>} */}
        <SessionHandler />
        <Router>

        </Router>
    </Fragment>
}


export default App
