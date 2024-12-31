import { Character } from "../types/character";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const FAVORITES_KEY = "marvel_favorites";

export const useFavorites = () => {
  const queryClient = useQueryClient();

  const { data: favorites = [] } = useQuery<Character[]>({
    queryKey: [FAVORITES_KEY],
    queryFn: () => {
      const savedFavorites = localStorage.getItem(FAVORITES_KEY);
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const toggleFavoriteMutation = useMutation<Character[], unknown, Character>({
    mutationFn: async (character: Character) => {
      const isAlreadyFavorite = favorites.some(
        (fav) => fav.id === character.id
      );

      if (!isAlreadyFavorite && favorites.length === 5) {
        alert("Você já tem 5 favoritos!");
        return favorites;
      }

      const updatedFavorites = isAlreadyFavorite
        ? favorites.filter((fav) => fav.id !== character.id)
        : [...favorites, character];

      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      return updatedFavorites;
    },
    onSuccess: (updatedFavorites) => {
      queryClient.setQueryData([FAVORITES_KEY], updatedFavorites);
    },
  });

  const toggleFavorite = (character: Character) => {
    toggleFavoriteMutation.mutate(character);
  };

  const isFavorite = (characterId: number) =>
    favorites.some((fav) => fav.id === characterId);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
};
