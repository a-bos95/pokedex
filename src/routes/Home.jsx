import { useEffect, useState } from 'react';
import FlippingCard from '../components/FlippingCard';
import Container from '../components/Container';
import Loader from '../components/Loader';
import SearchInput from '../components/SearchInput';
import SortByFilter from '../components/SortByFilter';
import Pagination from '../components/Pagination';
import { useFavorites } from '../hooks/useFavorites';
import useFilter from '../hooks/useFilter';
import usePagination from '../hooks/usePagination';

const POSTS_PER_PAGE = 5;

export default function Home() {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { toggleFavorite, isFavorite } = useFavorites('favorites', 'pokemon');
    
    const {
        filteredAndSortedItems,
        pokemonTypes,
        handleInputChange,
        handleSortChange,
        handlePokemonTypeChange
    } = useFilter(pokemons);

    const {
        currentItems,
        paginate
    } = usePagination(filteredAndSortedItems, POSTS_PER_PAGE);

    useEffect(() => {
        fetch('https://dummyapi.online/api/pokemon')
            .then(res => res.json())
            .then(data => {
                setPokemons(data);
            })
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    }, []);

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
                    {currentItems.map((pokemon, index) => (
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
                    totalPosts={filteredAndSortedItems.length} 
                    paginate={paginate} 
                />
            </Container>
        </Container>
    );
}
