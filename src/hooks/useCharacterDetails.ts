import { queryClient } from "../config/ReactQuery";
import { Character } from "../types/character";

export const useCharacterDetails = (id: string) => {
  const charactersState = queryClient
    .getQueryCache()
    .findAll({ queryKey: ["characters"] });

  const character = charactersState
    .flatMap((query) => query.state.data as Character[])
    .find((char): char is Character => char.id === +id);

  return {
    character,
  };
};
