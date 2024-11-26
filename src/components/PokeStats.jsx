import React from 'react'
import { MapPinIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/24/outline'

export default function PokeStats({ location, hitpoints }) {
  return (
    <div className='flex flex-col bg-primary rounded-lg p-6 mt-10 prose'>
        <h3 className='text-white'>Stats</h3>
        <div className='flex gap-2'>
            <MapPinIcon className="size-6 text-secondary"/>
            <span className='font-bold'>{location}</span>
        </div>
        <div className='flex gap-2'>
            <CheckIcon className="size-6 text-secondary"/>
            <span className='font-bold'>HP: {hitpoints}</span>
        </div>
    </div>
  )
}
