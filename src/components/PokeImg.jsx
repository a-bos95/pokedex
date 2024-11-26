import React from 'react'

export default function PokeImg({ src, alt }) {
  return (
    <figure className='max-w-lg'>
        <img
            className='rounded-lg shadow-md sm:h-auto md:min-h-[300px] max-w-full'
            src={src}
            alt={alt}
        />
    </figure>
  )
}
