import React, { useState } from 'react'
import Select from 'react-select'
import options from '../../constants/tags'
export default function ({ existingTags, onChange }) {
    console.log(existingTags);
    const handleSelect = e => {
        const tags = e.map(
            d => d.value
        )
        onChange(tags);
    }
    return (
        <Select isMulti
            options={options}
            onChange={e => handleSelect(e)}
            placeholder={'Select tags '} />
    )
}


