<script>

import {mapMutations, mapState} from "vuex";

export default {
  name: 'NavBar',
  data: () => ({
    routes: [
      { name: 'Organisations', path: '/orgs'},
      { name: 'Teams', path: '/teams'},
      { name: 'Heroes', path: '/heroes'},
    ]
  }),
  computed: {
    ...mapState('appdataStore', ['orgPassword']),
  },
  methods: {
    ...mapMutations('appdataStore', ['setOrgPassword']),
    logout() {
      this.setOrgPassword('');
    },
  }
};
</script>

<template>
  <v-app-bar
      app
      color="primary"
      dark
  >
    <div class="d-flex align-center">
      <v-menu
          rounded="x"
      >
        <template v-slot:activator="{ attrs, on }">
          <v-btn
              class="white--text ma-5"
              icon
              v-bind="attrs"
              v-on="on"
          >
            <v-icon x-large color="white">
              mdi-menu
            </v-icon>
          </v-btn>
        </template>

        <v-list>
            <v-list-item v-for="(route, index) in routes" :key="index" @click="$router.push(`${route.path}`)">
              <v-list-item-title>
                {{ route.name }}
              </v-list-item-title>
            </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <h2 id="nav-title" @click="$router.push('/')">Heroes & Villains</h2>

    <v-spacer></v-spacer>

    <router-link v-if="orgPassword === ''" to="/login">
      <v-btn
          elevation="2"
          text
      >
        Login
        <v-icon
            right
            dark
        >mdi-account</v-icon>
      </v-btn>
    </router-link>
    <router-link v-else to="">
      <v-btn
          elevation="2"
          text
          @click="logout">
        Logout
        <v-icon
            right
            dark
        >mdi-logout</v-icon>
      </v-btn>
    </router-link>
  </v-app-bar>
</template>

<style scoped>
#nav-title {
  cursor: pointer;
}
</style>