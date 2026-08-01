import React from "react";
import { NavLink } from "react-router-dom";
import { FaHeart, FaSearch } from "react-icons/fa";
import { TbPokeball } from "react-icons/tb";
import logo from "./../assets/logo.png";

const Navbar = ({ len, set }) => {
  return (
    <header className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-6">
      {/* Top Navigation Bar */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 shadow-2xl shadow-yellow-500/5 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-yellow-400/30 blur-xl rounded-full group-hover:bg-yellow-400/50 transition-all duration-300" />
            <img
              src={logo}
              className="relative w-14 h-14 object-contain transition-transform duration-700 group-hover:rotate-180 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]"
              alt="DexMaster Logo"
            />
          </div>

          <div>
            <h1 className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-sm">
              DexMaster
            </h1>
            <p className="text-xs uppercase tracking-[0.2em] font-medium text-slate-400">
              Pokémon Encyclopedia
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
         <NavLink to="/favourites" className="group">
  <div className="relative flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 hover:border-rose-500/50 shadow-md hover:shadow-rose-500/10 transition-all duration-300 active:scale-95">
    
    {/* Animated Heart Icon */}
    <div className="p-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
      <FaHeart className="text-xs group-hover:scale-110 transition-transform" />
    </div>

    {/* Label */}
    <span className="text-xs font-extrabold tracking-wider text-slate-200 group-hover:text-white uppercase">
      Favourites
    </span>

    {/* Counter Badge */}
    <span className="bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs px-2 py-0.5 rounded-full font-black min-w-[24px] text-center">
      {len}
    </span>
  </div>
</NavLink>

          <div 
            title="Pokédex Menu"
            className="w-11 h-11 rounded-2xl bg-slate-800/80 border border-slate-700 flex justify-center items-center hover:border-yellow-400 hover:rotate-180 transition-all duration-500 cursor-pointer shadow-inner group"
          >
            <TbPokeball
              size={26}
              className="text-red-500 group-hover:text-yellow-400 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Search Bar Container */}
      <div className="flex justify-center mt-6">
        <div className="relative w-full max-w-xl">
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none transition-colors group-focus-within:text-yellow-400" />
          <input
            type="text"
            onChange={(e) => set(e.target.value.toLowerCase())}
            placeholder="Search Pokémon by name..."
            className="w-full pl-13 pr-6 py-3.5 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-700/80 text-slate-100 placeholder:text-slate-500 text-sm font-medium outline-none focus:border-yellow-400/80 focus:ring-4 focus:ring-yellow-400/10 shadow-lg transition-all duration-300"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;