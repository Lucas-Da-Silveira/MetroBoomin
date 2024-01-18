import Axios from "./axios.service";

let getOrgs = async () => {
    try {
        const res = await Axios.get('/orgs/get');
        return res.data;
    } catch(err) {
        throw new Error(err.response.data);
    }
}

let createOrg = async (name, secret) => {
    try {
        const res = await Axios.post('/orgs/create', {
            name,
            secret
        });
        return res.data;
    } catch(err) {
        throw new Error(err.response.data);
    }
}

let addTeam = async (idTeam, secret) => {
    try {
        const res = await Axios.patch('/orgs/addteam', idTeam, {
            headers: {
                'org-secret': secret
            }
        });
        return res.data;
    } catch(err) {
        throw new Error(err.response.data);
    }
}

let removeTeam = async (idTeam, secret) => {
    try {
        const res = await Axios.patch('/orgs/removeteam', idTeam, {
            headers: {
                'org-secret': secret
            }
        });
        return res.data;
    } catch(err) {
        throw new Error(err.response.data);
    }
}

let getOrgById = async (idOrg, secret) => {
    try {
        const res = await Axios.get(`/orgs/getbyid/${idOrg}`, {
            headers: {
                'org-secret': secret
            }
        });
        return res.data;
    } catch(err) {
        throw new Error(err.response.data);
    }
}

export default {
    getOrgs,
    createOrg,
    addTeam,
    removeTeam,
    getOrgById
}