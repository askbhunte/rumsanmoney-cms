import React from 'react'
import Select from 'react-select'
import options from '../../constants/tags'
export default function () {
    return (
        <Select isMulti
            options={options}
            placeholder={'Select tags '} />
    )
}


