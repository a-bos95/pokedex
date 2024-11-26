import FlippingCard from '../components/FlippingCard';
import Container from '../components/Container'
import { useEffect, useState, useRef, useMemo } from 'react'
import Loader from '../components/Loader'
import SearchInput from '../components/SearchInput';
import SortByFilter from '../components/SortByFilter';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination';

export default function Home() {
  const nameInput = useRef();
  const [isNameInputModalOpen, setIsNameInputModalOpen] = useState(false)
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [sortOrder, setSortOrder] = useState('A-Z');

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    fetch('https://dummyapi.online/api/pokemon').then(res => res.json()).then(data => {
      const sortedPokemons = dataSorter(data, 'pokemon');
      setPokemons(sortedPokemons);
      setFilteredPokemons(sortedPokemons);
    }).catch(error => {
      setError(error);
    }).finally(() => {
      setLoading(false);
    });
  }, [])

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
    return data.filter(item => item[property].toLowerCase().includes(query.toLowerCase()));
  };
  
  const handleInputChange = (e) => {
    const query = e.target.value;
    const filteredData = filterData(pokemons, query, 'pokemon');
    setFilteredPokemons(filteredData);
  };
  
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    const sortedPokemons = [...filteredPokemons];
    if (e.target.value === 'A-Z') {
      sortedPokemons.sort((a, b) => a.pokemon.localeCompare(b.pokemon, "it"));
    } else {
      sortedPokemons.sort((a, b) => b.pokemon.localeCompare(a.pokemon, "it"));
    }
    setFilteredPokemons(sortedPokemons);
  }

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
    <>
      <button onClick={() => setIsNameInputModalOpen(true)}>Open modal</button>
      <Container ContainerType='main'>
        <Modal ref={nameInput} isOpen={isNameInputModalOpen} />
        <Container top='5' ContainerType='div' className='flex flex-col gap-4 max-w-[90%] mx-auto'>
          <Container top='5' ContainerType='div' className='flex gap-4 items-center justify-center'>
            <SearchInput placeholder='Search for a pokemon' className='rounded-lg p-2 border border-secondary focus:outline focus:outline-secondary' onChange={(e) => handleInputChange(e, setFilteredPokemons, 'filteredPokemons', pokemons, 'pokemon')} />
            <SortByFilter id="sort" onChange={handleSortChange} value={sortOrder} />
          </Container>
          <Container top='5' ContainerType='ul' className='flex flex-wrap gap-4 justify-center'>
            {currentPosts.map((pokemon, index) => (
              <FlippingCard key={index} pokemon={pokemon} />
          ))}
          </Container>
        </Container>
        <Container top='5' ContainerType='div' className='flex justify-center'>
          <Pagination postsPerPage={postsPerPage} totalPosts={pokemons.length} paginate={paginate} />
        </Container>
      </Container>
    </>
  )
}
