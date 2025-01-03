import { renderHook, act } from "@testing-library/react";
import { useMarvelCharacters } from "../hooks/useMarvelCharacters";
import { fetchMarvelCharacters } from "../api/characters";
import "@testing-library/jest-dom";
import {
  queryClient,
  ReactQueryWrapper as wrapper,
} from "../config/ReactQuery";

jest.mock("../api/characters", () => ({
  fetchMarvelCharacters: jest.fn(),
}));

describe("useMarvelCharacters", () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useMarvelCharacters(), {
      wrapper,
    });

    expect(result.current.characters).toEqual([]);
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.error).toBeNull();
    expect(result.current.page).toBe(1);
    expect(result.current.orderBy).toBe("name");
  });

  it("should fetch characters successfully", async () => {
    const mockData = {
      data: {
        results: [{ id: 1, name: "Spider-Man" }],
        total: 1,
      },
    };

    (fetchMarvelCharacters as jest.Mock).mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useMarvelCharacters(), {
      wrapper,
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.characters).toEqual(mockData.data.results);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBeFalsy();
  });

  it("should handle search query changes", async () => {
    const { result } = renderHook(() => useMarvelCharacters(), {
      wrapper,
    });

    act(() => {
      result.current.handleSearch("Spider");
    });

    expect(result.current.page).toBe(1);
    expect(fetchMarvelCharacters).toHaveBeenCalledWith(
      expect.objectContaining({
        searchQuery: "Spider",
        offset: 0,
      })
    );
  });

  it("should handle page changes", async () => {
    const { result } = renderHook(() => useMarvelCharacters(), {
      wrapper,
    });

    act(() => {
      result.current.handlePageChange(2);
    });

    expect(result.current.page).toBe(2);
    expect(fetchMarvelCharacters).toHaveBeenCalledWith(
      expect.objectContaining({
        offset: 20,
      })
    );
  });

  it("should handle order changes", async () => {
    const { result } = renderHook(() => useMarvelCharacters(), {
      wrapper,
    });

    act(() => {
      result.current.handleOrderChange("-name");
    });

    expect(result.current.orderBy).toBe("-name");
    expect(result.current.page).toBe(1);
    expect(fetchMarvelCharacters).toHaveBeenCalledWith(
      expect.objectContaining({
        orderBy: "-name",
        offset: 0,
      })
    );
  });

  it("should calculate total pages correctly", async () => {
    const mockData = {
      data: {
        results: Array(20).fill({ id: 1, name: "Character" }),
        total: 50,
      },
    };

    (fetchMarvelCharacters as jest.Mock).mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useMarvelCharacters(), {
      wrapper,
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.totalPages).toBe(3);
  });
});
