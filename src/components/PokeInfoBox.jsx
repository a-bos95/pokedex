import React from 'react'

export default function PokeInfoBox({ info, title }) {
  return (
    <div className='flex flex-col bg-primary rounded-lg px-3 mt-5 prose min-w-full py-5'>
        <h3 className='text-white text-center'>
            {title}
        </h3>
            
        {info.length === 0 ? (
          <p className='text-white text-center'>No <span className='lowercase'>{title}</span> to show.</p>
        ) : (
          <ul className='flex gap-2 flex-wrap justify-center not-prose'>
            {info.map((ability, index) => (
              <li key={index} className='font-bold text-white bg-secondary rounded-lg p-2'>{ability}</li>
            ))}
          </ul>
        )}
    </div>
            
  )
}
