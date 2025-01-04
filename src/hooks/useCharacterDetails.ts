import { fetchCharacterById } from "../api/character";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../config/ReactQuery";
import { Character } from "../types/character";

export const useCharacterDetails = (id: string) => {
  const charactersState = queryClient
    .getQueryCache()
    .findAll({ queryKey: ["characters"] });

  const cachedCharacter = charactersState
    .flatMap((query) => query.state.data as Character[])
    .find((char): char is Character => char.id === +id);

  const {
    data: character,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["character", id],
    queryFn: () => fetchCharacterById(id),
    enabled: !cachedCharacter,
    initialData: cachedCharacter,
    staleTime: 1000 * 60 * 5,
  });

  return {
    character,
    isLoading,
    isError,
    error,
  };
};
