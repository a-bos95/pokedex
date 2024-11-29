import { useState, useEffect } from 'react';
import Container from '../components/Container';
import FlippingCard from '../components/FlippingCard';

export default function Favorites() {

  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  return (
    <Container ContainerType='main'>
      <Container top='5' ContainerType='div' className='flex flex-col gap-4 max-w-[90%] mx-auto'>
        <h1 className='text-2xl font-bold text-center'>My Favorites</h1>
        {favorites.length === 0 ? (
          <p className='text-center'>No favorites added yet!</p>
        ) : (
          <Container top='5' ContainerType='ul' className='flex flex-wrap gap-4 justify-center'>
            {favorites.map((pokemon, index) => (
              <FlippingCard key={index} pokemon={pokemon} flippingDisabled />
            ))}
          </Container>
        )}
      </Container>
    </Container>
  );
} 