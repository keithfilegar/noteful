import React from 'react'
import AppContext from '../AppContext'
import './AddNote.css'

export default class AddNote extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            id: "",
            name: "",
            modified: "",
            folderId: "",
            content: ""
        }
    }

    static contextType = AppContext;

    updateName(name) {
        this.setState({
            name: name
        })
    }

    setFolder(folder) {
        this.setState({
            folderId: folder
        })
    }

    setContent(content) {
        this.setState({
            content: content
        })
    }

    setModified() {
        const timeStamp = new Date().toISOString()
        this.setState ({
            modified: timeStamp
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setModified();
        const API_ENDPOINT='http://localhost:9090'
        const newNote = this.state
        console.log(newNote)
        fetch(`${API_ENDPOINT}/notes`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newNote)
        })
        .then(res => {
            if(!res.ok) {
                throw new Error('Something went wrong. Please try again later')
            }
            return res;
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch((error) => {
            console.log(error)
        });
    }

    render() {
        const folderOptions = this
        .context
        .folders
        .map(
            (folder, i) => <option value={folder.id} key={i}>{folder.name}</option>
        )
        return (
            <AppContext.Consumer>
                {(context) => (
                    <div className="addNoteContainer">
                    <form className="addNote" onSubmit={e => this.handleSubmit(e)}>
                        <h2>Add Note</h2>
                        <label htmlFor="noteName">Name: </label>
                        <input type="text" className="addNoteName"
                        name="newNoteName" id="newNoteName" onChange={e => this.updateName(e.target.value)} required/>
                        <label htmlFor="folderName">Folder:</label> 
                        <select
                            id="folderName"
                            name="folderName"
                            onChange={e => this.setFolder(e.target.value)}
                            required>
                                <option value="none">Select a Folder</option>
                                {folderOptions}
                        </select>
                        <br/>
                        <label htmlFor="noteContent">Note Content:</label>
                        <br/>
                        <textarea id="noteContent" name="noteContent" onChange={e => this.setContent(e.target.value)}></textarea>
                        <button type="submit">Add Note</button>                    </form>
                </div>
                )}
            </AppContext.Consumer>
            
        )
    }
}