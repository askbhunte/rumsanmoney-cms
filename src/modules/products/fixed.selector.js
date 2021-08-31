import React, { useState, useEffect } from 'react';
import Select from 'react-select';

export default function ({ category, onChange, disabled }) {
	const [List, setList] = useState([]);

	const Options = [
		{ value: 'agegroup_18to25', label: '18 - 25 Age Group' },
		{ value: 'agegroup_25to40', label: '25 - 40 Age Group' },
		{ value: 'agegroup_40to60', label: '40 - 60 Age Group' },
	];

	const handleChange = e => {
		const newCategories = e.map(d => d.value);
		onChange(newCategories);
		setList(...List, newCategories);
	};

	useEffect(() => {
		function fetchData() {
			if (category) {
				const options = category.map(d => ({ label: d, value: d }));
				setList(options);
			}
			return;
		}
		fetchData();
	}, [category]);

	return <Select value={List} isMulti onChange={e => handleChange(e)} options={Options} />;

}

export { default as FixedSelector } from './fixed.selector';
