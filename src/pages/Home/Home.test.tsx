import { render, screen, fireEvent } from "@testing-library/react";
import { Home } from "./Home";
import { useMarvelCharacters, useFavorites } from "../../hooks/";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../hooks/", () => ({
  useMarvelCharacters: jest.fn(),
  useFavorites: jest.fn(),
}));

jest.mock("../../assets/logo.svg", () => ({
  ReactComponent: () => <div data-testid="logo-svg" />,
}));

jest.mock("../../assets/favorito_01.svg", () => ({
  ReactComponent: () => <div data-testid="favorite-on-svg" />,
}));

jest.mock("../../assets/favorito_02.svg", () => ({
  ReactComponent: () => <div data-testid="favorite-off-svg" />,
}));

jest.mock("../../assets/ic_heroi.svg", () => ({
  ReactComponent: () => <div data-testid="hero-icon-svg" />,
}));

const mockMarvelCharacters = {
  characters: [
    {
      id: 1,
      name: "Spider-Man",
      description: "Hero",
      thumbnail: { path: "spiderman", extension: "jpg" },
    },
    {
      id: 2,
      name: "Hulk",
      description: "Hero",
      thumbnail: { path: "hulk", extension: "jpg" },
    },
  ],
  handleSearch: jest.fn(),
  isLoading: false,
  handlePageChange: jest.fn(),
  page: 1,
  totalPages: 1,
  handleOrderChange: jest.fn(),
  orderBy: "name",
  totalCharacters: 1,
  setSearchQuery: jest.fn(),
};

const mockFavorites = {
  isFavorite: jest.fn(),
  favorites: [],
  toggleFavorite: jest.fn(),
};

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useMarvelCharacters as jest.Mock).mockReturnValue(mockMarvelCharacters);
    (useFavorites as jest.Mock).mockReturnValue(mockFavorites);
  });

  const renderWithRouter = (component: React.ReactNode) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it("renders without crashing", () => {
    renderWithRouter(<Home />);
    expect(screen.getByText("Spider-Man")).toBeInTheDocument();
  });

  it("renders header correctly", () => {
    renderWithRouter(<Home />);
    expect(screen.getByText("EXPLORE O UNIVERSO")).toBeInTheDocument();
    expect(
      screen.getByText(/Mergulhe no domínio deslumbrante/i)
    ).toBeInTheDocument();
  });

  it("renders the SearchBar", () => {
    renderWithRouter(<Home />);
    expect(
      screen.getByPlaceholderText("Procure por heróis")
    ).toBeInTheDocument();
  });

  it("renders characters", () => {
    renderWithRouter(<Home />);
    expect(screen.getByText("Spider-Man")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    (useMarvelCharacters as jest.Mock).mockReturnValueOnce({
      characters: [],
      handleSearch: jest.fn(),
      isLoading: true,
      handlePageChange: jest.fn(),
      page: 1,
      totalPages: 1,
      handleOrderChange: jest.fn(),
      orderBy: "name",
      totalCharacters: 1,
      setSearchQuery: jest.fn(),
    });

    renderWithRouter(<Home />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("filters only favorites", () => {
    (useFavorites as jest.Mock).mockReturnValueOnce({
      isFavorite: jest.fn((id) => id === 1),
      favorites: [
        {
          id: 2,
          name: "Hulk",
          description: "Hero",
          thumbnail: { path: "hulk", extension: "jpg" },
        },
      ],
      toggleFavorite: jest.fn(),
    });

    renderWithRouter(<Home />);
    const favoriteButton = screen.getByLabelText("Aplicar filtro de favoritos");
    fireEvent.click(favoriteButton);
    expect(screen.getByText("Hulk")).toBeInTheDocument();
  });
});
