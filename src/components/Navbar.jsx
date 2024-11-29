import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Modal from './Modal'

export default function Navbar({ title = 'Pokedex' }) {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [name, setName] = useState(() => localStorage.getItem('userName') || 'Guest')
  const nameInputRef = useRef(null)

  const handleNameSubmit = (newName) => {
    setName(newName)
  }

  const handleButtonClick = () => {
    setFiltersOpen((prevState) => !prevState)
  }

  return (
    <>
      <div className="navbar bg-base-100 border border-blue-800">
        <div className="navbar-start">
          <Link to='/' className="btn btn-ghost text-xl">{title}</Link>
        </div>
        <div className="navbar-center flex">
          <ul className="menu menu-horizontal px-1">
            <li><a>Preferiti</a></li>
            <li><a>I miei Pokemon</a></li>
            <li><Link to="/favorites" className="your-classes">Favorites</Link></li>
          </ul>
        </div>
        <div className="navbar-end">
          <p>Benvenuto, {name}</p>
        </div>
      </div>

      <Modal 
        ref={nameInputRef}
        onSubmit={handleNameSubmit}
      />
    </>
  )
}