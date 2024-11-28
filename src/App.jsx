import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Favorites from './routes/Favorites';
// ... other imports ...

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        {/* ... other routes ... */}
      </Routes>
    </BrowserRouter>
  );
} 