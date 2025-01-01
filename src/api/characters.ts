import { CharactersApiResponse } from "@/types/character";
import { hash, ts } from "../utils/utils";
import axios from "axios";

type FetchMarvelCharactersParams = {
  searchQuery: string;
  limit: number;
  offset: number;
  orderBy: string;
  characterId?: number;
};

export const fetchMarvelCharacters = async ({
  searchQuery,
  limit,
  offset,
  orderBy,
}: FetchMarvelCharactersParams): Promise<CharactersApiResponse> => {
  const response = await axios.get<CharactersApiResponse>(
    "https://gateway.marvel.com:443/v1/public/characters",
    {
      params: {
        ts,
        apikey: process.env.REACT_APP_PUBLIC_KEY,
        hash,
        limit,
        offset,
        ...(searchQuery && { nameStartsWith: searchQuery }),
        ...(orderBy && { orderBy }),
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Erro ao buscar personagens");
  }

  return response.data;
};
