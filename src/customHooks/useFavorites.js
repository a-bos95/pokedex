import { useState, useCallback } from 'react';

export function useFavorites(storageKey, identifierKey) {
  // Initialize state from localStorage
  const [favorites, setFavorites] = useState(() => {
    const savedItems = localStorage.getItem(storageKey);
    return savedItems ? JSON.parse(savedItems) : [];
  });

  // Toggle favorite status
  const toggleFavorite = useCallback((item) => {
    setFavorites((prevFavorites) => {
      const isItemFavorite = prevFavorites.some(
        fav => fav[identifierKey] === item[identifierKey]
      );
      
      const newFavorites = isItemFavorite
        ? prevFavorites.filter(fav => fav[identifierKey] !== item[identifierKey])
        : [...prevFavorites, item];
      
      localStorage.setItem(storageKey, JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, [storageKey, identifierKey]);

  // Check if item is favorite
  const isFavorite = useCallback((item) => {
    return favorites.some(fav => fav[identifierKey] === item[identifierKey]);
  }, [favorites, identifierKey]);

  return { favorites, toggleFavorite, isFavorite };
} 