"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface FavoritesContextType {
  favoriteIds: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);
const KEY = "coffeeapp_favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setFavoriteIds(JSON.parse(raw));
    } catch {
      /* storage unavailable — start empty */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(favoriteIds));
    } catch {
      /* storage unavailable — fail silently */
    }
  }, [favoriteIds, hydrated]);

  const toggleFavorite = (id: string) =>
    setFavoriteIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <FavoritesContext.Provider
      value={{ favoriteIds, isFavorite: (id) => favoriteIds.includes(id), toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
}
