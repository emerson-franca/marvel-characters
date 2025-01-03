import { Card, Footer, Pagination, Toggle, SearchBar } from "../../components";
import Logo from "../../assets/logo.svg";
import "./Home.css";
import { useMarvelCharacters, useFavorites } from "../../hooks/";
import { useState } from "react";
import { ReactComponent as FavoriteOn } from "../../assets/favorito_01.svg";
import { ReactComponent as FavoriteOff } from "../../assets/favorito_02.svg";
import { ReactComponent as HeroIcon } from "../../assets/ic_heroi.svg";

export const Home = () => {
  const { isFavorite, favorites } = useFavorites();
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const {
    characters,
    handleSearch: searchFn,
    isLoading,
    handlePageChange,
    page,
    totalPages,
    handleOrderChange,
    orderBy,
  } = useMarvelCharacters();

  const handleFavorites = () => {
    setShowOnlyFavorites(!showOnlyFavorites);
  };

  const handleSearch = (query: string) => {
    setShowOnlyFavorites(false);
    searchFn(query);
  };

  const filteredCharacters = showOnlyFavorites ? favorites : characters;

  return (
    <div className="home">
      <header className="home__header">
        <img src={Logo} alt="marvel logo" />
        <h1>EXPLORE O UNIVERSO</h1>
        <p>
          Mergulhe no domínio deslumbrante de todos os personagens clássicos que
          você ama - e aqueles que você descobrirá em breve!
        </p>
      </header>

      <SearchBar onSearch={handleSearch} variant="default" />

      <main className="home__content">
        <section className="home__content__info">
          <p>
            Encontrados{" "}
            {showOnlyFavorites ? favorites.length : characters.length} heróis
          </p>

          <div className="home__content__filters">
            <div className="home__content__filters__wrapper">
              <HeroIcon />
              <span>Ordenar por nome - A/Z</span>
              {orderBy === "name" ? (
                <Toggle isOn onClick={() => handleOrderChange("-name")} />
              ) : (
                <Toggle
                  isOn={false}
                  onClick={() => handleOrderChange("name")}
                />
              )}
            </div>

            <div className="home__content__filters__wrapper">
              <p>Somente favoritos</p>
              {showOnlyFavorites ? (
                <button
                  className="home__content__filters__wrapper__favorite"
                  aria-label="Remover filtro de favoritos"
                >
                  <FavoriteOn onClick={handleFavorites} />
                </button>
              ) : (
                <button
                  className="home__content__filters__wrapper__favorite"
                  aria-label="Aplicar filtro de favoritos"
                >
                  <FavoriteOff onClick={handleFavorites} />
                </button>
              )}
            </div>
          </div>
        </section>

        {isLoading ? (
          <div className="home__loading__container" role="status">
            <span className="loading" />
          </div>
        ) : (
          <>
            <section
              className="home__content__grid"
              aria-label="Lista de personagens"
            >
              {filteredCharacters.map((character) => (
                <Card
                  key={character.id}
                  character={character}
                  favorite={isFavorite(character.id)}
                />
              ))}
            </section>

            {!showOnlyFavorites && (
              <nav aria-label="Paginação">
                <Pagination
                  currentPage={page}
                  onPageChange={handlePageChange}
                  totalPages={totalPages}
                />
              </nav>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};
