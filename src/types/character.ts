export type Character = {
  favorite?: boolean;
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
};

export type UseMarvelCharactersReturn = {
  characters: Character[];
  isLoading: boolean;
  error: Error | null;
  handleSearch: (query: string) => void;
  handlePageChange: (newPage: number) => void;
  page: number;
  totalPages: number;
  handleOrderChange: (newOrderBy: "name" | "-name") => void;
  orderBy: "name" | "-name";
};

export type CharactersApiResponse = {
  data: {
    results: Character[];
    total: number;
  };
};
