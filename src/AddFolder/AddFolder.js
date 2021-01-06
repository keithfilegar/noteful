import React from 'react'
import PropTypes from 'prop-types'
import AppContext from '../AppContext'
import './AddFolder.css'

export default class AddFolder extends React.Component {
    
    state = {
        id: '',
        name: '',
    }

    static contextType = AppContext;

    updateName(name) {
        this.setState({
            name: name
        });
    }

    setId(Id) {
        this.setState({
            id: Id
        });
    }

    validateName() {
        const name = this.state.name.trim();
        if (name.length === 0) {
            return true
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const newId = Math.floor(Math.random() * 1000000).toString()
        this.setId(newId);
        const API_ENDPOINT='http://localhost:9090'
        const newFolder = this.state
        console.log(newFolder)
        fetch(`${API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newFolder)
        })
        .then(res => {
            if(!res.ok) {
                throw new Error('Something went wrong. Please try again later')
            }
            return res
        })
        .then(res=> res.json())
        .then(data => {
            this.context.addFolder(data)
            this.props.history.push('/')
        })
        .catch((error) => {
            console.log(error)
        });
        
    }

    render() {
        return(
            <AppContext.Consumer>
                {(context) => (
                        <div className="AddFolderMain">
                            <form className="newFolderForm" onSubmit={e => this.handleSubmit(e)}>
                                <h2 className="addFolderHeader">Add a folder</h2>
                                <label htmlFor="newFolderName">New Folder Name: *</label>
                                <input type="text" className="addFolderName"
                                name="newFolderName" id="newFolderName" onChange={e => this.updateName(e.target.value)} required/>
                                <br/>
                                <button 
                                    type="submit"
                                    disabled={this.validateName()}
                                >Add Folder</button>
                            </form>
                        </div>
                )}
            </AppContext.Consumer>
        )
    }
}

AddFolder.propTypes = {
    history: PropTypes.object.isRequired
}
