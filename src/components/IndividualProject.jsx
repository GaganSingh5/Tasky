import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import PropTypes from 'prop-types'
import { useProjectsValue, useSelectedProjectValue } from '../context'
import { doc, deleteDoc, getFirestore } from 'firebase/firestore'
import { firebase } from '../firebase'
const db = getFirestore(firebase)

export const IndividualProject = ({ project }) => {
  const [showConfirm, setShowConfirm] = useState(false)
  const { projects, setProjects } = useProjectsValue()
  const { setSelectedProject } = useSelectedProjectValue()

  const deleteProject = async docId => {
    try {
      const projectRef = doc(db, 'projects', docId)
      await deleteDoc(projectRef)
      setProjects([...projects])
      setSelectedProject('INBOX')
    } catch (error) {
      console.error('Error deleting project: ', error)
    }
  }

  return (
    <>
      <span className="sidebar__dot">•</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span
        className="sidebar__project-delete"
        data-testid="delete-project"
        onClick={() => setShowConfirm(!showConfirm)}
        onKeyDown={e => {
          if (e.key === 'Enter') setShowConfirm(!showConfirm)
        }}
        tabIndex={0}
        role="button"
        aria-label="Confirm deletion of project"
      >
        <FaTrashAlt />
        {showConfirm && (
          <div className="project-delete-modal">
            <div className="project-delete-modal__inner">
              <p>Are you sure you want to delete this project?</p>
              <button
                type="button"
                onClick={() => deleteProject(project.docId)}
              >
                Delete
              </button>
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                onKeyDown={e => {
                  if (e.key === 'Enter') setShowConfirm(!showConfirm)
                }}
                tabIndex={0}
                role="button"
                aria-label="Cancel adding project, do not delete"
              >
                Cancel
              </span>
            </div>
          </div>
        )}
      </span>
    </>
  )
}

IndividualProject.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired
  }).isRequired
}
