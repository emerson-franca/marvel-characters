import { render, screen, fireEvent } from "@testing-library/react";
import { Toggle } from "./Toggle";

describe("Toggle Component", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders toggle in off state", () => {
    render(<Toggle isOn={false} onClick={mockOnClick} />);
    const toggleElement = screen.getByRole("presentation");
    expect(toggleElement).toBeInTheDocument();

    const circleGroup = screen.getByTestId("circle");
    expect(circleGroup?.getAttribute("transform")).toBe("translate(2, 0)");
  });

  it("renders toggle in on state", () => {
    render(<Toggle isOn={true} onClick={mockOnClick} />);
    const circleGroup = screen.getByTestId("circle");
    expect(circleGroup?.getAttribute("transform")).toBe("translate(-40, 0)");
  });

  it("calls onClick when toggle is clicked", () => {
    render(<Toggle isOn={false} onClick={mockOnClick} />);
    const toggleElement = screen.getByRole("presentation");

    fireEvent.click(toggleElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("has correct cursor style", () => {
    render(<Toggle isOn={false} onClick={mockOnClick} />);
    const toggleElement = screen.getByRole("presentation");

    expect(toggleElement).toHaveStyle({ cursor: "pointer" });
  });
});
