import { useState, useCallback } from 'react';

export function useFavorites(storageKey, identifierKey) {
  // Inizializza lo stato dal localStorage
  const [favorites, setFavorites] = useState(() => {
    const savedItems = localStorage.getItem(storageKey);
    return savedItems ? JSON.parse(savedItems) : [];
  });

  // Aggiunge o rimuove un elemento dai preferiti
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

  // Controlla se un elemento è un preferito
  const isFavorite = useCallback((item) => {
    return favorites.some(fav => fav[identifierKey] === item[identifierKey]);
  }, [favorites, identifierKey]);

  return { favorites, toggleFavorite, isFavorite };
} 