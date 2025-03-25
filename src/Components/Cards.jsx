import React, { useState, useEffect } from "react";
import Card from "./Card";
import GlobalAPI from "./../Constant/GlobalAPI";

const Cards = ({ favourites,search, setFavourites }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await GlobalAPI.getData(); 

      const resultArray = res.data.results;

      const details = await Promise.all(
        resultArray.map(async (item) => {
          const result = await GlobalAPI.getFinal(item.url); //fetch the final details by using the url
          console.log("Detailed Result:", result);
          return result;
        })
      );
      setData(details);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const filteredData = data.filter((item) => item.data.name.includes(search));

  return (
    <div className="mt-14 flex items-center justify-center gap-12 flex-wrap">
      {filteredData.length > 0 ? (
        filteredData.map((item, index) => (
          <Card
            key={index}
            info={item}
            favourites={favourites}
            setFavourites={setFavourites}
          />
        ))
      ) : (
        <p className="text-5xl font-bold mt-7 text-white">Loading...</p>
      )}
    </div>
  );
};

export default Cards;

