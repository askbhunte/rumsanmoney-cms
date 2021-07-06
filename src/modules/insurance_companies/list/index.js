import React from 'react';
import { CompanyContextProvider } from '../core/contexts';
import {ContextProvider} from '../../insurances/core/contexts';
import ListTable from './ListTable';

const List = () => {
	return (		
		<ContextProvider>
			<CompanyContextProvider>
				<ListTable />
			</CompanyContextProvider>			
		</ContextProvider>
	);
};

export default List;
