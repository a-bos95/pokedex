import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './routes/Home.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './RootLayout.jsx'
import PokemonDetailPage from './routes/PokemonDetailPage.jsx'
import { loader as PokemonDetailLoader } from './routes/PokemonDetailPage.jsx'
import Favorites from './routes/Favorites.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:id",
        element: <PokemonDetailPage />,
        loader: PokemonDetailLoader
      },
      {
        path: "/favorites",
        element: <Favorites />,
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
