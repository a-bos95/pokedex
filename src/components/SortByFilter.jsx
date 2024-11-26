import React from 'react'

export default function SortByFilter({onChange, sortOrder, ...props}) {
  return (
    <div>
      <label htmlFor="sort">Sort by Name:</label>
      <select
        {...props}
        value={sortOrder}
        onChange={onChange}
      >
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
    </div>
  )
}
