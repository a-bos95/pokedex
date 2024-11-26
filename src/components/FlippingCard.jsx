import React, { useState } from 'react'

import { StarIcon } from '@heroicons/react/24/outline'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';

export default function FlippingCard({ pokemon }) {
  const [flip, setFlip] = useState(false);

  function handleFlip() {
    setFlip(prevFlipState => !prevFlipState);
  }
  return (
    <li className="w-96 h-72 [perspective:1000px]">
      <div
        className={`relative h-full w-full [transform-style:preserve-3d] transition-transform duration-700 flex flex-col justify-center items-center ${
          flip ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Front side */}
        <div className="absolute h-full w-full bg-base-100 shadow-xl rounded-xl [backface-visibility:hidden]">
          <div className="w-full h-full flex flex-col justify-center items-center text-center">
            <ArrowPathIcon
              className="size-6 text-secondary absolute top-2 right-2 cursor-pointer"
              onClick={handleFlip}
            />
            <figure>
              <img
                src={pokemon.image_url}
                alt={pokemon.pokemon}
              />
            </figure>
            <h2 className="card-title">
              {pokemon.pokemon}
              <div className="badge badge-secondary">{pokemon.type}</div>
            </h2>
            <div className="mt-3 flex flex-wrap gap-3 justify-center items-center">
              <Link to={`/${pokemon.id}`} className="btn btn-primary">View details</Link>
            </div>
          </div>
        </div>

        {/* Back side */}
        <div className="absolute h-full w-full bg-secondary shadow-xl rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="w-full h-full flex flex-col justify-center items-center text-center">
            <ArrowPathIcon
              className="size-6 text-primary cursor-pointer mb-4"
              onClick={handleFlip}
            />
            <div className='flex flex-col'>
              <button className="btn btn-primary mt-3">Add notes</button>
              <button className="btn btn-primary mt-3">Add to favorites</button>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}