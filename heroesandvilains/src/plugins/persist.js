import VuexPersist from 'vuex-persist'

const vuexLocal = new VuexPersist({
    storage: window.localStorage
});

export default vuexLocal.plugin;