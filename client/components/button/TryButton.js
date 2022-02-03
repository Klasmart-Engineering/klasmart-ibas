import { useState } from 'react'
import ScheduleLessonForm from '../forms/ScheduleLessonForm'
import Action from '../modal/Action'
import Button from './Button'

const TryButton = ({ children = 'Book FREE Class Trial' }) => {
  const [showEmail, setShowEmail] = useState(false)
  return (
    <>
      <Action show={showEmail} onClose={() => setShowEmail(false)}>
        <ScheduleLessonForm setShowEmail={setShowEmail} />
      </Action>
      <Button
        className="w-auto"
        onClick={() => {
          setShowEmail(true)
        }}
      >
        {children}
      </Button>
    </>
  )
}

export default TryButton
