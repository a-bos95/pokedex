import { useEffect, useState, useRef, useMemo } from 'react';
import FlippingCard from '../components/FlippingCard';
import Container from '../components/Container';
import Loader from '../components/Loader';
import SearchInput from '../components/SearchInput';
import SortByFilter from '../components/SortByFilter';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination';
import { useFavorites } from '../customHooks/useFavorites';
import { useSearchParams } from 'react-router-dom';

const POSTS_PER_PAGE = 10

export default function Home() {
  const [searchParams] = useSearchParams();
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilter, setCurrentFilter] = useState('all')
  const [currentSort, setCurrentSort] = useState('A-Z')
  const [currentSearch, setCurrentSearch] = useState('')

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

  const currentPosts = useMemo(() => {
    const indexOfLastPost = currentPage * POSTS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;

    return pokemons
    // Order pokemons
      .sort((a, b) => {
        const comparison = a.pokemon.localeCompare(b.pokemon, "it");
        return currentSort === 'Z-A' ? -comparison : comparison;
      })
    // Filter by type
      .filter((pokemon) => {
        if (currentFilter === 'all') return true
        return pokemon.type.split('/').includes(currentFilter)
      })
    // Filter by search
      .filter((pokemon) => {
        return pokemon.pokemon.toLowerCase().includes(currentSearch.toLowerCase())
      })
    // Paginate
      .slice(indexOfFirstPost, indexOfLastPost)
  }, [pokemons, currentPage, currentFilter, currentSort, currentSearch])

  
  const handleInputChange = (e) => {
    const query = e.target.value
    if (query.length < 3) {
      setCurrentSearch('')
      return
    }

    setCurrentSearch(query)
  };
  
  const handleSortChange = (e) => {
    setCurrentSort(e.target.value)
  };

  const handlePokemonTypeChange = (e) => {
    setCurrentFilter(e.target.value)
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            placeholder='Search for a pokemon' 
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
          totalPosts={currentPosts.length} 
          paginate={paginate} 
        />
      </Container>
    </Container>
  );
}
