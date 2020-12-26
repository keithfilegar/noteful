import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Folder extends Component {
    render() {
        return (
            <li>
                <NavLink to={'/'}>
                    {this.props.name}
                </NavLink>
            </li>
        )
    }
}