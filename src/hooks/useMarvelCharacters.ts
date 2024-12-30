import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MD5 } from "crypto-js";
import {
  Character,
  CharactersApiResponse,
  UseMarvelCharactersReturn,
} from "@/types/character";
import axios from "axios";

const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY || "";
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY || "";

const ts = new Date().getTime().toString();
const hash = MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();

const fetchMarvelCharacters = async (
  searchQuery: string
): Promise<Character[]> => {
  const response = await axios.get<CharactersApiResponse>(
    "https://gateway.marvel.com:443/v1/public/characters",
    {
      params: {
        ts,
        apikey: process.env.REACT_APP_PUBLIC_KEY,
        hash,
        limit: 20,
        ...(searchQuery && { nameStartsWith: searchQuery }),
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Erro ao buscar personagens");
  }

  return response.data.data.results;
};

export const useMarvelCharacters = (): UseMarvelCharactersReturn => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: characters = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["characters", searchQuery],
    queryFn: () => fetchMarvelCharacters(searchQuery),
    enabled: true,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return {
    characters,
    isLoading,
    error: error as Error | null,
    handleSearch,
  };
};
