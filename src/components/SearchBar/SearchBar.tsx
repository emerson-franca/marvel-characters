import { createRef, FC, useState } from "react";
import { ReactComponent as SearchIcon } from "./assets/ic_busca.svg";
import { ReactComponent as SearchIconSmall } from "./assets/ic_busca_menor.svg";
import "./SearchBar.css";

interface SearchBarProps {
  variant?: "default" | "small";
  onSearch: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch, variant }) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = createRef<HTMLInputElement>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    onSearch(value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form
      onClick={() => {
        inputRef.current?.focus();
      }}
      className="search"
      onSubmit={handleSubmit}
    >
      <div
        className={
          variant === "small"
            ? "search__container search__container--small"
            : "search__container search__container--default"
        }
      >
        {variant === "small" ? (
          <SearchIconSmall className="search__icon" />
        ) : (
          <SearchIcon className="search__icon" />
        )}

        <input
          ref={inputRef}
          type="text"
          className={
            variant === "small"
              ? "search__input search__input--small"
              : "search__input search__input--default"
          }
          placeholder="Procure por heróis"
          value={inputValue}
          onChange={handleChange}
          aria-label="Search"
        />
      </div>
    </form>
  );
};

export default SearchBar;
