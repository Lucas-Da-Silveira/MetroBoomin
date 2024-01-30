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
    ...mapMutations(['setOrgPassword']),
    ...mapActions(['authenticateOrganization']),
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
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        style="width: 30%; margin: auto;"
    >
      <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          required
      ></v-text-field>

      <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
      >
        Login
      </v-btn>
    </v-form>
  </v-container>
</template>

<style scoped>

</style>