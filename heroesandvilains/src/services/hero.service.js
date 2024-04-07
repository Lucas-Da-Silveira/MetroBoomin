import {getMethod, postMethod, putMethod} from "./axios.service";

let getHeroAliases = async () => {
    return await getMethod('/herocorp/heroes/getaliases');
}

let createHero = async (heroData) => {
    return await postMethod('/herocorp/heroes/create', heroData);
}

let updateHero = async (heroData, orgSecret) => {
    return await putMethod('/herocorp/heroes/update', heroData, {
        headers: {
            'org-secret': orgSecret
        }
    });
}

let getHeroById = async (heroId, orgSecret) => {
    return await getMethod(`/herocorp/heroes/getbyid/${heroId}`, {
        headers: {
            'org-secret': orgSecret
        }
    });
}

let authLogin = async (credentials) => {
    return await postMethod('/authapi/auth/signin', {
        'login': credentials.login,
        'password': credentials.password
    });
}

let authGetHeroData = async (login, xsrfToken) => {
    return await getMethod(`/authapi/user/getuser/${login}`, {
        headers: {
            'x-xsrf-token': xsrfToken
        }
    });
}

let authUpdateHero = async (heroData, xsrfToken) => {
    return await putMethod('/herocorp/heroes/authupdate', heroData, {
        headers: {
            'x-xsrf-token': xsrfToken
        }
    });
}

let authRegister = async (newUser) => {
    return await postMethod('/authapi/user/register', {
        'login': newUser.login,
        'password': newUser.password,
        'hero': newUser.hero,
        'captchaToken': newUser.captchaToken
    });
}

export  default {
    getHeroAliases,
    createHero,
    updateHero,
    getHeroById,
    authLogin,
    authGetHeroData,
    authUpdateHero,
    authRegister
}
