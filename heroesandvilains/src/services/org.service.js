import { getMethod, postMethod, patchMethod } from "./axios.service";

let getOrgs = async () => {
    return await getMethod('/herocorp/orgs/get');
}

let createOrg = async (name, secret) => {
    return await postMethod('/herocorp/orgs/create', {
        name,
        secret
    });
}

let addTeam = async (idTeam, secret) => {
    return await patchMethod('/herocorp/orgs/addteam', { 'idTeam': idTeam }, {
        headers: {
            'org-secret': secret
        }
    });
}

let removeTeam = async (idTeam, secret) => {
    return await patchMethod('/herocorp/orgs/removeteam', { 'idTeam': idTeam }, {
        headers: {
            'org-secret': secret
        }
    });
}

let getOrgById = async (idOrg, secret) => {
    return await getMethod(`/herocorp/orgs/getbyid/${idOrg}`,{
        headers: {
            'org-secret': secret
        }
    });
}

export default {
    getOrgs,
    createOrg,
    addTeam,
    removeTeam,
    getOrgById
}