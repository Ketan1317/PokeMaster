import React, { useState } from "react";
import { GiBodyHeight } from "react-icons/gi";
import { FaWeightHanging } from "react-icons/fa";
import { GrVulnerability } from "react-icons/gr";

const Card = ({ info, favourites, setFavourites }) => {
  const [pingEffect, setPingEffect] = useState(false);
  const [bounce, setBounce] = useState(false);

  const speedStat =
    info.data.stats.find((stat) => stat.stat.name === "speed")?.base_stat || 0;
  const attackStat =
    info.data.stats.find((stat) => stat.stat.name === "attack")?.base_stat || 0;
  const defenceStat =
    info.data.stats.find((stat) => stat.stat.name === "defense")?.base_stat || 0;

  const isFav = () => favourites.some((fav) => fav.data.name === info.data.name);

  const handleFav = () => {
    if (isFav()) {
      const newFavs = favourites.filter(
        (item) => item.data.name !== info.data.name
      );
      setBounce(true);
      setTimeout(() => setBounce(false), 500);
      setFavourites(newFavs);
    } else {
      setFavourites([...favourites, info]);
      setPingEffect(true);
      setTimeout(() => setPingEffect(false), 500);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 group">
      <div
        className={`relative w-80 h-[460px] rounded-3xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-md bg-white/10 text-white transform transition-all duration-500 hover:scale-105 hover:shadow-cyan-500/40 ${
          bounce ? "animate-bounce" : ""
        } ${pingEffect ? "animate-ping" : ""}`}
      >
        {/* Pokémon Image Section */}
        <div className="h-40 bg-gradient-to-r from-zinc-900 via-gray-800 to-gray-700 flex items-center justify-center rounded-t-3xl">
          <img
            src={info.data.sprites.other.dream_world.front_default}
            alt="Pokémon"
            className="w-28 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Pokémon Info */}
        <div className="p-5 flex flex-col items-center">
          <h1 className="text-2xl capitalize font-bold text-cyan-300 drop-shadow-sm">
            {info.data.name}
          </h1>

          <div className="flex gap-3 mt-4">
            <div className="flex items-center gap-2 bg-gradient-to-r from-cyan-700 to-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              <GiBodyHeight size={18} className="text-amber-300" />
              <span>Height: {info.data.height}</span>
            </div>

            <div className="flex items-center gap-2 bg-gradient-to-r from-cyan-700 to-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              <FaWeightHanging size={18} className="text-amber-300" />
              <span>Weight: {info.data.weight}</span>
            </div>
          </div>

          <p className="mt-4 text-base text-gray-200 font-medium">
            Type:{" "}
            <span className="text-cyan-400 font-semibold">
              {info.data.types.map((t) => t.type.name).join(", ")}
            </span>
          </p>

          {/* Divider */}
          <div className="w-full h-[1px] bg-white/20 my-4"></div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-3 text-center w-full">
            <div className="bg-white/10 rounded-xl p-2 backdrop-blur-md">
              <h2 className="text-sm font-semibold text-gray-300">Speed</h2>
              <p className="text-lg font-bold text-cyan-400">{speedStat}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-2 backdrop-blur-md">
              <h2 className="text-sm font-semibold text-gray-300">Attack</h2>
              <p className="text-lg font-bold text-cyan-400">{attackStat}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-2 backdrop-blur-md">
              <h2 className="text-sm font-semibold text-gray-300">Defense</h2>
              <p className="text-lg font-bold text-cyan-400">{defenceStat}</p>
            </div>
          </div>

          {/* Abilities */}
          <div className="mt-5 bg-gradient-to-r from-amber-600 to-amber-700 px-4 py-2 rounded-xl flex items-center gap-2">
            <GrVulnerability className="text-yellow-300" />
            <span className="text-sm font-medium">
              {info.data.abilities.map((a) => a.ability.name).join(", ")}
            </span>
          </div>

          {/* XP */}
          <p className="mt-3 text-gray-200 text-sm font-semibold">
            Base XP: <span className="text-cyan-400">{info.data.base_experience}</span>
          </p>
        </div>
      </div>

      {/* Favourite Button */}
      <button
        onClick={handleFav}
        className={`mt-5 px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg ${
          isFav()
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-red-500 hover:bg-red-600 text-white"
        }`}
      >
        {isFav() ? "Remove from Favourites" : "Add to Favourites"}
      </button>
    </div>
  );
};

export default Card;
