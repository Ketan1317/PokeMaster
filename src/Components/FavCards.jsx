import React from 'react';
import { GiBodyHeight } from "react-icons/gi";
import { FaWeightHanging } from "react-icons/fa";
import { GrVulnerability } from "react-icons/gr";

const FavCards = ({ info }) => {
  const speedStat =
    info?.data?.stats?.find((stat) => stat.stat.name === "speed")?.base_stat || 0;
  const attackStat =
    info?.data?.stats?.find((stat) => stat.stat.name === "attack")?.base_stat || 0;
  const defenceStat =
    info?.data?.stats?.find((stat) => stat.stat.name === "defense")?.base_stat || 0;

  return (
    <div>
      <div
        className={`relative text-white border-2 border-amber-50  w-72 h-96 rounded-2xl bg-zinc-800 shadow-lg overflow-hidden`}
      >
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start p-4">
          <div className="w-full h-32 flex items-center justify-center bg-gradient-to-r from-black via-zinc-800 to-gray-500 rounded-t-2xl">
            <img
              src={info?.data?.sprites?.other?.dream_world?.front_default}
              className="w-24 animate-pulse"
              alt="Pokémon Logo"
            />
          </div>

          <h1 className="font-bold text-2xl mt-4">{info?.data?.name}</h1>

          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center bg-blue-500 px-3 py-1 rounded-full gap-2">
              <GiBodyHeight
                size={20}
                className="text-amber-500 animate-pulse"
              />
              <span className="font-semibold">Height: {info?.data?.height}</span>
            </div>
            <div className="flex items-center bg-blue-500 px-3 py-1 rounded-full gap-2">
              <FaWeightHanging
                size={20}
                className="text-amber-500 animate-pulse"
              />
              <span className="font-semibold">Weight: {info?.data?.weight}</span>
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-5">
            Type: {info?.data?.types?.map((item) => item.type.name).join(", ")}
          </h2>
        </div>

        <div className="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 bg-black bg-opacity-75 transition duration-500 ease-in-out flex flex-col items-center justify-center">
          <div className="flex items-center mt-4 justify-center gap-2 px-1 py-2 bg-amber-700 rounded-2xl">
            <GrVulnerability className="text-yellow-400" />
            <h1 className="font-semibold text-s">
              Abilities:{" "}
              {info?.data?.abilities
                ?.map((item) => item.ability.name)
                .join(", ")}
            </h1>
          </div>
          <h1 className="font-semibold text-xl mt-4">
            Experience: {info?.data?.base_experience}
          </h1>
          <div className="m-4 px-4 py-3 bg-amber-700 rounded-2xl">
            <h1 className="font-semibold text-xl mt-1">Speed: {speedStat}</h1>
            <h1 className="font-semibold text-xl mt-1">Attack: {attackStat}</h1>
            <h1 className="font-semibold text-xl mt-1">
              Defense: {defenceStat}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavCards;
