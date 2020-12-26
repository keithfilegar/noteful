import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

export default function Header() {
    return (
        <div className="header-container">
            <h1 className="app-title">
                <Link to={'/'}>Noteful</Link>
            </h1>
        </div>
    )
}