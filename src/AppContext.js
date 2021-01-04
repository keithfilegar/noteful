import React from 'react';

const AppContext = React.createContext({
    notes: [],
    folders: [],
    deleteNote: () => {},
    addNote: () => {},
    addFolder: () => {},
})

export default AppContext;