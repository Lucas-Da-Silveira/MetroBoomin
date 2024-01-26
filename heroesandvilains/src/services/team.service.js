import { getMethod, postMethod, patchMethod } from "./axios.service";

let getTeams = async () => {
    return await getMethod('/teams/get');
}

let createTeam = async (name) => {
    return await postMethod('/teams/create', name);
}

let addHeroes = async (idHeroes, idTeam) => {
    return await patchMethod('/teams/addheroes', {
        idHeroes,
        idTeam
    });
}

let removeHeroes = async (idHeroes, idTeam) => {
    return await patchMethod('/teams/removeheroes', {
        idHeroes,
        idTeam
    });
}

export  default {
    getTeams,
    createTeam,
    addHeroes,
    removeHeroes
}