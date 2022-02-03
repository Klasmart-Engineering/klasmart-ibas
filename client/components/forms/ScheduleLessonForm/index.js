import { useState } from 'react'
import ScheduleLessonFormStepOne from './StepOne'
import ScheduleLessonFormStepThree from './StepThree'
import ScheduleLessonFormStepTwo from './StepTwo'
import ScheduleLessonFormSuccess from './Success'

const ScheduleLessonForm = ({ setShowEmail, ...props }) => {
  const [formValues, setFormValue] = useState({})

  const [step, setStep] = useState(0)

  return (
    <>
      {step === 0 && (
        <ScheduleLessonFormStepOne
          {...props}
          formValues={formValues}
          onContinue={(values) => {
            setFormValue({ ...formValues, ...values })
            setStep(1)
          }}
        />
      )}
      {step === 1 && (
        <ScheduleLessonFormStepTwo
          {...props}
          formValues={formValues}
          onContinue={(values) => {
            setFormValue({ ...formValues, ...values })
            setStep(2)
          }}
          onBack={() => {
            setStep(0)
          }}
        />
      )}
      {step === 2 && (
        <ScheduleLessonFormStepThree
          {...props}
          formValues={formValues}
          onContinue={(values) => {
            setFormValue({ ...formValues, ...values })
            setStep(3)
          }}
          onBack={() => {
            setStep(1)
          }}
        />
      )}
      {step === 3 && <ScheduleLessonFormSuccess {...props} setShowEmail={setShowEmail} />}
    </>
  )
}

export default ScheduleLessonForm
