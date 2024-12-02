import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

export default function useFilter(items) {
    const [searchParams, setSearchParams] = useSearchParams();
    const URLParams = new URLSearchParams(searchParams);

    const pokemonTypes = useMemo(() => 
        Array.from(new Set(items.map(pokemon => pokemon.type.split('/')).flat())), 
        [items]
    );

    const filteredAndSortedItems = useMemo(() => {
        const query = URLParams.get('query') || '';
        const sort = URLParams.get('sort') || 'A-Z';
        const type = URLParams.get('type') || 'all';

        return items
            .sort((a, b) => {
                const comparison = a.pokemon.localeCompare(b.pokemon, "it");
                return sort === 'Z-A' ? -comparison : comparison;
            })
            .filter((pokemon) => {
                if (type === 'all') return true;
                return pokemon.type.split('/').includes(type);
            })
            .filter((pokemon) => {
                if (!query) return true;
                return pokemon.pokemon.toLowerCase().includes(query.toLowerCase());
            });
    }, [items, URLParams]);

    const handleInputChange = (e) => {
        const query = e.target.value;
        if (query.length >= 3) {
            URLParams.set('query', query);
            setSearchParams(URLParams);
            return;
        }
        URLParams.delete('query');
        setSearchParams(URLParams);
    };

    const handleSortChange = (e) => {
        const sort = e.target.value;
        URLParams.set('sort', sort);
        setSearchParams(URLParams);
    };

    const handlePokemonTypeChange = (e) => {
        const type = e.target.value;
        if (type === 'all') {
            URLParams.delete('type');
            setSearchParams(URLParams);
            return;
        }
        URLParams.set('type', type);
        setSearchParams(URLParams);
    };

    return {
        filteredAndSortedItems,
        pokemonTypes,
        handleInputChange,
        handleSortChange,
        handlePokemonTypeChange
    };
} 