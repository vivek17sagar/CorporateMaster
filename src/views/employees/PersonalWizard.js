import Wizard from "@components/wizard"
import { Fragment, useRef, useState } from "react"
import NewPersonalDetails from "./NewPersonalDetails"
import NewPolicyDetails from "./NewPolicyDetails"
import NewProfileDetails from "./NewProfileDetails"
import { range } from 'lodash'
import NewFamilyDetails from "./NewFamilyDetails"
import NewEmergencyContact from "./NewEmergencyContact"
import { Button } from "reactstrap"


const PersonalWizard = () => {
    const [personalStepper, setPersonalStepper] = useState(null)

    const ref = useRef(null)

    const submit = () => {
        // console.log('saved')
    }

    const personalDetailSteps = [
        {
            id: 'profile-details',
            title: 'Profile Details',
            content: <NewProfileDetails stepper={personalStepper} />
        },
        {
            id: 'personal-details',
            title: 'Personal Details',
            content: <NewPersonalDetails stepper={personalStepper} />
        },
        {
            id: 'policy-details',
            title: 'Policy Details',
            content: <NewPolicyDetails stepper={personalStepper} close={() => submit()} />
        }
    ]


    return (
        <div>
            <Wizard instance={el => setPersonalStepper(el)} ref={ref} steps={personalDetailSteps} />
        </div>
    )
}
export default PersonalWizard