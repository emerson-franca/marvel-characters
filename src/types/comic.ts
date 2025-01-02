export type Comic = {
  thumbnail: {
    path: string;
    extension: string;
  };
  title: string;
};

export type ComicApiResponse = {
  data: {
    results: Comic[];
  };
};
