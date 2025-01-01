import { Character, CharactersApiResponse } from "@/types/character";
import { hash, PUBLIC_KEY, ts } from "../utils/utils";
import axios from "axios";

export const fetchCharacterById = async (
  characterId: string
): Promise<Character> => {
  const response = await axios.get<CharactersApiResponse>(
    `https://gateway.marvel.com:443/v1/public/characters/${characterId}`,
    {
      params: {
        ts,
        apikey: PUBLIC_KEY,
        hash,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Erro ao buscar personagem");
  }

  return response.data.data.results[0];
};
