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

    //TODO: validate against null value with propType
    changeFolder(value) {
        if(value === "none") {
            this.setFolder(null)
        } else {
            this.setFolder(value)
        }
    }

    setContent(content) {
        this.setState({
            content: content
        })
    }

    setModified(timeStamp) {
        this.setState ({
            modified: timeStamp
        })
    }

    onButtonClick = event => {
        const timeStamp = new Date().toISOString();
        this.setModified(timeStamp);
    }

    handleSubmit = event => {
        event.preventDefault();
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
        this.props.history.push('/')
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
                            onChange={e => this.changeFolder(e.target.value)}
                            required>
                                <option value="none">Select a Folder</option>
                                {folderOptions}
                        </select>
                        <br/>
                        <label htmlFor="noteContent">Note Content:</label>
                        <br/>
                        <textarea id="noteContent" name="noteContent" onChange={e => this.setContent(e.target.value)}></textarea>
                        <button type="submit" onClick={e => this.onButtonClick(e)}>Add Note</button>
                    </form>
                </div>
                )}
            </AppContext.Consumer>
            
        )
    }
}