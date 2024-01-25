import Wizard from "@components/wizard"
import { range } from 'lodash'
import { useRef, useState } from "react"
import NewFamilyDetails from "./NewFamilyDetails"

const FamilyWizard = () => {
    const [stepper, setStepper] = useState(null)

    const ref = useRef(null)

    const submit = () => {
        // console.log('saved')
    }

    const familyDetailSteps = range(1, 7).map(num => {
        return {
            id: `family${num.toString()}`,
            // title: `family${num.toString()}`,
            content: <NewFamilyDetails id={`family${num}`}  close={() => submit()} stepper={stepper} showPrevious={num !== 0} showNext={num !== 6} />
        }
    })

    return (
        <div>
            <Wizard instance={el => setStepper(el)} ref={ref} commonLabel={'Family Details'} steps={familyDetailSteps} />
        </div>
    )
}
export default FamilyWizard