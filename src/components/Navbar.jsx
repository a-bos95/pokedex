import { useState} from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ title = 'Pokedex' }) {
  const [filtersOpen, setFiltersOpen] = useState(false)

  const handleButtonClick = () => {
    setFiltersOpen((prevState) => !prevState)
  }
  return (
    <div className="navbar bg-base-100 border border-blue-800">
      <div className="navbar-start">
        <Link to='/' className="btn btn-ghost text-xl">{ title }</Link>
      </div>
      <div className="navbar-center flex">
      <ul className="menu menu-horizontal px-1">
        <li><a>Preferiti</a></li>
        <li><a>I miei Pokemon</a></li>
      </ul>
      </div>
      <div className="navbar-end">
        
      </div>
    </div>
  )
}