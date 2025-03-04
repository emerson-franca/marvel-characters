import { FC } from "react";
import { ReactComponent as FavoriteOff } from "../../assets/favorito_02.svg";
import { ReactComponent as FavoriteOn } from "../../assets/favorito_01.svg";
import "./Card.css";
import { Character } from "@/types/character";
import { useFavorites } from "../../hooks";
import { useNavigate } from "react-router-dom";

type CardProps = {
  favorite?: boolean;
  character: Character;
};

export const Card: FC<CardProps> = ({ character, favorite }) => {
  const { id, name, thumbnail } = character;
  const { toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/character/${id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(character);
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <div
        role="img"
        className="card__overlay"
        style={{
          backgroundImage: `url(${thumbnail.path}.${thumbnail.extension})`,
        }}
      ></div>
      <div className="card__content">
        <h1 className="card__title">{name}</h1>
        <button
          className="card__content__favorite"
          onClick={handleFavoriteClick}
        >
          {favorite ? (
            <FavoriteOn data-testid="favorite-on" />
          ) : (
            <FavoriteOff data-testid="favorite-off" />
          )}
        </button>
      </div>
    </div>
  );
};
