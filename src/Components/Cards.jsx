import React, { useEffect, useState } from "react";
import Card from "./Card";
import GlobalAPI from "./../Constant/GlobalAPI";
import { TbPokeball } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";

const Cards = ({ favourites, search, setFavourites }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await GlobalAPI.getData();

      const pokemonDetails = await Promise.all(
        res.data.results.map(async (pokemon) => {
          return await GlobalAPI.getFinal(pokemon.url);
        })
      );

      setData(pokemonDetails);
    } catch (err) {
      console.error("Failed to fetch Pokémon data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((pokemon) =>
    pokemon.data.name.toLowerCase().includes(search.toLowerCase())
  );

  // Loading View
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[65vh] text-center px-4">
        <div className="relative">
          <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl animate-pulse" />
          <TbPokeball
            size={80}
            className="text-red-500 animate-spin relative z-10 duration-1000"
          />
        </div>

        <h2 className="mt-8 text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 tracking-wide">
          Loading Pokédex...
        </h2>

        <p className="text-slate-400 text-sm mt-2 font-medium">
          Catching Pokémon data from the wild...
        </p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
      {filteredData.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center min-h-[45vh] text-center bg-slate-900/40 border border-slate-800 rounded-3xl p-8 max-w-md mx-auto shadow-xl">
          <div className="p-4 rounded-full bg-slate-800/80 mb-4 border border-slate-700">
            <FaSearch className="text-slate-500 text-3xl" />
          </div>

          <h3 className="text-2xl font-black text-slate-100 tracking-wide">
            No Pokémon Found
          </h3>

          <p className="text-slate-400 text-sm mt-2">
            We couldn't find any match for "<span className="text-yellow-400">{search}</span>". Try searching for another name!
          </p>
        </div>
      ) : (
        /* Pokémon Cards Grid */
        <div className="grid gap-8 justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredData.map((pokemon) => (
            <Card
              key={pokemon.data.id}
              info={pokemon}
              favourites={favourites}
              setFavourites={setFavourites}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default Cards;