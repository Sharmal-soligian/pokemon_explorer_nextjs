import React from "react";

const SearchComponent = ({
  setPokemonSearchTerm,
}: {
  setPokemonSearchTerm: (pokemonSearchTerm: string) => void;
}) => {
  return (
    <input
      type="search"
      className="border p-2 rounded outline-pokemon-blue text-pokemon-red"
      placeholder="Enter pokemon name"
      onChange={(e) => setPokemonSearchTerm(e.target.value)}
    />
  );
};

export default SearchComponent;
