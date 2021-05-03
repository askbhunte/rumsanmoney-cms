import React from 'react';

import DetailsForm from './DetailsForm';
import { ContextProvider } from '../context';

const Details = props => {
	return (
		<ContextProvider>
			<DetailsForm params={props.match.params} />
		</ContextProvider>
	);
};

export default Details;
