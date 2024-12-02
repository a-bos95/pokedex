import Container from '../components/Container';
import FlippingCard from '../components/FlippingCard';
import Pagination from '../components/Pagination';
import SearchInput from '../components/SearchInput';
import SortByFilter from '../components/SortByFilter';
import { useFavorites } from '../hooks/useFavorites';
import useFilter from '../hooks/useFilter';
import usePagination from '../hooks/usePagination';

const POSTS_PER_PAGE = 5;

export default function Favorites() {
    const { favorites } = useFavorites('favorites', 'pokemon');
    
    const {
        filteredAndSortedItems,
        pokemonTypes,
        handleInputChange,
        handleSortChange,
        handlePokemonTypeChange
    } = useFilter(favorites);

    const {
        currentItems,
        paginate
    } = usePagination(filteredAndSortedItems, POSTS_PER_PAGE);

    return (
        <Container ContainerType='main'>
            <Container top='5' ContainerType='div' className='flex flex-col gap-4 max-w-[90%] mx-auto'>
                <h1 className='text-2xl font-bold text-center'>My Favorites</h1>
                {favorites.length === 0 ? (
                    <p className='text-center'>No favorites added yet!</p>
                ) : (
                    <>
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
                                    flippingDisabled 
                                />
                            ))}
                        </Container>
                        <Container top='5' ContainerType='div' className='flex justify-center'>
                            <Pagination 
                                postsPerPage={POSTS_PER_PAGE} 
                                totalPosts={filteredAndSortedItems.length} 
                                paginate={paginate}
                            />
                        </Container>
                    </>
                )}
            </Container>
        </Container>
    );
} 