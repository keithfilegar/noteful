import React from 'react'
import Note from '../Note/Note'
import AppContext from '../AppContext'
import { findNote } from '../notes-helpers'
import './NotePageMain.css'
import NoteError from '../NoteError'

export default class NotePageMain extends React.Component {
  static contextType = AppContext;

  render() {
    const { notes } = this.context
    const noteId = this.props.match.params.noteId
    const note = findNote(notes, noteId) || {content: ''}

    return (
      <section className='NotePageMain'>
        <NoteError>
          <Note
            id={note.id}
            name={note.name}
            modified={note.modified}
          />
          <div className='NotePageMain__content'>
            {note.content.split(/\n \r|\n/).map((para, i) =>
              <p key={i}>{para}</p>
            )}
          </div>
        </NoteError>
      </section>
    )
  }
  
}


