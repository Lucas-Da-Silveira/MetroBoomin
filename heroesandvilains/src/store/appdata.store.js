import orgService from  '../services/org.service.js'
import heroService from '../services/hero.service.js'
import teamService from '../services/team.service.js'

const appdataStore = {
    namespaced: true,
    state: {
        orgPassword: '',
        heroAliases: [],
        currentHero: null,
        teams: [],
        currentTeam: null,
        orgs: [],
        currentOrg: null,

        heroPowers: [
            { name: 'Super Strength', type: 1, level: 90 },
            { name: 'Super Speed', type: 2, level: 80 },
            { name: 'Flight', type: 1, level: 85 },
            { name: 'Teleportation', type: 2, level: 75 },
            { name: 'Telekinesis', type: 3, level: 70 },
            { name: 'Invisibility', type: 4, level: 80 },
            { name: 'Invulnerability', type: 1, level: 95 },
            { name: 'Telepathy', type: 5, level: 70 },
            { name: 'X-Ray Vision', type: 6, level: 75 },
            { name: 'Heat Vision', type: 6, level: 80 },
            { name: 'Freeze Breath', type: 6, level: 75 },
            { name: 'Elasticity', type: 1, level: 85 },
            { name: 'Shapeshifting', type: 1, level: 90 },
            { name: 'Regeneration', type: 1, level: 95 },
        ],

        notifOn: false,
        notifMsg: '',
        notifType: '',
        notifColor: '',
    },
    mutations: {
        setOrgPassword(state, password) {
            state.orgPassword = password;
        },
        setHeroAliases(state, aliases) {
            state.heroAliases = aliases;
        },
        setCurrentHero(state, hero) {
            state.currentHero = hero;
        },
        setTeams(state, teams) {
            state.teams = teams;
        },
        setCurrentTeam(state, team) {
            state.currentTeam = team;
        },
        setOrgs(state, orgs) {
            state.orgs = orgs;
        },
        setCurrentOrg(state, org) {
            state.currentOrg = org;
        },
        createTeam(state, team) {
            state.teams.push(team);
        },
        addOrg(state, org) {
            state.orgs.push(org);
        },
        addHero(state, hero) {
            state.heroAliases.push(hero);
        },

        showNotif(state, settings) {
            state.notifMsg = settings.msg;
            state.notifType = settings.type;
            state.notifColor = settings.color;
            state.notifOn = true;
            setTimeout(() => {
                state.notifOn = false;
            }, 3000);
        }
    },
    actions: {
        async authenticateOrganization({commit}, secret) {
            commit('setOrgPassword', secret);
            commit('showNotif', {msg: `Logged in with secret: ${secret}`, type: 'info', color: 'green'});
        },

        async orgLogout({commit}) {
            commit('setOrgPassword', '');
            commit('showNotif', {msg: `Logged out of this org.`, type: 'info', color: 'blue'});
        },

        async loadHeroAliases({commit}) {
            try {
                const res = await heroService.getHeroAliases();
                commit('setHeroAliases', res.data);
            } catch (err) {
                commit('errorStore/pushError', "Failed to load hero aliases.", {root: true});
            }
        },

        async loadHeroDetails({commit, state}, heroId) {
            try {
                const res = await heroService.getHeroById(heroId, state.orgPassword);
                commit('setCurrentHero', res.data);
                return res.data;
            } catch (err) {
                commit('errorStore/pushError', "Failed to load this hero's data.", {root: true});
            }
        },

        async loadTeams({commit}) {
            try {
                const res = await teamService.getTeams();
                commit('setTeams', res.data);
            } catch (err) {
                commit('errorStore/pushError', "Failed to load teams.", {root: true});
            }
        },

        async loadTeamDetails({commit, state}, teamId) {
            try {
                const org = await orgService.getOrgById(state.currentOrg[0]._id, state.orgPassword);
                const teams = org.data[0].teams;
                const team = teams.find(t => t._id === teamId);
                commit('setCurrentTeam', team);
            } catch (err) {
                commit('errorStore/pushError', "Failed to load this team's data.", {root: true});
            }
        },

        async loadOrgs({commit}) {
            try {
                const res = await orgService.getOrgs();
                commit('setOrgs', res.data);
            } catch (err) {
                commit('errorStore/pushError', "Failed to load orgs.", {root: true});
            }
        },

        async loadOrgDetails({commit, state}, orgId) {
            try {
                const res = await orgService.getOrgById(orgId, state.orgPassword);
                commit('setCurrentOrg', res.data);
            } catch (err) {
                commit('errorStore/pushError', "Failed to load this org's data.", {root: true});
            }
        },

        async createTeam({commit, state}, team) {
            try {
                const res = await teamService.createTeam(team, state.orgPassword);
                commit('createTeam', res.data);
            } catch (err) {
                commit('errorStore/pushError', "Failed to create the team.", {root: true});
            }
        },

        async createOrg({commit}, org) {
            try {
                const res = await orgService.createOrg(org.name, org.password);
                commit('addOrg', res.data);
            } catch(err) {
                commit('errorStore/pushError', "Failed to create the org.", {root: true});
            }
        },

        async createHero({commit}, hero) {
            try {
                const res = await heroService.createHero(hero);
                commit('addHero', res.data);
            } catch(err) {
                commit('errorStore/pushError', "Failed to create the hero.", {root: true});
            }
        },

        async updateHero({dispatch, commit, state}, hero) {
            try {
                await heroService.updateHero(hero, state.orgPassword);
                await dispatch('loadHeroDetails', hero._id);
            } catch (err) {
                commit('errorStore/pushError', "Failed to edit the hero.", {root: true});
            }
        },

        async addTeam({dispatch, commit, state}, teamId) {
            try {
                await orgService.addTeam(teamId, state.orgPassword);
                await dispatch('loadOrgDetails', state.currentOrg[0]._id);
            } catch (err) {
                commit('errorStore/pushError', "Failed to link the team to the org.", {root: true});
            }
        },

        async removeTeam({dispatch, commit, state}, team) {
            try {
                await orgService.removeTeam(team._id, state.orgPassword);
                await dispatch('loadOrgDetails', state.currentOrg[0]._id);
            } catch (err) {
                commit('errorStore/pushError', "Failed to unlink the team from the org.", {root: true});
            }
        },

        async addHero({dispatch, commit, state}, heroId) {
            try {
                await teamService.addHeroes([heroId], state.currentTeam._id);
                await dispatch('loadTeamDetails', state.currentTeam._id);
            } catch(err) {
                commit('errorStore/pushError', "Failed to link the hero to the team.", {root: true});
            }
        },

        async removeHero({dispatch, commit, state}, heroId) {
            try {
                await teamService.removeHeroes([heroId], state.currentTeam._id);
                await dispatch('loadTeamDetails', state.currentTeam._id);
            } catch(err) {
                commit('errorStore/pushError', "Failed to unlink the hero from the org.", {root: true});
            }
        }
    }
}

export default appdataStore;