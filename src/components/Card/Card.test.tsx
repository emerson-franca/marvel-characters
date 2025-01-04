import { render, screen, fireEvent } from "@testing-library/react";
import { Card } from "./Card";
import { useFavorites } from "../../hooks";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../hooks", () => ({
  useFavorites: jest.fn(),
}));

jest.mock("../../assets/favorito_01.svg", () => ({
  ReactComponent: (props: { "data-testid"?: string }) => (
    <svg {...props} data-testid={props["data-testid"] || "favorite-on"} />
  ),
}));

jest.mock("../../assets/favorito_02.svg", () => ({
  ReactComponent: (props: { "data-testid"?: string }) => (
    <svg {...props} data-testid={props["data-testid"] || "favorite-off"} />
  ),
}));

const mockFavorites = {
  toggleFavorite: jest.fn(),
};

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const character = {
  id: 1,
  comics: {
    available: 1,
  },
  events: {
    available: 1,
  },
  description: "Hero",
  name: "Spider-Man",
  thumbnail: {
    path: "spiderman",
    extension: "jpg",
  },
};

describe("Card Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFavorites as jest.Mock).mockReturnValue(mockFavorites);
  });

  const renderWithRouter = (component: React.ReactNode) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it("renders the card with correct background content", () => {
    renderWithRouter(<Card character={character} favorite={false} />);

    const img = screen.getByRole("img");
    expect(img).toHaveStyle(
      `background-image: url(${character.thumbnail.path}.${character.thumbnail.extension})`
    );
    expect(screen.getByTestId("favorite-off")).toBeInTheDocument();
  });

  it("navigates to character details page on card click", () => {
    renderWithRouter(<Card character={character} favorite={false} />);

    fireEvent.click(screen.getByText("Spider-Man"));
    expect(mockNavigate).toHaveBeenCalledWith("/character/1");
  });

  it("toggles favorite when favorite button is clicked", () => {
    renderWithRouter(<Card character={character} />);

    const favoriteButton = screen.getByRole("button");
    fireEvent.click(favoriteButton);

    expect(mockFavorites.toggleFavorite).toHaveBeenCalledWith(character);
  });

  it("prevents navigation when favorite button is clicked", () => {
    renderWithRouter(<Card character={character} />);

    const favoriteButton = screen.getByRole("button");
    fireEvent.click(favoriteButton);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("renders favorite icon when character is favorite", () => {
    renderWithRouter(<Card character={character} favorite />);

    expect(screen.getByTestId("favorite-on")).toBeInTheDocument();
  });
});
