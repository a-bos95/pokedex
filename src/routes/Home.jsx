import { useEffect, useState, useRef, useMemo } from 'react';
import FlippingCard from '../components/FlippingCard';
import Container from '../components/Container';
import Loader from '../components/Loader';
import SearchInput from '../components/SearchInput';
import SortByFilter from '../components/SortByFilter';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination';
import { useFavorites } from '../customHooks/useFavorites';
import { useSearchParams, useNavigate } from 'react-router-dom';

const POSTS_PER_PAGE = 5

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const URLParams = new URLSearchParams(searchParams)
  
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Use the favorites hook
  const { toggleFavorite, isFavorite } = useFavorites('favorites', 'pokemon');

  useEffect(() => {
    fetch('https://dummyapi.online/api/pokemon')
      .then(res => res.json())
      .then(data => {
        setPokemons(data);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, []);

    
  const pokemonTypes = useMemo(() => Array.from(
    new Set(
      pokemons.map(pokemon => 
        pokemon.type.split('/')
      )
      .flat()
  )), [pokemons]);

  const filteredAndSortedPokemons = useMemo(() => {
    const query = URLParams.get('query') || '';
    const sort = URLParams.get('sort') || 'A-Z';
    const type = URLParams.get('type') || 'all';

    return pokemons
      .sort((a, b) => {
        const comparison = a.pokemon.localeCompare(b.pokemon, "it");
        return sort === 'Z-A' ? -comparison : comparison;
      })
      .filter((pokemon) => {
        if (type === 'all') return true
        return pokemon.type.split('/').includes(type)
      })
      .filter((pokemon) => {
        if (!query) return true
        return pokemon.pokemon.toLowerCase().includes(query.toLowerCase())
      })
  }, [pokemons, URLParams]);

  const currentPosts = useMemo(() => {
    const indexOfLastPost = (URLParams.get('page') || 1) * POSTS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
    return filteredAndSortedPokemons.slice(indexOfFirstPost, indexOfLastPost);
  }, [filteredAndSortedPokemons]);

  
  const handleInputChange = (e) => {
    const query = e.target.value
    if (query.length >= 3) {
      URLParams.set('query', query)
      setSearchParams(URLParams)
      return
    }
    URLParams.delete('query')
    setSearchParams(URLParams)
  };
  
  const handleSortChange = (e) => {
    const sort = e.target.value
    URLParams.set('sort', sort)
    setSearchParams(URLParams)
  };

  const handlePokemonTypeChange = (e) => {
    const type = e.target.value
    if (type === 'all') {
      URLParams.delete('type')
      setSearchParams(URLParams)
      return
    }
    URLParams.set('type', type)
    setSearchParams(URLParams)
  };

  const paginate = (pageNumber) => {
    URLParams.set('page', pageNumber)
    setSearchParams(URLParams)
  }

  if (loading || error) {
    return (
      <Container ContainerType='main' className='min-h-screen'>
        <Container top='5' ContainerType='div' className='flex flex-wrap gap-4 justify-center items-center h-full'>
          {loading && <Loader plural />}
          {error && <p>Error: {error.message}</p>}
        </Container>
      </Container>
    );
  }
  
  return (
    <Container ContainerType='main'>
      <Container top='5' ContainerType='div' className='flex flex-col gap-4 max-w-[90%] mx-auto'>
        <Container top='5' ContainerType='div' className='flex gap-4 items-center justify-center'>
          <SearchInput 
            placeholder='Look for a pokemon' 
            className='rounded-lg p-2 border border-secondary focus:outline focus:outline-secondary' 
            onChange={handleInputChange} 
          />
          <SortByFilter 
            id="sort" 
            onChange={handleSortChange} 
            propertyName='Name' 
            options={['A-Z', 'Z-A']} 
          />
          <SortByFilter 
            id="sort" 
            onChange={handlePokemonTypeChange} 
            propertyName='Type' 
            options={pokemonTypes} 
            AllItems 
          />
        </Container>
        <Container top='5' ContainerType='ul' className='flex flex-wrap gap-4 justify-center'>
          {currentPosts.map((pokemon, index) => (
            <FlippingCard 
              key={index} 
              pokemon={pokemon} 
              onClickFavorites={() => toggleFavorite(pokemon)}
              isFavorite={isFavorite(pokemon)} 
            />
          ))}
        </Container>
      </Container>
      <Container top='5' ContainerType='div' className='flex justify-center'>
        <Pagination 
          postsPerPage={POSTS_PER_PAGE} 
          totalPosts={filteredAndSortedPokemons.length} 
          paginate={paginate} 
        />
      </Container>
    </Container>
  );
}
