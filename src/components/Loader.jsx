import React from 'react'

export default function Loader({ plural = false }) {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen">
      <span className="loading loading-spinner text-secondary"></span>
      {plural ? (
        <p>Your pokemons are loading</p>
      ) : (
        <p>Your pokemon is loading</p>
      )}
    </div>
  )
}
