"use client";

import CardComponent from "@/components/CardComponent";
import { pokemonServices } from "@/services/pokemonServices";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

interface Pokemon {
  name: string;
  url: string;
}

const Home = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [pokemonSearchTerm, setPokemonSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchPokemonData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await pokemonServices(offset, limit);
      setPokemons(res?.results);
      setTotal(res?.count);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [limit, offset]);

  useEffect(() => {
    fetchPokemonData();
  }, [fetchPokemonData]);

  const filteredPokemons = useMemo(() => {
    if (!pokemonSearchTerm) {
      return pokemons;
    } else {
      return pokemons.filter((p) =>
        p.name.toLowerCase().includes(pokemonSearchTerm.toLowerCase())
      );
    }
  }, [pokemonSearchTerm, pokemons]);

  return (
    <section className="min-h-screen flex flex-col items-center p-4">
      <div className="flex items-center mb-6">
        <Image
          src={"/images/pokemon.svg"}
          width={150}
          height={150}
          alt="pokemon"
        />
        <h1 className="text-3xl md:text-5xl font-extrabold text-center text-pokemon-yellow">
          Explorer
        </h1>
      </div>

      {/* LISTS OF POKEMON */}
      <CardComponent
        data={filteredPokemons}
        limit={limit}
        setLimit={setLimit}
        offset={offset}
        setOffset={setOffset}
        total={total}
        pokemonSearchTerm={pokemonSearchTerm}
        setPokemonSearchTerm={setPokemonSearchTerm}
        isLoading={isLoading}
      />
    </section>
  );
};

export default Home;
