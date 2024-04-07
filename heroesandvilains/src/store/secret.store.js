const secretStore = {
    namespaced: true,
    state: {
        secretPhrase: null,
    },
    mutations: {
        setSecretPhrase: (state, secretPhrase) => {
            state.secretPhrase = secretPhrase;
        }
    },
    getters: {
        getSecretPhrase: state => state.secretPhrase
    },
    actions: {
        async fetchSecretPhrase({ commit }, password) {
            try {
                commit('setSecretPhrase', password);
            } catch (error) {
                console.error("Erreur lors de la récupération de la phrase secrète:", error);
            }
        }
    },
}

export default secretStore;