export type Character = {
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
};

export type CharactersApiResponse = {
  data: {
    results: Character[];
  };
};
