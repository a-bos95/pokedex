import React from 'react'
import Container from '../components/Container'
import PokeID from '../components/PokeID';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loader from '../components/Loader';

export default function PokemonDetailPage() {
  const params = useParams();
  console.log(params);
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://dummyapi.online/api/pokemon/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setPokemon(data);
        console.log(data);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading || error) {
    return (
      <Container ContainerType='main' className='min-h-screen'>
        <Container top='5' ContainerType='div' className='flex flex-wrap gap-4 justify-center items-center h-full'>
          {loading && <Loader />}
          {error && <p>Error: {error.message}</p>}
        </Container>
      </Container>
    );
  }

  return (
    <Container className='mt-5' ContainerType='main'>
      <Container ContainerType='div' className='flex flex-col items-center'>
        {pokemon && <PokeID pokemon={pokemon} />}
      </Container>
    </Container>
  )
}
