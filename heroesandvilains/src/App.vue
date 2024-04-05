<template>
  <v-app>
    <ErrorDialog
        title="ERROR"
        width="600"
    >
    </ErrorDialog>

    <NavBar/>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import ErrorDialog from "@/components/ErrorDialog.vue";

export default {
  name: 'App',
  components: {
    NavBar,
    ErrorDialog
  },
};
</script>
