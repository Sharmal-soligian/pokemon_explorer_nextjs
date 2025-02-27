import Link from "next/link";
import Pagination from "./Pagination";
import PagesToDisplayComponent from "./PagesToDisplayComponent";
import SearchComponent from "./SearchComponent";

interface Pokemon {
  name: string;
  url: string;
}

const CardComponent = ({
  data,
  limit,
  setLimit,
  offset,
  setOffset,
  total,
  pokemonSearchTerm,
  setPokemonSearchTerm,
  isLoading,
}: {
  data: Pokemon[];
  limit: number;
  setLimit: (value: number) => void;
  offset: number;
  setOffset: (value: number) => void;
  total: number;
  pokemonSearchTerm: string;
  setPokemonSearchTerm: (pokemonSearchTerm: string) => void;
  isLoading: boolean;
}) => {
  return (
    <section
      className="
      bg-gradient-to-r from-pokemon-red to-pokemon-blue shadow-lg rounded-lg p-6 w-full max-w-2xl mx-auto min-h-[650px] max-h-[650px] overflow-y-auto [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-gray-300
      dark:[&::-webkit-scrollbar-track]:bg-pokemon-blue
      dark:[&::-webkit-scrollbar-thumb]:bg-pokemon-blue"
    >
      <article className="flex flex-col sm:flex-row justify-between items-center">
        <SearchComponent setPokemonSearchTerm={setPokemonSearchTerm} />

        <div className="flex justify-end w-full sm:w-auto self-end sm:self-auto mt-2 sm:mt-0">
          <PagesToDisplayComponent
            limit={limit}
            setLimit={setLimit}
            setOffset={setOffset}
          />
        </div>
      </article>

      {/* POKEMON LISTS */}
      {!isLoading ? (
        <ul className="divide-y divide-gray-300">
          {data?.length ? (
            <>
              {data.map((pokemon, index) => {
                const pokemonId = pokemon.url
                  ?.replace(`https://pokeapi.co/api/v2/pokemon/`, "")
                  ?.replace("/", "");
                return (
                  <li
                    key={index}
                    className="flex flex-col xs:flex-row justify-between items-center py-3 text-lg text-pokemon-white font-medium"
                  >
                    <span className="w-1/4 text-center">#{index + 1}</span>
                    <span className="flex-1 capitalize">{pokemon.name}</span>
                    <Link
                      href={`/pokemon/${pokemonId}`}
                      className="text-pokemon-yellow hover:underline"
                      title={`View details of ${pokemon.name}`}
                    >
                      View Details...
                    </Link>
                  </li>
                );
              })}
            </>
          ) : (
            <p className="text-center text-pokemon-white">No search result</p>
          )}
        </ul>
      ) : (
        <p className="text-center text-pokemon-white">Loading...</p>
      )}

      {/* PAGINATION */}
      {!isLoading && data?.length > 0 && !pokemonSearchTerm && (
        <div className="mt-6 flex justify-center">
          <Pagination
            limit={limit}
            setLimit={setLimit}
            offset={offset}
            setOffset={setOffset}
            total={total}
          />
        </div>
      )}
    </section>
  );
};

export default CardComponent;
