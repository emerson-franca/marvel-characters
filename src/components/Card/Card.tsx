import { FC } from "react";
import { ReactComponent as FavoriteOff } from "../../assets/favorito_02.svg";
import { ReactComponent as FavoriteOn } from "../../assets/favorito_01.svg";
import "./Card.css";
import { Character } from "@/types/character";
import { useFavorites } from "../../hooks";

type CardProps = {
  favorite?: boolean;
} & Character;

export const Card: FC<CardProps> = ({ id, name, thumbnail, favorite }) => {
  const { toggleFavorite } = useFavorites();

  return (
    <div className="card" key={id}>
      <img
        className="card__image"
        src={`${thumbnail.path}.${thumbnail.extension}`}
        alt={name}
      />
      <div className="card__content">
        <h1 className="card__title">{name}</h1>
        <div onClick={() => toggleFavorite(id)}>
          {favorite ? <FavoriteOn /> : <FavoriteOff />}
        </div>
      </div>
    </div>
  );
};
