import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import FavCards from "./FavCards";
import pika from "./../assets/pika.png"

const Favourites = ({ info = [] }) => {
  const navigate = useNavigate();
  return (
    <div>
      <nav className="flex items-center justify-between p-7">
        <IoMdArrowRoundBack
          onClick={() => navigate(-1)}
          className="text-white cursor-pointer size-20"
        />
        <div className="px-4 py-2 rounded-3xl bg-blue-500">
          <h1 className="font-extrabold text-3xl text-white">
            No. of Favs: {info.length}
          </h1>
        </div>
      </nav>
      <div className="bg-green-500 mb-7 backdrop-blur-3xl flex items-center justify-center gap-4 text-white px-4 py-1  rounded-3xl ml-[34vw] w-1/3 ">
      <h1 className="font-bold text-3xl text-center">Favourite POKEMONS</h1>
      <img src={pika} alt="pika" className="w-16 h-16" />
      </div>
      <div className="flex gap-10 justify-center items-center p-4">
        {info.length > 0 ? info.map((item, index) => (
          <FavCards key={index} info={item} />
        )) : <h1 className="text-white text-6xl font-extrabold mt-12">No Favourites Yet....</h1>}
      </div>
    </div>
  );
};

export default Favourites;
