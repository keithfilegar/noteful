import React from 'react';
import PropTypes from 'prop-types';

export default class NoteError extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <h2>Couldn't display this note :(</h2>
            )
        }
        return this.props.children;
    }
}

NoteError.propTypes ={
    children: PropTypes.node.isRequired
}