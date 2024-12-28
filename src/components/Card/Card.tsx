import { Character } from "@/pages/Home/types";
import { FC } from "react";

export const Card: FC<Character> = ({ description, id, name, thumbnail }) => {
  return (
    <div key={id}>
      <h2>{name}</h2>
      <p>{description}</p>
      <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} />
    </div>
  );
};
