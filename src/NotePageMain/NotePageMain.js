import React from 'react'
import Note from '../Note/Note'
import AppContext from '../AppContext'
import { findNote } from '../notes-helpers'
import './NotePageMain.css'

export default class NotePageMain extends React.Component {
  static contextType = AppContext;
  
  render() {
    const { notes=[] } = this.context
    console.log(notes)
    const noteId = this.props.match.params
    const note = findNote(notes, noteId) || {content: ''}
    console.log(note)
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

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}
