import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import AppContext from '../AppContext'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import dummyStore from '../dummy-store';
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import './App.css';
import NotePageMainError from '../NotePageMain/NotePageMainError';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    deleteNote = noteId => {
        const newNotes = this.state.notes.filter(note =>
            note.id !== noteId
        );
        this.setState({
            notes: newNotes
        })
    }

    addNote = note => {
        const notes = this.state.notes
        const newNotes = [...notes, note]
        console.log(newNotes)
        this.setState({
            notes: newNotes
        })
    }

    addFolder = folder => {
        const folders = this.state.folders
        const newFolders = [...folders, folder]
        console.log(newFolders)
        this.setState({
            folders: newFolders
        })
    }

    componentDidMount() {
        const API_ENDPOINT='http://localhost:9090'
        Promise.all([
            fetch(`${API_ENDPOINT}/notes`),
            fetch(`${API_ENDPOINT}/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if(!notesRes.ok) {
                    return notesRes.json().then(e => Promise.reject(e));
                }
                if(!foldersRes.ok) {
                    return foldersRes.json().then(e => Promise.reject(e));
                }
                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error})
            })
    }

    renderNavRoutes() {
        const {notes, folders} = this.state;
        
        return (
            <>
                {['/', '/folder/:folderId', '/add-folder'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    component={NotePageNav}
                />
                <Route
                    path="/add-note"
                    component={NotePageNav}
                />
                
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    component={NotePageMain}
                />
                <Route 
                    path="/add-folder"
                    component={AddFolder}
                />
                <Route
                    path="/add-note"
                    component={AddNote}
                />
            </>
        );
    }

    render() {
        const contextValue = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.deleteNote,
            addNote: this.addNote,
            addFolder: this.addFolder
        }
        return (
            <div className="App">
                <AppContext.Provider value={contextValue}>
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </AppContext.Provider>
            </div>
        );
    }
}

export default App;
