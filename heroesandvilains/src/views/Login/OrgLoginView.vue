<script>
import {mapActions} from "vuex";
import NotificationAlert from "@/components/NotificationAlert.vue";
export default {
  name: 'OrgLoginView',
  components: {NotificationAlert},
  data: () => ({
    valid: true,

    password: '',

    textFieldRules: [
      v => !!v || 'Field cannot be empty',
    ],
  }),
  methods: {
    ...mapActions('appdataStore', ['authenticateOrganization']),
    async validate () {
      this.$refs.form.validate();
      this.valid = this.password !== '';
      if(this.valid) {
        await this.authenticateOrganization(this.password)
        await this.$router.push('/orgs');
      }
    },
  },
}
</script>

<template>
  <v-container class="container">
    <NotificationAlert></NotificationAlert>
    <v-card>
      <v-card-title>Org Login</v-card-title>
      <v-card-text>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
          <v-text-field
              v-model="password"
              :rules="textFieldRules"
              label="Password"
              solo
              required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
            type="submit"
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
        >
          LOGIN
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>
.container {
  width: 50%;
}
</style>