import { fetchCharacterComics } from "../api/comics";
import { useQuery } from "@tanstack/react-query";

export const useCharacterComics = (id: string) => {
  const {
    data: comics,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["comics", id],
    queryFn: async () => fetchCharacterComics(id),
  });
  return {
    comics,
    isLoading,
    isError,
    error,
  };
};
