import React, { Component } from 'react';
import './note.css'

export default class Note extends Component {
    render() {
        return (
            <li>
                <h2>{this.props.name}</h2>
            </li>
        )
    }
}