"use client";

import { getPokemonById } from "@/services/pokemonServices";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface PokemonData {
  name: string;
  height: number;
  weight: number;
  abilities: {
    ability: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    stat: {
      name: string;
    };
  }[];
  moves: {
    move: {
      name: string;
    };
  }[];
  sprites: {
    front_shiny: string;
  };
}

const Pokemon = () => {
  const params = useParams();
  const router = useRouter();
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [showRemainingMoves, setShowRemainingMoves] = useState(false);

  const fetchPokemonData = useCallback(async () => {
    try {
      const res = await getPokemonById(params.id as string);
      setPokemon(res);
    } catch (error) {
      console.error(error);
    }
  }, [params.id]);

  useEffect(() => {
    fetchPokemonData();
  }, [fetchPokemonData]);

  const handleNavigate = () => {
    router.push("/");
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pokemon-blue to-pokemon-red p5">
      <div className="bg-white/20 backdrop-blur-lg shadow-lg rounded-2xl p-6 max-w-lg w-full text-center">
        {pokemon ? (
          <>
            <div className="flex justify-start text-3xl">
              <p className="cursor-pointer" onClick={handleNavigate}>
                ←
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src={pokemon?.sprites?.front_shiny ?? "/images/pokemon.svg"}
                alt={pokemon?.name}
                width={140}
                height={140}
                className="rounded-full border-4 border-pokemon-white shadow-md pointer-events-none"
                unoptimized
              />
            </div>

            <h2 className="text-2xl font-extrabold text-pokemon-white mt-4 capitalize">
              {pokemon.name}
            </h2>

            {/* POKEMON OTHER DETAILS */}
            <div className="bg-pokemon-blue/10 mt-4 rounded-lg p-4 text-pokemon-white text-left">
              <p>
                <strong>Height:</strong> {pokemon?.height}
              </p>
              <p>
                <strong>Weight:</strong> {pokemon?.weight}
              </p>
              <p className="capitalize">
                <strong>Abilities:</strong>&nbsp;
                {pokemon?.abilities
                  ?.map((ability) => ability?.ability?.name)
                  ?.join(", ")}
              </p>
              <p className="capitalize">
                <strong>Type:</strong>&nbsp;
                {pokemon?.types?.map((type) => type?.type?.name)?.join(", ")}
              </p>
              <p className="capitalize">
                <strong>Stats:</strong>&nbsp;
                {pokemon?.stats?.map((stat) => stat?.stat?.name)?.join(", ")}
              </p>
              <p className="capitalize">
                <strong>Moves:</strong>&nbsp;
                {pokemon?.moves
                  ?.slice(0, showRemainingMoves ? pokemon.moves.length : 8)
                  ?.map((move) => move?.move?.name)
                  ?.join(", ")}
                {pokemon?.moves?.length > 8 && (
                  <span
                    className="text-pokemon-yellow underline cursor-pointer ml-1"
                    onClick={() => setShowRemainingMoves(!showRemainingMoves)}
                  >
                    {showRemainingMoves ? "Show less..." : "Show more..."}
                  </span>
                )}
              </p>
            </div>
          </>
        ) : (
          <p className="text-pokemon-white">Loading...</p>
        )}
      </div>
    </section>
  );
};

export default Pokemon;
