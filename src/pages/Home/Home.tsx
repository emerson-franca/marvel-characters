import { Card } from "../../components";
import Logo from "../../assets/logo.svg";
import "./Home.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useMarvelCharacters } from "../../hooks/";

export const Home = () => {
  const { characters, handleSearch, isLoading } = useMarvelCharacters();

  return (
    <div className="home">
      <section className="home__header">
        <img src={Logo} alt="marvel logo" />
        <h1>EXPLORE O UNIVERSO</h1>
        <h6>
          Mergulhe no domínio deslumbrante de todos os personagens clássicos que
          você ama - e aqueles que você descobrirá em breve!
        </h6>
      </section>

      <SearchBar onSearch={handleSearch} />

      <section className="home__content">
        {isLoading && (
          <div className="home__loading__container">
            <span className="home__loading"></span>
          </div>
        )}

        <div className="home__content__grid">
          {characters.map((character) => (
            <Card key={character.id} {...character} />
          ))}
        </div>
      </section>
    </div>
  );
};
