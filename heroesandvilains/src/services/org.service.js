import { getMethod, postMethod, patchMethod } from "./axios.service";

let getOrgs = async () => {
    return await getMethod('/orgs/get');
}

let createOrg = async (name, secret) => {
    return await postMethod('/orgs/create', {
        name,
        secret
    });
}

let addTeam = async (idTeam, secret) => {
    return await patchMethod('/orgs/addteam', { 'idTeam': idTeam }, {
        headers: {
            'org-secret': secret
        }
    });
}

let removeTeam = async (idTeam, secret) => {
    return await patchMethod('/orgs/removeteam', { 'idTeam': idTeam }, {
        headers: {
            'org-secret': secret
        }
    });
}

let getOrgById = async (idOrg, secret) => {
    return await getMethod(`/orgs/getbyid/${idOrg}`,{
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