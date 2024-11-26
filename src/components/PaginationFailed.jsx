import { useState } from 'react';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
}

export default function Pagination({ totalRecords = null, pageLimit = 10, neighborPages = 0, onPageChanged }) {
  
    [currentPage, setCurrentPage] = useState(1);

    const fetchPages = () => {
        const totalPages = Math.ceil(totalRecords / pageLimit);
        const currentPage = currentPage
        const neighborPages = Math.max(0, Math.min(neighborPages, 2));

        /** this.pageNeighbours represents how many "neighbor" page numbers should be displayed to the left and right of the current page.
         * Multiplying it by 2 accounts for both sides of the current page.
         * Adds 3 to account for the current page and the first and last page buttons. hese are commonly always included in pagination.
        */
        const totalNumbers = (neighborPages * 2) + 3;

        /**
         * calculating the total number of blocks to be rendered in a pagination system.
         * This accounts for the total number of pagination buttons (totalNumbers) plus any special blocks like ellipses (...) to handle gaps in the pagination.
        */
        const totalBlocks = totalNumbers + 2;

        if (totalPages > totalBlocks) {
            /** if the number of total pages is greater than the total number of displayable blocks, we need to calculate the start and end of the block of pages to be rendered.
             * const startPage = Math.max(2, currentPage - neighborPages)  - Moves backward from the current page by the number of neighbors you want to display.
             * E.g. currentPage = 5, neighborPages = 2, startPage = Math.max(2, 5 - 2) = 3
             */
            const startPage = Math.max(2, currentPage - neighborPages);
            const endPage = Math.min(totalPages - 1, currentPage + neighborPages);
            let pages = range(startPage, endPage);

            /**
             * hasLeftSpill: has hidden pages to the left
             * hasRightSpill: has hidden pages to the right
             * spillOffset: number of hidden pages either to the left or to the right
            */

            const hasLeftSpill = startPage > 2;
            const hasRightSpill = (totalPages - endPage) > 1;
            const spillOffset = totalNumbers - (pages.length + 1);

            switch (true) {
                // handle: (1) < {5 6} [7] {8 9} (10)
                case (hasLeftSpill && !hasRightSpill): {
                const extraPages = range(startPage - spillOffset, startPage - 1);
                pages = [LEFT_PAGE, ...extraPages, ...pages];
                break;
            }

                // handle: (1) {2 3} [4] {5 6} > (10)
                case (!hasLeftSpill && hasRightSpill): {
                const extraPages = range(endPage + 1, endPage + spillOffset);
                pages = [...pages, ...extraPages, RIGHT_PAGE];
                break;
            }

                // handle: (1) < {4 5} [6] {7 8} > (10)
                case (hasLeftSpill && hasRightSpill):
                    default: {
                        pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                break;
            }
            }

            return [1, ...pages, totalPages];

        }

        return range(1, totalPages);
    }

    if(totalRecords || totalPages === 1) return null;

    const pages = fetchPages();

  return (
    <div className="join">
      ...
    </div>
  );
};


/* <div className="join">
<input className="join-item btn btn-square" type="radio" name="options" aria-label="1" defaultChecked />
<input className="join-item btn btn-square" type="radio" name="options" aria-label="2" />
<input className="join-item btn btn-square" type="radio" name="options" aria-label="3" />
<input className="join-item btn btn-square" type="radio" name="options" aria-label="4" />
</div> */