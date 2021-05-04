import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {list} from './core/services';

export default function ({ categories, onChange, disabled }) {
	const [List, setList] = useState([]);
  const [selectedVal, setSelectedVal] = useState("");

	const handleChange = e => {
    setSelectedVal(e);
		onChange(e.value);
	};

	useEffect(() => {
		async function fetchData() {
      const allItems = await list({limit: 1000});
      const options = allItems.data.map(d => ({ label: d.name, value: d._id }));
      if(categories) {
        const answer = options.find(el => el.value === categories);
        setSelectedVal(answer);
      }
			setList(options);
			return;
		}
		fetchData();
	}, [categories]);

	return (
		<Select
			onChange={e => handleChange(e)}
			options={List}
			value={selectedVal}
			placeholder={'Search the list ...'}
		/>
	);
}
