import { Link } from "react-router-dom";

export default function Pagination({ postsPerPage, totalPosts, paginate }) {
    const PageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        PageNumbers.push(i);
    }
  return (
    <div className="join">
        {PageNumbers.map(number => (
            <button key={number} onClick={() => paginate(number)} className="join-item btn btn-sm">{number}</button>
        ))}
    </div>
  )
}
