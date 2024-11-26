import React from 'react'
import Container from '../components/Container'
import PokeID from '../components/PokeID';
import { useLoaderData } from 'react-router-dom'

export default function PokemonDetailPage() {
  const pokemon = useLoaderData();
  return (
    <Container className='mt-5' ContainerType='main'>
      <Container ContainerType='div' className='flex flex-col items-center'>
        <PokeID pokemon={pokemon} />
      </Container>
    </Container>
  )
}

export async function loader ({ params }) {
  const id = params.id;
  const url = `https://dummyapi.online/api/pokemon/${params.id}`;
  const response = await fetch(url);
  const pokemon = await response.json();
  return pokemon;
}
