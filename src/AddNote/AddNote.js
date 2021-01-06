import React from 'react'
import PropTypes from 'prop-types'
import AppContext from '../AppContext'
import AddNoteValidation from './AddNoteValidation'
import './AddNote.css'

export default class AddNote extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            id: "",
            name: {
                value: "",
                touched: false
            },
            modified: "",
            folderId: "",
            content: ""
        }
    }

    static contextType = AppContext;

    updateName(name) {
        this.setState({
            name: {
                value: name,
                touched: true,
            }
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
            this.setFolder("")
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

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
        return 'Name is required';
        } else if (name.length < 3) {
        return 'Name must be at least 3 characters long';
        }
    }

    validateFolder() {
        if (this.state.folderId === "") {
            return true
        }
    }

    onButtonClick = event => {
        this.validateFolder();
        const timeStamp = new Date().toISOString();
        this.setModified(timeStamp);
    }

    handleSubmit = event => {
        event.preventDefault();
        const API_ENDPOINT='http://localhost:9090'
        
        const newNote = {
            id: this.state.id,
            name: this.state.name.value,
            modified: this.state.modified,
            folderId: this.state.folderId,
            content: this.state.content
        }

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
        .then(data => {
            this.context.addNote(data)
            this.props.history.push('/')
        })
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
        const nameError = this.validateName()
        return (
            <AppContext.Consumer>
                {(context) => (
                    <div className="addNoteContainer">
                    <form className="addNote" onSubmit={e => this.handleSubmit(e)}>
                        <h2 className="addNoteTitle">Add Note</h2>
                        <label htmlFor="noteName">Name: </label>
                        <input type="text" className="addNoteName"
                        name="newNoteName" id="newNoteName" onChange={e => this.updateName(e.target.value)} required/>
                        {this.state.name.touched && (
                            <AddNoteValidation message={nameError}/>
                        )}
                        <br />
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
                        <br/>
                        <button type="submit"
                            onClick={e => this.onButtonClick(e)}
                            disabled={
                                this.validateName() ||
                                this.validateFolder()
                            }
                        >
                            Add Note
                        </button>
                    </form>
                </div>
                )}
            </AppContext.Consumer>
            
        )
    }
}

AddNote.propTypes = {
    history: PropTypes.object.isRequired
}