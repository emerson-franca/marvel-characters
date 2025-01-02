import { hash, PUBLIC_KEY, ts } from "../utils/utils";
import axios from "axios";
import { Comic, ComicApiResponse } from "../types/comic";

export const fetchCharacterComics = async (
  characterId: string
): Promise<Comic[]> => {
  const response = await axios.get<ComicApiResponse>(
    `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics`,
    {
      params: {
        ts,
        apikey: PUBLIC_KEY,
        hash,
        limit: 10,
        orderBy: "-onsaleDate",
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Erro ao buscar quadrinhos");
  }

  return response.data.data.results;
};
