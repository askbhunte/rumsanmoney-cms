import React from 'react';
import { ContextProvider } from '../core/contexts';
import Add from './add';

const List = () => {
    return (
        <ContextProvider>
            <Add />
        </ContextProvider>
    );
};

export default List;
