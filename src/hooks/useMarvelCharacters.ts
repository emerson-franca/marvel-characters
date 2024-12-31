import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MD5 } from "crypto-js";
import {
  CharactersApiResponse,
  UseMarvelCharactersReturn,
} from "@/types/character";
import axios from "axios";

const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY || "";
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY || "";

const ts = new Date().getTime().toString();
const hash = MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();

const fetchMarvelCharacters = async (
  searchQuery: string,
  limit: number,
  offset: number
): Promise<CharactersApiResponse> => {
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
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Erro ao buscar personagens");
  }

  return response.data;
};

export const useMarvelCharacters = (): UseMarvelCharactersReturn => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalCharacters, setTotalCharacters] = useState(0);

  const limit = 20;
  const offset = (page - 1) * limit;

  const {
    data: characters = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["characters", searchQuery, page],
    queryFn: async () => {
      const { data } = await fetchMarvelCharacters(searchQuery, limit, offset);
      setTotalCharacters(data.total);
      return data.results;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(totalCharacters / limit);

  return {
    characters,
    isLoading,
    error: error as Error | null,
    handleSearch,
    handlePageChange,
    page,
    totalPages,
  };
};
