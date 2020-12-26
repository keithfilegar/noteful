import React, { Component } from 'react';
import NoteList from './noteList'
import './mainSection.css'

export default class MainSection extends Component {
    render() {
        // const displayNoteList = this.props.selectedFolder
        //     ?
        return (
            <div className="main-section-container item item-double">
                <NoteList store={this.props.store}/>
            </div>
        )
    }
}