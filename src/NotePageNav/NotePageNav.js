import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import AppContext from '../AppContext'
import {findNote, findFolder} from '../notes-helpers'
import './NotePageNav.css'

export default class NotePageNav extends React.Component {
  static contextType = AppContext;

  handleGoBack = () => {
    this.props.history.push('/')
  }

  render() {
    const { notes, folders } = this.context
    const {noteId} = this.props.match.params;
    const note = findNote(notes, noteId) || {};
    const folder = findFolder(folders, note.folderId);

    return (
      <div className='NotePageNav'>
        <CircleButton
          tag='button'
          role='link'
          onClick={this.handleGoBack}
          className='NotePageNav__back-button'
        >
          <FontAwesomeIcon icon='chevron-left' />
          <br />
          Back
        </CircleButton>
        {folder && (
          <h3 className='NotePageNav__folder-name'>
            {folder.name}
          </h3>
        )}
      </div>
    )
  }
}

NotePageNav.propTypes = {
  history: PropTypes.object.isRequired
}