import React from 'react';
import { CompanyContextProvider } from '../core/contexts';
import Add from './Add';

const List = () => {
	return (
		<CompanyContextProvider>
			<Add />
		</CompanyContextProvider>
	);
};

export default List;
