import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "./Pagination";

describe("Pagination Component", () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders pagination buttons correctly", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("1")).toHaveClass("active");
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("disables first and previous buttons on first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("<<")).toBeDisabled();
    expect(screen.getByText("<")).toBeDisabled();
    expect(screen.getByText(">")).not.toBeDisabled();
    expect(screen.getByText("Última")).not.toBeDisabled();
  });

  it("disables next and last buttons on last page", () => {
    render(
      <Pagination
        currentPage={10}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("<<")).not.toBeDisabled();
    expect(screen.getByText("<")).not.toBeDisabled();
    expect(screen.getByText(">")).toBeDisabled();
    expect(screen.getByText("Última")).toBeDisabled();
  });

  it("calls onPageChange with correct page number when buttons are clicked", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByText(">"));
    expect(mockOnPageChange).toHaveBeenCalledWith(6);

    fireEvent.click(screen.getByText("<"));
    expect(mockOnPageChange).toHaveBeenCalledWith(4);

    fireEvent.click(screen.getByText("<<"));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText("Última"));
    expect(mockOnPageChange).toHaveBeenCalledWith(10);
  });

  it("shows correct page range when in middle of pagination", () => {
    render(
      <Pagination
        currentPage={7}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText("7")).toHaveClass("active");
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("9")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });
});
