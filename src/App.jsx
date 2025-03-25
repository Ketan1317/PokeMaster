import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Cards from "./Components/Cards";
import Favourites from "./Components/Favourites";

function App() {
  const [favourites, setFavourites] = useState([]);
  const [search, setSearch] = useState(""); // for the searchBar

  return (
    <>
      <Navbar set={setSearch} len={favourites.length} />
      <Routes>
        <Route
          path="/"
          element={
            <Cards
              search={search}
              favourites={favourites}
              setFavourites={setFavourites}
            />
          }
        />
        <Route
          path="/favourites"
          element={<Favourites info={favourites} />}
        />
      </Routes>
    </>
  );
}

export default App;
