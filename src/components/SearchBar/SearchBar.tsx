import { createRef, FC, useState } from "react";
import SearchBarRed from "./assets/search_bar_vermelho.svg";
import { ReactComponent as SearchIcon } from "./assets/ic_busca.svg";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
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
      <div className="search__container">
        <SearchIcon className="search__icon" />
        <input
          ref={inputRef}
          type="text"
          className="search__input"
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
