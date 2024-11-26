import React from 'react'

export default function SearchInput({ placeholder, onChange, ...props }) {
  return (
    <input onChange={onChange} type="text" placeholder={placeholder} {...props} />
  )
}
