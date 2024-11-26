import { useMemo } from "react"

const range = (start, end) => {
    let length = end - start + 1;
    /*
        Create an array of certain length and set the elements within it from
      start value to end value.
    */
    return Array.from({ length }, (_, idx) => idx + start);
  };

export const usePagination = ({
    totalCount,
    pageSize,
    neighborPages = 1,
    currentPage
}) => {
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize);

        // Pages count is determined as neighborPages + firstPage + lastPage + currentPage + 2*DOTS/ELLIPSES
        const totalPageNumbers = (neighborPages * 2) + 3;

        if(totalPageCount >= totalPageNumbers) {
            return range(1, totalPageCount);
        }

        /*
            Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
        */

        const leftSiblingIndex = Math.max(currentPage - neighborPages, 1);
        const rightSiblingIndex = Math.min(currentPage + neighborPages, totalPageCount);

        /*
            We do not show dots if there is only one page number to be inserted between dots
        */
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        if(!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = neighborPages + 2;
            const leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS, totalPageCount];
        }

        if(!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = (neighborPages * 2) + 2;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS, totalPageCount];
        }

        if(shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = (neighborPages * 2) + 2;
            let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);

            return [firstPageIndex, DOTS, ...rightRange];
        }

        if(shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }

    }, [totalCount, pageSize, neighborPages, currentPage]);

    return paginationRange;
}
