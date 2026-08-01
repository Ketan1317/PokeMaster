import React from "react";
import { FaHeart, FaBolt, FaWeightHanging, FaTrash } from "react-icons/fa";
import { GiBodyHeight } from "react-icons/gi";

// Map primary type to badging styles & card header gradients
const typeStyles = {
  normal: { bg: "bg-stone-500 text-white", gradient: "from-stone-600 to-stone-400" },
  fire: { bg: "bg-orange-500 text-white", gradient: "from-amber-600 via-orange-500 to-red-500" },
  water: { bg: "bg-blue-500 text-white", gradient: "from-blue-600 via-cyan-500 to-teal-400" },
  electric: { bg: "bg-yellow-400 text-slate-900", gradient: "from-amber-500 via-yellow-400 to-amber-300" },
  grass: { bg: "bg-emerald-500 text-white", gradient: "from-emerald-600 via-green-500 to-teal-400" },
  ice: { bg: "bg-sky-400 text-slate-900", gradient: "from-cyan-500 via-sky-400 to-blue-300" },
  fighting: { bg: "bg-red-700 text-white", gradient: "from-red-800 to-orange-700" },
  poison: { bg: "bg-purple-600 text-white", gradient: "from-purple-700 to-pink-600" },
  ground: { bg: "bg-amber-700 text-white", gradient: "from-amber-800 to-yellow-600" },
  flying: { bg: "bg-indigo-400 text-white", gradient: "from-indigo-500 to-sky-400" },
  psychic: { bg: "bg-pink-500 text-white", gradient: "from-pink-600 to-rose-400" },
  bug: { bg: "bg-lime-600 text-white", gradient: "from-lime-700 to-green-500" },
  rock: { bg: "bg-stone-600 text-white", gradient: "from-stone-700 to-amber-800" },
  ghost: { bg: "bg-violet-800 text-white", gradient: "from-violet-900 to-purple-700" },
  dragon: { bg: "bg-indigo-700 text-white", gradient: "from-indigo-900 to-purple-600" },
  dark: { bg: "bg-zinc-800 text-white", gradient: "from-zinc-900 to-stone-800" },
  steel: { bg: "bg-slate-500 text-white", gradient: "from-slate-600 to-zinc-400" },
  fairy: { bg: "bg-pink-300 text-slate-900", gradient: "from-pink-400 to-rose-300" },
};

const FavCards = ({ info, favourites, setFavourites }) => {
  const pokemon = info.data;

  const attack = pokemon.stats.find((s) => s.stat.name === "attack")?.base_stat || 0;
  const defense = pokemon.stats.find((s) => s.stat.name === "defense")?.base_stat || 0;
  const speed = pokemon.stats.find((s) => s.stat.name === "speed")?.base_stat || 0;

  const artwork =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  const primaryType = pokemon.types[0]?.type?.name || "normal";
  const activeTheme = typeStyles[primaryType] || typeStyles.normal;

  const handleRemove = () => {
    if (setFavourites && favourites) {
      setFavourites(favourites.filter((item) => item.data.name !== pokemon.name));
    }
  };

  return (
    <div className="group w-[310px] transition-all duration-300 hover:-translate-y-2">
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl shadow-black/40 backdrop-blur-lg group-hover:border-slate-700 transition-all duration-300">
        
        {/* Dynamic Header */}
        <div className={`relative h-44 bg-gradient-to-br ${activeTheme.gradient} p-4 flex flex-col justify-between overflow-hidden`}>
          <div className="absolute -right-8 -top-8 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />

          {/* Top Info */}
          <div className="flex justify-between items-center z-10">
            <span className="text-white/80 font-black text-sm tracking-wider">
              #{pokemon.id.toString().padStart(3, "0")}
            </span>

            <div className="p-2 rounded-full bg-slate-900/30 backdrop-blur-md text-rose-400">
              <FaHeart size={16} className="fill-rose-500" />
            </div>
          </div>

          {/* Pokémon Artwork */}
          <div className="absolute inset-0 flex items-center justify-center top-2">
            <img
              src={artwork}
              alt={pokemon.name}
              className="w-36 h-36 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_8px_8px_rgba(0,0,0,0.4)]"
            />
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-4">
          {/* Name */}
          <h2 className="text-xl font-black capitalize text-slate-100 text-center tracking-wide">
            {pokemon.name}
          </h2>

          {/* Types */}
          <div className="flex justify-center items-center gap-1.5 flex-wrap">
            {pokemon.types.map((item) => {
              const typeName = item.type.name;
              const style = typeStyles[typeName] || typeStyles.normal;
              return (
                <span
                  key={item.slot}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold capitalize tracking-wider ${style.bg}`}
                >
                  {typeName}
                </span>
              );
            })}
          </div>

          {/* Height / Weight */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-slate-800/60 rounded-xl p-2.5 text-center border border-slate-700/40">
              <GiBodyHeight className="mx-auto text-amber-400 mb-0.5" size={16} />
              <p className="text-slate-400 text-[10px] font-medium uppercase">Height</p>
              <p className="text-slate-100 font-bold text-xs">
                {(pokemon.height / 10).toFixed(1)} m
              </p>
            </div>

            <div className="bg-slate-800/60 rounded-xl p-2.5 text-center border border-slate-700/40">
              <FaWeightHanging className="mx-auto text-amber-400 mb-0.5" size={14} />
              <p className="text-slate-400 text-[10px] font-medium uppercase">Weight</p>
              <p className="text-slate-100 font-bold text-xs">
                {(pokemon.weight / 10).toFixed(1)} kg
              </p>
            </div>
          </div>

          {/* Stats Snapshot */}
          <div className="grid grid-cols-3 gap-2 text-center bg-slate-800/40 p-2.5 rounded-xl border border-slate-800">
            <div>
              <p className="text-[10px] font-bold uppercase text-rose-400">ATK</p>
              <p className="text-slate-100 font-extrabold text-sm">{attack}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-sky-400">DEF</p>
              <p className="text-slate-100 font-extrabold text-sm">{defense}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-amber-400">SPD</p>
              <p className="text-slate-100 font-extrabold text-sm">{speed}</p>
            </div>
          </div>

          {/* Abilities */}
          <div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
              Abilities
            </p>
            <div className="flex flex-wrap gap-1">
              {pokemon.abilities.map((ability) => (
                <span
                  key={ability.slot}
                  className="bg-slate-800 border border-slate-700/60 text-slate-300 px-2 py-0.5 rounded-md text-[11px] font-medium capitalize"
                >
                  {ability.ability.name.replace("-", " ")}
                </span>
              ))}
            </div>
          </div>

          {/* Base XP & Remove Button */}
          <div className="pt-2 flex items-center justify-between gap-2">
            <div className="bg-amber-400/10 border border-amber-400/20 text-amber-300 font-bold text-xs px-2.5 py-1.5 rounded-xl flex items-center gap-1">
              <FaBolt className="text-amber-400" />
              <span>{pokemon.base_experience ?? 0} XP</span>
            </div>

            {setFavourites && (
              <button
                onClick={handleRemove}
                className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <FaTrash size={11} />
                <span>Remove</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default FavCards;