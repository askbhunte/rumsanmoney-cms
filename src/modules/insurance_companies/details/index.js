import React from 'react';

import DetailsForm from './DetailsForm';
import { CompanyContextProvider } from '../core/contexts';

const Details = props => {
	return (
		<CompanyContextProvider>
			<DetailsForm params={props.match.params} />
		</CompanyContextProvider>
	);
};

export default Details;
