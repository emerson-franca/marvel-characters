import { fetchCharacterById } from "../api/character";
import { useQuery } from "@tanstack/react-query";

export const useCharacterDetails = (id: string) => {
  const {
    data: character,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["character", id],
    queryFn: async () => fetchCharacterById(id!),
  });

  return {
    character,
    isLoading,
    isError,
    error,
  };
};
