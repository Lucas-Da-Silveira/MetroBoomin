<script>

import {mapActions, mapState} from "vuex";

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
    ...mapState('heroStore', ['xsrfToken']),
  },
  methods: {
    ...mapActions('appdataStore', ['orgLogout']),
    ...mapActions('heroStore', ['heroLogout'])
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

    <router-link v-if="xsrfToken.length === 0" to="/hero/register">
      <v-btn
          elevation="2"
          text
      >
        REGISTER
        <v-icon
            right
            dark
        >mdi-account-plus</v-icon>
      </v-btn>
    </router-link>

    <router-link v-if="xsrfToken.length !== 0" to="/hero/settings">
      <v-btn
        class="mx-2"
        fab
        small
        color="primary"
      >
        <v-icon>
          mdi-account
        </v-icon>
      </v-btn>
    </router-link>

    <router-link v-if="xsrfToken.length === 0" to="/hero/login" style="margin-left: 10px;">
      <v-btn
          elevation="2"
          text
      >
        HERO LOGIN
        <v-icon
            right
            dark
        >mdi-account</v-icon>
      </v-btn>
    </router-link>
    <router-link v-else to="/hero/login">
      <v-btn
          elevation="2"
          text
          @click="heroLogout">
        HERO LOGOUT
        <v-icon
            right
            dark
        >mdi-logout</v-icon>
      </v-btn>
    </router-link>

    <router-link v-if="orgPassword.length === 0" to="/org/login" style="margin-left: 10px;">
      <v-btn
          elevation="2"
          text
      >
        ORG LOGIN
        <v-icon
            right
            dark
        >mdi-earth</v-icon>
      </v-btn>
    </router-link>
    <router-link v-else to="/org/login" style="margin-left: 10px;">
      <v-btn
          elevation="2"
          text
          @click="orgLogout">
        ORG LOGOUT
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