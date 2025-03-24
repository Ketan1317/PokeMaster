import axios from "axios";

const API = "https://pokeapi.co/api/v2/pokemon?limit=200";

const GlobalAPI = {
    getData: () => axios.get(API),
    getFinal: (url) => axios.get(url)
}

export default GlobalAPI;
