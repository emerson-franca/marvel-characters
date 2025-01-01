import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCharacterById } from "../../api/character";
import Logo from "../../assets/logo_menor.svg";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Character.css";

export const Character = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: character,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["character", id],
    queryFn: async () => fetchCharacterById(id!),
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return (
      <div>
        Erro ao buscar personagem:{" "}
        {error instanceof Error ? error.message : "Erro desconhecido"}
      </div>
    );
  }

  return (
    <div>
      <section className="character__header">
        <img src={Logo} alt="marvel logo" />
        <SearchBar onSearch={() => {}} />
      </section>

      {character ? (
        <div>
          <h1>{character.name}</h1>
          <img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
          />
          <p>{character.description || "Sem descrição disponível."}</p>
        </div>
      ) : (
        <div>Personagem não encontrado</div>
      )}
    </div>
  );
};
