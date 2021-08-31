import React from 'react'
import Select from 'react-select'

export default function () {
    const options = [
        { value: 'agegroup_18to25', label: '18 - 25 Age Group' },
        { value: 'agegroup_25to40', label: '25 - 40 Age Group' },
        { value: 'agegroup_40to60', label: '40 - 60 Age Group' },
    ]
    return (
        <Select isMulti
            options={options}
            placeholder={'Select tags'} />
    )
}


