import Vue from 'vue'
import Vuex from 'vuex'
import orgService from  '../services/org.service.js'
import heroService from '../services/hero.service.js'
import teamService from '../services/team.service.js'
import vuexPersist from '../plugins/persist'

Vue.use(Vuex)

export default new Vuex.Store({

        state: {
            orgPassword: '',
            heroAliases: [],
            currentHero: null,
            teams: [],
            currentTeam: null,
            orgs: [],
            currentOrg: null
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
            removeTeam(state, team) {
                state.teams = state.teams.filter(t => t._id !== team._id);
            },
        },

        actions: {
            async authenticateOrganization({commit}, password) {
                try {
                    const res = await orgService.getOrgs(); // FIXME: CASSé (la méthode)
                    const orgs = res.data;

                    let org = null;
                    for(const org1 of orgs) {
                        const orgDetails = await orgService.getOrgById(org1._id, password);
                        if(orgDetails.secret === password) {
                            org = orgDetails;
                            break;
                        }
                    }
                    console.log(`org: ${org}`);

                    if (org) {
                        commit('setOrgPassword', password);
                        await Promise.all([
                            this.dispatch('loadHeroAliases'),
                            this.dispatch('loadTeams'),
                            this.dispatch('loadOrgs'),
                            this.dispatch('loadOrgDetails', org._id)
                        ]);
                        return org;
                    } else {
                        throw new Error('Wrong password');
                    }
                } catch (err) {
                    throw new Error(err.message);
                }
            },

            async loadHeroAliases({commit}) {
                try {
                    const res = await heroService.getHeroAliases();
                    commit('setHeroAliases', res.data);
                } catch (err) {
                    throw new Error(err.message);
                }
            },

            async loadHeroDetails({commit, state}, heroId) {
                try {
                    const res = await heroService.getHeroById(heroId, state.orgPassword);
                    commit('setCurrentHero', res.data);
                } catch (err) {
                    throw new Error(err.message);
                }
            },

            async loadTeams({commit}) {
                try {
                    const res = await teamService.getTeams();
                    commit('setTeams', res.data);
                } catch (err) {
                    throw new Error(err.message);
                }
            },

            async loadTeamDetails({commit, state}, teamId) { // FIXME: c'est cassé
                try {
                    const res = await teamService.getOrgById(teamId, state.orgPassword);
                    const team = res.data;
                    // team.heroes = team.heroes.map(hero => hero._id);
                    commit('setCurrentTeam', team);
                } catch (err) {
                    throw new Error(err.message);
                }
            },

            async loadOrgs({commit}) {
                try {
                    const res = await orgService.getOrgs();
                    // commit('setOrgNames', res.data.map(org => org.name)); //
                    commit('setOrgs', res.data);
                } catch (err) {
                    throw new Error(err.message);
                }
            },

            async loadOrgDetails({commit, state}, orgId) {
                try {
                    const res = await orgService.getOrgById(orgId, state.orgPassword);
                    commit('setCurrentOrg', res.data);
                } catch (err) {
                    throw new Error(err.message);
                }
            },

            async createTeam({commit, state}, team) {
                try {
                    const res = await teamService.createTeam(team, state.orgPassword);
                    commit('createTeam', res.data);
                } catch (err) {
                    throw new Error(err.message);
                }
            },

            async createOrg({commit}, org) {
                try {
                    const res = await orgService.createOrg(org.name, org.password);
                    commit('addOrg', res.data);
                } catch(err) {
                    throw new Error(err.message);
                }
            },

            async addTeam({state}, team) {
                try {
                    await orgService.addTeam(team._id, state.orgPassword);
                    await this.dispatch('loadOrgDetails', state.currentOrg[0]._id);
                } catch (err) {
                    throw new Error(err.message);
                }
            },

            async removeTeam({ state}, team) {
                try {
                    await orgService.removeTeam(team._id, state.orgPassword);
                    await this.dispatch('loadOrgDetails', state.currentOrg[0]._id);
                } catch (err) {
                    throw new Error(err.message);
                }
            },
        },
        plugins: [vuexPersist]
    }
)

