import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

// Helper function to generate range of numbers
const range = (from, to, step = 1) => {
    let i = from;
    const range = [];
    while (i <= to) {
        range.push(i);
        i += step;
    }
    return range;
};

export default function Pagination({ postsPerPage, totalPosts, paginate }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
    const neighborPages = 1; // Number of pages to show on each side

    // Update URL when page changes
    useEffect(() => {
        setSearchParams({ page: currentPage });
        paginate(currentPage);
    }, [currentPage]);

    const fetchPageNumbers = () => {
        const totalPages = Math.ceil(totalPosts / postsPerPage);
        
        // If total pages is less than 7, show all pages without dots
        if (totalPages <= 5) {
            return range(1, totalPages);
        }

        const totalNumbers = (neighborPages * 2) + 3;
        const totalBlocks = totalNumbers + 2;

        // If we don't have enough pages to warrant ellipsis
        if (totalPages <= totalBlocks) {
            return range(1, totalPages);
        }

        const startPage = Math.max(2, currentPage - neighborPages);
        const endPage = Math.min(totalPages - 1, currentPage + neighborPages);
        let pages = range(startPage, endPage);

        const hasLeftSpill = startPage > 2;
        const hasRightSpill = (totalPages - endPage) > 1;

        if (hasLeftSpill && !hasRightSpill) {
            const extraPages = range(startPage - 1, startPage - 1);
            pages = [LEFT_PAGE, ...extraPages, ...pages];
        } else if (!hasLeftSpill && hasRightSpill) {
            const extraPages = range(endPage + 1, endPage + 1);
            pages = [...pages, ...extraPages, RIGHT_PAGE];
        } else if (hasLeftSpill && hasRightSpill) {
            pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
        }

        return [1, ...pages, totalPages];
    };

    const pages = fetchPageNumbers();

    const handleClick = (page) => {
        if (page === LEFT_PAGE) {
            setCurrentPage(currentPage - 1);
        } else if (page === RIGHT_PAGE) {
            setCurrentPage(currentPage + 1);
        } else {
            setCurrentPage(page);
        }
    };

    return (
        <div className="join">
            {pages.map((page, index) => {
                if (page === LEFT_PAGE) {
                    return (
                        <button
                            key={index}
                            onClick={() => handleClick(LEFT_PAGE)}
                            className="join-item btn btn-sm"
                        >
                            &laquo;
                        </button>
                    );
                }
                if (page === RIGHT_PAGE) {
                    return (
                        <button
                            key={index}
                            onClick={() => handleClick(RIGHT_PAGE)}
                            className="join-item btn btn-sm"
                        >
                            &raquo;
                        </button>
                    );
                }
                return (
                    <button
                        key={index}
                        onClick={() => handleClick(page)}
                        className={`join-item btn btn-sm ${currentPage === page ? 'btn-active' : ''}`}
                    >
                        {page}
                    </button>
                );
            })}
        </div>
    );
}
