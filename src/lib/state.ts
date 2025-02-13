import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  name: string;
}

interface UserActions {
  setName: (x: string) => void;
}

export const useUser = create<User & UserActions>()(
  persist(
    (set) => ({
      name: '',
      setName: (name) => set({ name }),
    }),
    {
      name: 'dog-adoption-user',
    }
  )
);

interface SearchFilters {
  breeds: string[];
  minAge: number;
  maxAge: number;
  zipCodes: string[];
  pageSize: number;
}

interface SearchFilterActions {
  setBreeds: (x: string[]) => void;
  setMinAge: (x: number) => void;
  setMaxAge: (x: number) => void;
  setZipCodes: (x: string[]) => void;
  resetFilters: () => void;
  setPageSize: (x: number) => void;
}

export const DEFAULT_FILTERS = {
  breeds: [],
  minAge: 0,
  maxAge: 30,
  zipCodes: [],
  pageSize: 10,
};

export const useSearchFilters = create<SearchFilters & SearchFilterActions>(
  (set) => ({
    ...DEFAULT_FILTERS,
    setBreeds: (breeds) => set({ breeds }),
    setMinAge: (minAge) => set({ minAge }),
    setMaxAge: (maxAge) => set({ maxAge }),
    setZipCodes: (zipCodes) => set({ zipCodes }),
    resetFilters: () => set(DEFAULT_FILTERS),
    setPageSize: (pageSize) => set({ pageSize }),
  })
);

interface Sorting {
  breed: 'asc' | 'desc' | null;
  age: 'asc' | 'desc' | null;
}

interface SortingActions {
  toggleSorting: (field: keyof Sorting) => void;
}

export const useSorting = create<Sorting & SortingActions>((set, get) => ({
  pageSize: 10,
  breed: 'asc',
  age: null,
  toggleSorting: (x) => set({ [x]: get()[x] === 'asc' ? 'desc' : 'asc' }),
}));

interface Favorites {
  favorites: string[];
}

interface FavoritesActions {
  addFavorite: (x: string) => void;
  removeFavorite: (x: string) => void;
}

export const useFavorites = create<Favorites & FavoritesActions>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (x) => set({ favorites: [...get().favorites, x] }),
      removeFavorite: (x) =>
        set({ favorites: get().favorites.filter((y) => y !== x) }),
    }),
    {
      name: 'dog-adoption-favorites',
    }
  )
);
