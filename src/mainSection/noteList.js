import React, { Component } from 'react';
import Note from './note'
import './noteList.css'

export default class NoteList extends Component {
    render() {
        return (
            <section className="note-list">
                <ul className="noteList__list">
                    {this.props.store.notes.map(note => 
                        <Note
                            key={note.id}
                            {...note}
                        />
                    )}
                    {/* <AddNote /> */}
                </ul>
            </section>
        )
    }
}
