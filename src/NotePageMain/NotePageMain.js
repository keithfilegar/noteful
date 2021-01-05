import React from 'react'
import Note from '../Note/Note'
import AppContext from '../AppContext'
import { findNote } from '../notes-helpers'
import './NotePageMain.css'

export default class NotePageMain extends React.Component {
  static contextType = AppContext;

  render() {
    const { notes } = this.context
    const noteId = this.props.match.params.noteId
    const note = findNote(notes, noteId) || {content: ''}
    if(note === '') {
      throw Error;
    }
    return (
      <section className='NotePageMain'>
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
      </section>
    )
  }
  
}


