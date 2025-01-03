import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "./SearchBar";

jest.mock("./assets/ic_busca.svg", () => ({
  ReactComponent: (props: { "data-testid"?: string }) => (
    <svg {...props} data-testid={props["data-testid"] || "search-icon"} />
  ),
}));

jest.mock("./assets/ic_busca_menor.svg", () => ({
  ReactComponent: (props: { "data-testid"?: string }) => (
    <svg {...props} data-testid={props["data-testid"] || "search-icon-small"} />
  ),
}));

describe("SearchBar Component", () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders default search bar correctly", () => {
    render(<SearchBar onSearch={mockOnSearch} variant="default" />);
    expect(
      screen.getByPlaceholderText("Procure por heróis")
    ).toBeInTheDocument();
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });

  it("renders small variant search bar correctly", () => {
    render(<SearchBar onSearch={mockOnSearch} variant="small" />);
    expect(screen.getByTestId("search-icon-small")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Procure por heróis")).toHaveClass(
      "search__input--small"
    );
  });

  it("calls onSearch when user types", async () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText("Procure por heróis");

    fireEvent.change(input, { target: { value: "Spider" } });

    expect(mockOnSearch).toHaveBeenCalledWith("Spider");
  });

  it("calls onSearch when form is submitted", async () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText("Procure por heróis");

    await fireEvent.change(input, { target: { value: "Iron Man" } });
    await fireEvent.submit(input);

    expect(mockOnSearch).toHaveBeenCalledWith("Iron Man");
  });

  it("focuses input when container is clicked", async () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText("Procure por heróis");
    const container = screen.getByRole("search");

    await fireEvent.click(container);

    expect(input).toHaveFocus();
  });
});
