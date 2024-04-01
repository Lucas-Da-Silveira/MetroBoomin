import Vue from 'vue'
import Vuex from 'vuex'

import appdataStore from "@/store/appdata.store";
import errorStore from "@/store/error.store";
import heroStore from "@/store/hero.store";
import secretStore from "@/store/secret.store";

import vuexPersist from '../plugins/persist'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        appdataStore,
        errorStore,
        heroStore,
        secretStore,
    },
    plugins: [vuexPersist]
});
