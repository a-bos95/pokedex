import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Modal from './Modal'

export default function Navbar({ title = 'Pokedex' }) {
  const [name, setName] = useState(() => localStorage.getItem('userName') || 'Guest')
  const nameInputRef = useRef(null)

  const handleNameSubmit = (newName) => {
    setName(newName)
  }
  
  return (
    <>
      <div className="navbar bg-base-100 border border-blue-800">
        <div className="navbar-start">
          <Link to='/' className="btn btn-ghost text-xl">{title}</Link>
        </div>
        <div className="navbar-center flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/favorites" className="your-classes">Favorites</Link></li>
          </ul>
        </div>
        <div className="navbar-end">
          <p>Welcome, <span className='font-bold'>{name}</span>!</p>
        </div>
      </div>

      <Modal 
        ref={nameInputRef}
        onSubmit={handleNameSubmit}
      />
    </>
  )
}