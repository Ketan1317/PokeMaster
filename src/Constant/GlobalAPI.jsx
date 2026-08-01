import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

// Simple in-memory cache to prevent unnecessary refetching
const cache = new Map();

const GlobalAPI = {
  /**
   * Fetch initial batch of Pokémon list
   * @param {number} limit Number of Pokémon to fetch (default: 151)
   * @param {number} offset Offset for pagination (default: 0)
   */
  getData: async (limit = 151, offset = 0) => {
    const cacheKey = `list-${limit}-${offset}`;
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    const response = await axios.get(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    cache.set(cacheKey, response);
    return response;
  },

  /**
   * Fetch full details for an individual Pokémon via direct URL or ID
   * @param {string} url Direct URL string provided by PokeAPI result
   */
  getFinal: async (url) => {
    if (cache.has(url)) {
      return cache.get(url);
    }

    const response = await axios.get(url);
    cache.set(url, response);
    return response;
  },

  /**
   * Fetch Pokémon details directly by Name or ID
   * @param {string|number} identifier e.g. "pikachu" or 25
   */
  getPokemonDetailsByNameOrId: async (identifier) => {
    const url = `${BASE_URL}/pokemon/${identifier.toString().toLowerCase()}`;
    return GlobalAPI.getFinal(url);
  },

  /**
   * Fetch Pokémon by primary type
   * @param {string} type e.g. "fire", "water"
   */
  getPokemonByType: async (type) => {
    const response = await axios.get(`${BASE_URL}/type/${type.toLowerCase()}`);
    return response.data;
  },
};

export default GlobalAPI;