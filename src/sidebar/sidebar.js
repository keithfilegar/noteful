import React, { Component } from 'react';
import FolderList from './folderList'
import './sidebar.css'

export default class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar-container item">
                <FolderList folders={this.props.folders}/>
            </div>
        )
    }
}