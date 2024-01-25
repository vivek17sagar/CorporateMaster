import Wizard from "@components/wizard"
import { range } from 'lodash'
import { useRef, useState } from "react"
import NewEmergencyContact from "./NewEmergencyContact"
import NewFamilyDetails from "./NewFamilyDetails"

const EmergencyWizard = () => {
    const [stepper, setStepper] = useState(null)

    const ref = useRef(null)

    const submit = () => {
        // console.log('saved')
    }

    const steps = range(1, 7).map(num => {
        return {
            id: `family${num.toString()}`,
            // title: `family${num.toString()}`,
            content: <NewEmergencyContact id={`emergency${num}`} close={() => submit()} showPrevious={num !== 0} stepper={stepper} showNext={num !== 6} />
        }
    })

    return (
        <div>
            <Wizard instance={el => setStepper(el)} commonLabel={'Emergency Contacts'} ref={ref} steps={steps} />
        </div>
    )
}
export default EmergencyWizard