import React from "react";
import { FaHeart, FaWeightHanging, FaBolt } from "react-icons/fa";
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

const StatBar = ({ label, value, color }) => {
  // Base stats max out around 255 in the official games
  const percentage = Math.min(Math.round((value / 255) * 100), 100);

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-semibold tracking-wide text-slate-300">
        <span className="uppercase text-[10px] text-slate-400">{label}</span>
        <span>{value}</span>
      </div>

      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
        <div
          className={`${color} h-full rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const Card = ({ info, favourites, setFavourites }) => {
  const pokemon = info.data;

  const speed = pokemon.stats.find((s) => s.stat.name === "speed")?.base_stat || 0;
  const attack = pokemon.stats.find((s) => s.stat.name === "attack")?.base_stat || 0;
  const defense = pokemon.stats.find((s) => s.stat.name === "defense")?.base_stat || 0;
  const hp = pokemon.stats.find((s) => s.stat.name === "hp")?.base_stat || 0;

  const artwork =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  const primaryType = pokemon.types[0]?.type?.name || "normal";
  const activeTheme = typeStyles[primaryType] || typeStyles.normal;

  const isFav = favourites.some((item) => item.data.name === pokemon.name);

  const handleFav = () => {
    if (isFav) {
      setFavourites(favourites.filter((item) => item.data.name !== pokemon.name));
    } else {
      setFavourites([...favourites, info]);
    }
  };

  return (
    <div className="group w-[320px] transition-all duration-300 hover:-translate-y-2">
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl shadow-black/40 backdrop-blur-lg group-hover:border-slate-700 group-hover:shadow-2xl transition-all duration-300">
        
        {/* Dynamic Header based on Primary Type */}
        <div className={`relative h-48 bg-gradient-to-br ${activeTheme.gradient} p-5 flex flex-col justify-between overflow-hidden`}>
          
          {/* Subtle Overlay Pattern/Glow */}
          <div className="absolute -right-10 -top-10 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top Bar (ID & Favourite Toggle) */}
          <div className="flex justify-between items-center z-10">
            <span className="text-white/80 font-black text-lg tracking-wider">
              #{pokemon.id.toString().padStart(3, "0")}
            </span>

            <button
              onClick={handleFav}
              className="p-2.5 rounded-full bg-slate-900/30 backdrop-blur-md hover:bg-slate-900/50 text-white transition-all active:scale-90"
              aria-label="Toggle Favourite"
            >
              <FaHeart
                size={20}
                className={`transition-colors duration-300 ${
                  isFav ? "text-rose-500 fill-rose-500 scale-110" : "text-white/80"
                }`}
              />
            </button>
          </div>

          {/* Pokémon Artwork */}
          <div className="absolute inset-0 flex items-center justify-center top-2">
            <img
              src={artwork}
              alt={pokemon.name}
              className="w-40 h-40 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1 drop-shadow-[0_10px_10px_rgba(0,0,0,0.4)]"
            />
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 pt-4 space-y-5">
          {/* Name */}
          <h2 className="text-2xl font-black capitalize text-slate-100 text-center tracking-wide">
            {pokemon.name}
          </h2>

          {/* Types */}
          <div className="flex justify-center items-center gap-2">
            {pokemon.types.map((item) => {
              const typeName = item.type.name;
              const style = typeStyles[typeName] || typeStyles.normal;
              return (
                <span
                  key={item.slot}
                  className={`px-3 py-0.5 rounded-full text-xs font-bold capitalize tracking-wider ${style.bg} shadow-sm`}
                >
                  {typeName}
                </span>
              );
            })}
          </div>

          {/* Height / Weight (Converted to standard units) */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-800/60 rounded-2xl p-3 text-center border border-slate-700/40">
              <GiBodyHeight className="mx-auto text-amber-400 mb-1" size={18} />
              <p className="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Height</p>
              <p className="text-slate-100 font-bold text-sm">
                {(pokemon.height / 10).toFixed(1)} m
              </p>
            </div>

            <div className="bg-slate-800/60 rounded-2xl p-3 text-center border border-slate-700/40">
              <FaWeightHanging className="mx-auto text-amber-400 mb-1" size={16} />
              <p className="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Weight</p>
              <p className="text-slate-100 font-bold text-sm">
                {(pokemon.weight / 10).toFixed(1)} kg
              </p>
            </div>
          </div>

          {/* Stat Bars */}
          <div className="space-y-2.5 bg-slate-800/40 p-3.5 rounded-2xl border border-slate-800">
            <StatBar label="HP" value={hp} color="bg-emerald-400" />
            <StatBar label="Attack" value={attack} color="bg-rose-500" />
            <StatBar label="Defense" value={defense} color="bg-sky-400" />
            <StatBar label="Speed" value={speed} color="bg-amber-400" />
          </div>

          {/* Abilities */}
          <div>
            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-2">
              Abilities
            </p>
            <div className="flex flex-wrap gap-1.5">
              {pokemon.abilities.map((item) => (
                <span
                  key={item.slot}
                  className="bg-slate-800 border border-slate-700/60 text-slate-300 px-2.5 py-1 rounded-lg text-xs font-medium capitalize"
                >
                  {item.ability.name.replace("-", " ")}
                </span>
              ))}
            </div>
          </div>

          {/* Base XP & Action */}
          <div className="pt-1 flex items-center justify-between gap-3">
            <div className="bg-amber-400/10 border border-amber-400/20 text-amber-300 font-bold text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 shrink-0">
              <FaBolt className="text-amber-400" />
              <span>{pokemon.base_experience ?? 0} XP</span>
            </div>

            <button
              onClick={handleFav}
              className={`flex-1 py-2 px-4 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-300 ${
                isFav
                  ? "bg-slate-800 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30"
                  : "bg-slate-100 hover:bg-white text-slate-900 shadow-md hover:shadow-lg"
              }`}
            >
              {isFav ? "Saved" : "Catch"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Card;