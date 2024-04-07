import heroService from "@/services/hero.service";

const heroStore = {
    namespaced: true,
    state: {
        hero: null,
        xsrfToken: ''
    },
    mutations: {
        setHero(state, hero) {
            state.hero = hero;
        },
        setXsrfToken(state, token) {
            state.xsrfToken = token;
        }
    },
    actions: {
        async heroLogin({dispatch, commit}, credentials) {
            try {
                const res = await heroService.authLogin(credentials);
                commit('setXsrfToken', res.data.xsrfToken);
                dispatch('getHeroData', res.data.name);
                commit('appdataStore/showNotif', {msg: `Logged in as ${res.data.name}`, type: 'info', color: 'green'}, {root: true});
            } catch(err) {
                return commit('errorStore/pushError', `Failed to login.`, {root: true});
            }
        },

        async getHeroData({commit, state}, login) {
            try {
                const res = await heroService.authGetHeroData(login, state.xsrfToken);
                commit('setHero', res.data);
            } catch(err) {
                return commit('errorStore/pushError', `Failed to fetch hero data.`, {root: true});
            }
        },

        async heroLogout({commit}) {
            commit('setXsrfToken', '');
            commit('appdataStore/showNotif', {msg: `Logged out of this hero.`, type: 'info', color: 'blue'}, {root: true});
        },

        async heroUpdate({dispatch, commit, state}, hero) {
            try {
                await heroService.authUpdateHero(hero.hero, state.xsrfToken);
                await dispatch('getHeroData', hero.login);
            } catch(err) {
                return commit('errorStore/pushError', `Failed to update hero data.`, {root: true});
            }
        },

        async heroRegister({dispatch, commit}, newUser) {
            try {
                await heroService.authRegister(newUser);
                dispatch('getHeroData', newUser.login);
                commit('appdataStore/showNotif', {msg: `Successfully registered a new user.`, type: 'info', color: 'green'}, {root: true});
            } catch(err) {
                return commit('errorStore/pushError', `Failed to register new hero.`, {root: true});
            }
        }
    }
}

export default heroStore;