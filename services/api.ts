import axios from "axios";

const POKEMON_URL = `https://pokeapi.co/api/v2`;

const api = axios.create({
    baseURL: POKEMON_URL
});

export default api;