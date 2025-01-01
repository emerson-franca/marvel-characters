import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { UseMarvelCharactersReturn } from "@/types/character";
import { fetchMarvelCharacters } from "../api/characters";

export const useMarvelCharacters = (): UseMarvelCharactersReturn => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [orderBy, setOrderBy] = useState<"name" | "-name">("name");

  const limit = 20;
  const offset = (page - 1) * limit;

  const {
    data: characters = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["characters", searchQuery, page, orderBy],
    queryFn: async () => {
      const { data } = await fetchMarvelCharacters({
        searchQuery,
        limit,
        offset,
        orderBy,
      });
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

  const handleOrderChange = (newOrderBy: "name" | "-name") => {
    setOrderBy(newOrderBy);
    setPage(1);
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
    handleOrderChange,
    orderBy,
  };
};
