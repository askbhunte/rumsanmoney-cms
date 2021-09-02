import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import options from '../../constants/tags'
export default function ({ existingTags, onChange }) {
    const [selectedTags, setSelectedTags] = useState([]);
    const handleSelect = e => {
        const tags = e.map(
            d => d.value
        )
        onChange(tags);
    }
    useEffect(() => {
        if (existingTags) {
            const finalData = existingTags.map(e => {
                const x = options.filter(options => options.value === e);
                return x[0];
            });
            setSelectedTags(finalData);
        }
    }, [existingTags]);
    return (
        <Select isMulti
            options={options}
            // value={selectedTags}
            onChange={e => handleSelect(e)}
            placeholder="Select tags" />
    )
}


