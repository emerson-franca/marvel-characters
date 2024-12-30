import { FC } from "react";
import { ReactComponent as FavoriteIcon } from "./assets/favorito_02.svg";
import "./Card.css";
import { Character } from "@/types/character";

export const Card: FC<Character> = ({ id, name, thumbnail }) => {
  return (
    <div className="card" key={id}>
      <img
        className="card__image"
        src={`${thumbnail.path}.${thumbnail.extension}`}
        alt={name}
      />
      <div className="card__content">
        <h1 className="card__title">{name}</h1>
        <FavoriteIcon />
      </div>
    </div>
  );
};
