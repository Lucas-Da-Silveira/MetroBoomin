import {getMethod, postMethod, putMethod} from "./axios.service";

let getHeroAliases = async () => {
    return await getMethod('/heroes/getaliases');
}

let createHero = async (heroData) => {
    return await postMethod('/heroes/create', heroData);
}

let updateHero = async (heroData, orgSecret) => {
    return await putMethod('/heroes/update', heroData, {
        headers: {
            'org-secret': orgSecret
        }
    });
}

let getHeroById = async (heroId, orgSecret) => {
    return await getMethod(`/heroes/getbyid/${heroId}`, {
        headers: {
            'org-secret': orgSecret
        }
    });
}

export  default {
    getHeroAliases,
    createHero,
    updateHero,
    getHeroById
}
