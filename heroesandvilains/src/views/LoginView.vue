<script>
import {mapMutations, mapActions} from "vuex";
export default {
  name: 'LoginView',
  data: () => ({
    valid: true,
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
    ],
  }),
  methods: {
    ...mapMutations('appdataStore', ['setOrgPassword']),
    ...mapActions('appdataStore', ['authenticateOrganization']),
    validate () {
      this.$refs.form.validate();
      this.valid = this.password !== '';
      if(this.valid) {
        this.setOrgPassword(this.password);
        this.$router.push('/');
      }
    },
  },
}
</script>

<template>
  <v-container>
    <v-card style="width: 50%; margin: 0 auto;">
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
          <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
        >
          Login
        </v-btn>
      </v-card-actions>
    </v-card>

  </v-container>
</template>

<style scoped>

</style>