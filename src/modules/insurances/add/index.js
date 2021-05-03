import React from 'react';
import { ContextProvider } from '../context';
import Add from './Add';

const List = () => {
	return (
		<ContextProvider>
			<Add />
		</ContextProvider>
	);
};

export default List;
