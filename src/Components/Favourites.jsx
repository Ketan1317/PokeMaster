import React from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { TbPokeball } from "react-icons/tb";
import { FaHeart, FaCompass } from "react-icons/fa";
import FavCards from "./FavCards";

const Favourites = ({ info = [], setFavourites }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-8 py-8">
      {/* Header Navigation & Badge */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2.5 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white px-5 py-2.5 rounded-2xl border border-slate-700/80 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-x-1 active:scale-95 text-sm font-bold"
        >
          <IoArrowBack size={18} className="text-yellow-400" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-yellow-400/30 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-lg">
          <FaHeart className="text-rose-500 text-sm animate-pulse" />
          <span className="text-yellow-300 font-extrabold text-sm tracking-wide">
            {info.length} {info.length === 1 ? "Favourite" : "Favourites"} Saved
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center mt-8 mb-10">
        <div className="inline-block relative">
          <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-2xl pointer-events-none" />
          <TbPokeball
            size={56}
            className="mx-auto text-yellow-400 relative z-10 transition-transform hover:rotate-180 duration-700 cursor-pointer"
          />
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 tracking-wide mt-3">
          Saved Collection
        </h1>

        <p className="text-slate-400 text-sm sm:text-base mt-2 font-medium max-w-md mx-auto">
          Your handpicked team of Pokémon ready for battle.
        </p>
      </div>

      {/* Content Grid / Empty State */}
      {info.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-center bg-slate-900/40 border border-slate-800 rounded-3xl p-8 max-w-md mx-auto shadow-xl">
          <div className="p-5 rounded-full bg-slate-800/80 mb-4 border border-slate-700/60 shadow-inner">
            <TbPokeball size={52} className="text-slate-600" />
          </div>

          <h2 className="text-2xl font-black text-slate-100 tracking-wide">
            Your Collection is Empty
          </h2>

          <p className="text-slate-400 text-sm mt-2 mb-6">
            You haven't added any Pokémon to your favourites list yet.
          </p>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-900 font-extrabold px-6 py-3 rounded-2xl shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 transition-all duration-300 hover:scale-105 active:scale-95 text-xs uppercase tracking-wider"
          >
            <FaCompass size={16} />
            <span>Discover Pokémon</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {info.map((pokemon) => (
            <FavCards
              key={pokemon.data.id}
              info={pokemon}
              favourites={info}
              setFavourites={setFavourites}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;