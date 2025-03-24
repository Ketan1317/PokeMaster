import React from "react";
import { FaRegFaceKissWinkHeart } from "react-icons/fa6";
import logo from "./../assets/logo.png";

const Navbar = ({ len,set }) => {
  return (
    <div>
      <div className="w-full h-24 flex items-center justify-between text-white">
        <div className="flex p-12 mt-6 items-center justify-center gap-5">
          <img src={logo} className="w-24 animate-spin" alt="" />
          <h1 className="text-3xl animate-bounce font-bold">DexMaster</h1>
        </div>
        <div className="flex mt-6 items-center justify-center p-6 gap-5">
          <div className="bg-amber-600 hover:scale-110 transition duration-200 ease-in rounded-2xl px-4 py-2">
            <h1 className="text-xl flex items-center justify-center gap-2  cursor-pointer font-semibold">
              FAVOURITES : <span className="text-2xl  text-black font-extrabold  cursor-pointer font-semibold">{len}</span>
            </h1>
          </div>
          <FaRegFaceKissWinkHeart className="cursor-pointer animate-bounce hover:text-red-600" size={30} />
        </div>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="ml-[25vw] mt-6">
        <input
        onChange={(e) => set(e.target.value)}
          type="text"
          className="border-[1px] animate-pulse an border-gray-500 px-4 py-2 rounded-3xl w-[50vw] text-center text-zinc-300 font-semibold text-md"
          placeholder="Enter Some Pokemon Name"
        />
      </form>
    </div>
  );
};

export default Navbar;
