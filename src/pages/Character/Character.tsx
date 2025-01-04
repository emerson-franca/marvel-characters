import { Link, useParams } from "react-router-dom";
import Logo from "../../assets/logo_menor.svg";
import "./Character.css";
import {
  useCharacterDetails,
  useFavorites,
  useCharacterComics,
} from "../../hooks";
import { ReactComponent as FavoriteOff } from "../../assets/favorito_02.svg";
import { ReactComponent as FavoriteOn } from "../../assets/favorito_01.svg";
import { ReactComponent as Comics } from "./assets/ic_quadrinhos.svg";
import { ReactComponent as Trailer } from "./assets/ic_trailer.svg";
import { Footer } from "../../components";

export const Character = () => {
  const { id } = useParams<{ id: string }>();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { character } = useCharacterDetails(id!);
  const { comics, isLoading: isLoadingComics } = useCharacterComics(id!);

  return (
    <div className="character">
      <header className="character__header">
        <div>
          <Link to="/">
            <img src={Logo} alt="Marvel logo" />
          </Link>
          {/* <SearchBar variant="small" onSearch={() => {}} /> */}
        </div>
      </header>

      <main className="character__content">
        {character && (
          <>
            <div className="character__content__wrapper">
              <article className="character__details">
                <header className="character__infos__header">
                  <div className="character__infos__header__wrapper">
                    <h1>{character.name}</h1>
                    <button
                      className="character__infos__favorite"
                      onClick={() => toggleFavorite(character)}
                      aria-label={`${
                        isFavorite(character.id) ? "Remover" : "Adicionar"
                      } ${character.name} aos favoritos`}
                    >
                      {isFavorite(character.id) ? (
                        <FavoriteOn />
                      ) : (
                        <FavoriteOff />
                      )}
                    </button>
                  </div>
                  <p>{character.description || "Sem descrição disponível."}</p>
                </header>

                <section className="character__stats">
                  <div className="character__stat">
                    <h3>Quadrinhos</h3>
                    <div className="character__stat__content">
                      <Comics />
                      <p>{character.comics.available}</p>
                    </div>
                  </div>

                  <div className="character__stat">
                    <h3>Filmes</h3>
                    <div className="character__stat__content">
                      <Trailer />
                      <p>{character.events.available}</p>
                    </div>
                  </div>
                </section>
              </article>
              <figure className="character__image">
                <img
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={`Imagem de ${character.name}`}
                />
              </figure>
            </div>
            <article className="character__comics">
              {isLoadingComics ? (
                <div className="character__comics__loading">
                  <span className="loading" />
                </div>
              ) : (
                <>
                  <h2>Últimos lançamentos</h2>
                  <div className="character__comics__list">
                    {comics?.map((comic) => (
                      <figure key={comic.title}>
                        <img
                          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                          alt={`Capa de ${comic.title}`}
                        />
                        <figcaption>{comic.title}</figcaption>
                      </figure>
                    ))}
                  </div>
                </>
              )}
            </article>
            <Footer />
          </>
        )}
      </main>
    </div>
  );
};
