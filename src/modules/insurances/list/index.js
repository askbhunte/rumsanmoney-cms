import React from 'react';
import { ContextProvider } from '../context';
import ListTable from './ListTable';

const List = () => {
	return (
		<ContextProvider>
			<ListTable />
		</ContextProvider>
	);
};

export default List;
