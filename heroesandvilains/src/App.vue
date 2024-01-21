<template>
  <v-app>
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
            <router-link v-for="route in routes"
                         :key="route.path"
                         :to="route.path">
              <v-list-item link>
                <v-list-item-title>
                  {{ route.name }}
                </v-list-item-title>
              </v-list-item>
            </router-link>
          </v-list>
        </v-menu>
      </div>

      <v-spacer></v-spacer>

      <router-link to="/login">
        <v-btn
            elevation="2"
            text
        >
          <span class="mr-2">Login</span>
          <v-icon color="white">mdi-account</v-icon>
        </v-btn>
      </router-link>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    routes: [
      { name: 'Home', path: '/'},
      { name: 'Organisations', path: '/orgs'},
      { name: 'Teams', path: '/teams'},
    ]
  }),
};
</script>
