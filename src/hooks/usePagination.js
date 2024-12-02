import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

export default function usePagination(items, itemsPerPage) {
    const [searchParams, setSearchParams] = useSearchParams();
    const URLParams = new URLSearchParams(searchParams);

    const currentPage = parseInt(URLParams.get('page')) || 1;

    const paginatedItems = useMemo(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return items.slice(indexOfFirstItem, indexOfLastItem);
    }, [items, currentPage, itemsPerPage]);

    const paginate = (pageNumber) => {
        URLParams.set('page', pageNumber);
        setSearchParams(URLParams);
    };

    return {
        currentItems: paginatedItems,
        currentPage,
        totalPages: Math.ceil(items.length / itemsPerPage),
        paginate
    };
} 