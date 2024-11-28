import { useEffect, useState, useRef } from 'react';
import FlippingCard from '../components/FlippingCard';
import Container from '../components/Container';
import Loader from '../components/Loader';
import SearchInput from '../components/SearchInput';
import SortByFilter from '../components/SortByFilter';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination';
import { useFavorites } from '../customHooks/useFavorites';

export default function Home() {
  const modalInput = useRef();
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  // Use the favorites hook
  const { toggleFavorite, isFavorite } = useFavorites('favorites', 'pokemon');

  useEffect(() => {
    fetch('https://dummyapi.online/api/pokemon')
      .then(res => res.json())
      .then(data => {
        const sortedPokemons = dataSorter(data, 'pokemon');
        setPokemons(sortedPokemons);
        setFilteredPokemons(sortedPokemons);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPokemons.slice(indexOfFirstPost, indexOfLastPost);

  function dataSorter(data, property, order = 'asc') {
    return [...data].sort((a, b) => {
      const comparison = a[property].localeCompare(b[property], "it");
      return order === 'desc' ? -comparison : comparison;
    });
  }

  const filterData = (data, query, property) => {
    return data.filter(item => 
      item[property].toLowerCase().includes(query.toLowerCase())
    );
  };
  
  const handleInputChange = (e) => {
    const query = e.target.value;
    if(query === 'all') {
      setFilteredPokemons(pokemons);
      return;
    }
    const filteredData = filterData(pokemons, query, 'pokemon');
    setFilteredPokemons(filteredData);
  };
  
  const handleSortChange = (e) => {
    const selectedSortOrder = e.target.value;
    const sortedPokemons = dataSorter(
      filteredPokemons, 
      'pokemon', 
      selectedSortOrder === 'Z-A' ? 'desc' : 'asc'
    );
    setFilteredPokemons(sortedPokemons);
  };

  const handlePokemonTypeChange = (e) => {
    if (e.target.value === 'all') {
      setFilteredPokemons(pokemons);
    } else {
      const filteredByType = pokemons.filter(pokemon => 
        pokemon.type.includes(e.target.value)
      );
      setFilteredPokemons(filteredByType);
    }
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

  const pokemonTypes = Array.from(new Set(pokemons.map(pokemon => 
    pokemon.type.split('/')).flat()
  ));
  
  return (
    <Container ContainerType='main'>
      <Modal ref={modalInput}/>
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
          postsPerPage={postsPerPage} 
          totalPosts={filteredPokemons.length} 
          paginate={paginate} 
        />
      </Container>
    </Container>
  );
}
