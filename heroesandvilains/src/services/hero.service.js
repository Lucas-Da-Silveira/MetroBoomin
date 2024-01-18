import Axios from "./axios.service";

let getHeroAliases = async () => {
    try {
        const res = await Axios.get('/heroes/getaliases');
        return res.data;
    } catch (err) {
        throw new Error(err.response.data);
    }
}

let createHero = async (heroData) => {
    try {
        const res = await Axios.post('/heroes/create', heroData);
        return res.data;
    } catch (err) {
        throw new Error(err.response.data);
    }
}

let updateHero = async (heroData, orgSecret) => {
    try {
        const res = await Axios.put('/heroes/update', heroData, {
            headers: {
                'org-secret': orgSecret
            }
        });
        return res.data;
    } catch (err) {
        throw new Error(err.response.data);
    }
}

let getHeroById = async (heroId, orgSecret) => {
    try {
        const res = await Axios.get(`/heroes/getbyid/${heroId}`, {
            headers: {
                'org-secret': orgSecret
            }
        });
        return res.data;
    } catch (err) {
        throw new Error(err.response.data);
    }
}

export  default {
    getHeroAliases,
    createHero,
    updateHero,
    getHeroById
}
