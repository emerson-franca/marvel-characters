import { Card, Footer, Pagination, Toggle } from "../../components";
import Logo from "../../assets/logo.svg";
import "./Home.css";
import SearchBar from "../../components/SearchBar/SearchBar";
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
    handleSearch,
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

  const filteredCharacters = showOnlyFavorites ? favorites : characters;

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
        {isLoading ? (
          <div className="home__loading__container">
            <span className="home__loading"></span>
          </div>
        ) : (
          <>
            <div className="home__content__info">
              <p>
                Encontrados{" "}
                {showOnlyFavorites ? favorites.length : characters.length}{" "}
                heróis
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
                    <button className="home__content__filters__wrapper__favorite">
                      <FavoriteOn onClick={handleFavorites} />
                    </button>
                  ) : (
                    <button className="home__content__filters__wrapper__favorite">
                      <FavoriteOff onClick={handleFavorites} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="home__content__grid">
              {filteredCharacters.map((character) => (
                <Card
                  key={character.id}
                  {...character}
                  favorite={isFavorite(character.id)}
                />
              ))}
            </div>

            {!showOnlyFavorites && (
              <Pagination
                currentPage={page}
                onPageChange={handlePageChange}
                totalPages={totalPages}
              />
            )}
          </>
        )}
      </section>
      <Footer />
    </div>
  );
};
