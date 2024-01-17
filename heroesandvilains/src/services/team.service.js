import Axios from "./axios.service";

let getTeams = async () => {
    try {
       const res = await Axios.get('/teams/get');
       return res.data;
    } catch(err) {
        throw new Error(err.response.data);
    }
}

let createTeam = async (name) => {
    try {
        const res = await Axios.post('/teams/create', name);
        return res.data;
    } catch(err) {
        throw new Error(err.response.data);
    }
}

let addHeroes = async (idHeroes, idTeam) => {
    try {
        const res = await Axios.patch('/teams/addheroes', {
            idHeroes,
            idTeam
        });
        return res.data;
    } catch(err) {
        throw new Error(err.response.data);
    }
}

let removeHeroes = async (idHeroes, idTeam) => {
    try {
        const res = await Axios.patch('/teams/removeheroes', {
            idHeroes,
            idTeam
        });
        return res.data;
    } catch(err) {
        throw new Error(err.response.data);
    }
}

module.exports = {
    getTeams,
    createTeam,
    addHeroes,
    removeHeroes
}