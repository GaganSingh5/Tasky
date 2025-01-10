import React from 'react'
import PropTypes from 'prop-types'
import { doc, updateDoc, getFirestore } from 'firebase/firestore'
import { firebase } from '../firebase'
const db = getFirestore(firebase)

export const Checkbox = ({ id, taskDesc }) => {
  const archiveTask = async () => {
    try {
      const taskRef = doc(db, 'tasks', id)
      await updateDoc(taskRef, {
        archived: true
      })
    } catch (error) {
      console.error('Error archiving task: ', error)
    }
  }

  return (
    <div
      className="checkbox-holder"
      data-testid="checkbox-action"
      onClick={() => archiveTask()}
      onKeyDown={e => {
        if (e.key === 'Enter') archiveTask()
      }}
      aria-label={`Mark ${taskDesc} as done?`}
      role="button"
      tabIndex={0}
    >
      <span className="checkbox" />
    </div>
  )
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  taskDesc: PropTypes.string.isRequired
}
