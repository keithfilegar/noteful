import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Folder from './folder'
import AddFolder from './addFolder'
import './folderList.css';

export default class FolderList extends Component {
    render() {
        const folders = this.props.folders
        return (
            <section className="folder-list">
                <ul className="folderList__list">
                    {folders.map(folder => 
                        <Folder
                            key={folder.id}
                            {...folder}
                        />
                    )}
                    <AddFolder />
                </ul>
            </section>
        )
    }
}