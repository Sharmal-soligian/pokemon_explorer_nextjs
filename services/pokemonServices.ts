import api from "./api";

const pokemonServices = async (offset=0, limit=20) => {
    try {
        const res = await api.get(`/pokemon`, {
            params: {offset, limit}
        });
        return res?.data;
    } catch (error) {
        console.error('ERROR WHILE FETCHING POKEMON DATA: ', error);
    }
}

const getPokemonById = async (id: number | string) => {
    try {
        const res = await api.get(`/pokemon/${id}`);
        return res?.data;
    } catch (error) {
        console.error('ERROR GETTING POKEMON BY ID: ', error);
    }
}

export { pokemonServices, getPokemonById };