<script>
import {mapActions} from "vuex";
import NotificationAlert from "@/components/NotificationAlert.vue";
export default {
  name: 'HeroLoginView',
  components: {NotificationAlert},
  data: () => ({
    valid: false,

    credentials: {
      login: '',
      password: '',
    },

    textFieldRules: [
      v => !!v || 'Field cannot be empty',
    ],
  }),
  methods: {
    ...mapActions('heroStore', ['heroLogin']),
    async validate () {
      this.$refs.form.validate();
      this.valid = this.login !== '' && this.password !== '';
      if(this.valid) {
        await this.heroLogin(this.credentials);
        await this.$router.push('/hero/settings');
      }
    },
  },
}
</script>

<template>
  <v-container class="container">
    <NotificationAlert></NotificationAlert>
    <v-card>
      <v-card-title>Hero Login</v-card-title>
      <v-card-text>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
          <v-text-field
              v-model="credentials.login"
              :rules="textFieldRules"
              label="Login"
              solo
              required
          ></v-text-field>
          <v-text-field
              v-model="credentials.password"
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