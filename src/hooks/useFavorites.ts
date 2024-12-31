import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const FAVORITES_KEY = "marvel_favorites";

export const useFavorites = () => {
  const queryClient = useQueryClient();
  const { data: favorites = [] } = useQuery<number[]>({
    queryKey: [FAVORITES_KEY],
    queryFn: () => {
      const savedFavorites = localStorage.getItem(FAVORITES_KEY);
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const toggleFavoriteMutation = useMutation<number[], unknown, number>({
    mutationFn: async (characterId: number) => {
      if (!favorites.includes(characterId) && favorites.length === 5) {
        alert("Você já tem 5 favoritos!");
        return favorites;
      }

      const updatedFavorites = favorites.includes(characterId)
        ? favorites.filter((id) => id !== characterId)
        : [...favorites, characterId];

      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      return updatedFavorites;
    },
    onSuccess: (updatedFavorites) => {
      queryClient.setQueryData([FAVORITES_KEY], updatedFavorites);
    },
  });

  const toggleFavorite = (characterId: number) => {
    toggleFavoriteMutation.mutate(characterId);
  };

  const isFavorite = (characterId: number) => favorites.includes(characterId);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
};
