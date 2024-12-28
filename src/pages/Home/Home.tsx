import axios from "axios";
import { useEffect, useState } from "react";
import MD5 from "crypto-js/md5";
import { Character, CharacterResponse } from "./types";
import { Card } from "../../components";
import Logo from "../../assets/logo.svg";
import "./Home.css";

export const Home = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const ts = new Date().getTime().toString();
  const hash = MD5(
    ts + process.env.REACT_APP_PRIVATE_KEY + process.env.REACT_APP_PUBLIC_KEY
  ).toString();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get<CharacterResponse>(
          `https://gateway.marvel.com:443/v1/public/characters`,
          {
            params: {
              ts,
              apikey: process.env.REACT_APP_PUBLIC_KEY,
              hash,
              limit: 20,
            },
          }
        );
        setCharacters(response.data.data.results);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      <section className="home__content">
        <div className="home__content__grid">
          {characters.map((character) => (
            <Card key={character.id} {...character} />
          ))}
        </div>
      </section>
    </div>
  );
};
