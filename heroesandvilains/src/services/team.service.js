import { getMethod, postMethod, patchMethod } from "./axios.service";

let getTeams = async () => {
    return await getMethod('/herocorp/teams/get');
}

let createTeam = async (name) => {
    return await postMethod('/herocorp/teams/create', name);
}

let addHeroes = async (idHeroes, idTeam) => {
    return await patchMethod('/herocorp/teams/addheroes', {
        idHeroes,
        idTeam
    });
}

let removeHeroes = async (idHeroes, idTeam) => {
    return await patchMethod('/herocorp/teams/removeheroes', {
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