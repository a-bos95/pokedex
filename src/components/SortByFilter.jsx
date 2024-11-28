import React from 'react'

export default function SortByFilter({onChange, propertyName, options, AllItems, ...props}) {
  return (
    <div>
      <label htmlFor="sort">Sort by {propertyName}:</label>
      <select
        {...props}
        className='ml-2'
        onChange={onChange}
      >
        {AllItems && <option value="all">All</option>}
        {options && options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
