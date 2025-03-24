import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Cards from "./Components/Cards";

function App() {
  const [favourites, setFavourites] = useState([]);
  const [search,setSearch] = useState(""); // for the searchBar

  return (
    <>
      <Navbar set={setSearch} len={favourites.length} />
      <Cards search={search} favourites={favourites} setFavourites={setFavourites} />
    </>
  );
}

export default App;
