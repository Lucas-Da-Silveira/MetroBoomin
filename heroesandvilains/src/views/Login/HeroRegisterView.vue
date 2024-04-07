<script>
import {mapActions, mapMutations, mapState} from "vuex";
import NotificationAlert from "@/components/NotificationAlert.vue";
export default {
  name: 'HeroRegisterView',
  components: {NotificationAlert},
  data: () => ({
    valid: false,

    newUser: {
      login: '',
      password: '',
      hero: '',
      captchaToken: ''
    },

    textFieldRules: [
      v => !!v || 'Field cannot be empty',
    ],
  }),
  computed: {
    ...mapState('appdataStore', ['heroAliases']),
  },
  methods: {
    ...mapActions('heroStore', ['heroRegister']),
    ...mapActions('appdataStore', ['loadHeroAliases']),
    ...mapMutations('appdataStore', ['showNotif']),
    async validate () {
      this.$refs.form.validate();
      this.valid = this.newUser.login !== '' && this.newUser.password !== '' && this.newUser.hero !== '';
      if(this.valid) {
        await this.heroRegister(this.newUser);
        this.showNotif('Hero registered successfully', 'success')
        console.log(this.newUser);

      }
    },
  },
  mounted() {
    this.loadHeroAliases();
  }
}
</script>

<template>
  <v-container class="container">
    <NotificationAlert></NotificationAlert>
    <v-card>
      <v-card-title>Hero Register</v-card-title>
      <v-card-text>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
          <v-text-field
              v-model="newUser.login"
              :rules="textFieldRules"
              label="Login"
              solo
              required
          ></v-text-field>
          <v-text-field
              v-model="newUser.password"
              :rules="textFieldRules"
              label="Password"
              solo
              required
          ></v-text-field>
          <v-combobox
              v-model="newUser.hero"
              :items="heroAliases"
              item-value="publicName"
              item-text="publicName"
              label="Hero"
              clearable
              solo
          >
          </v-combobox>

          <!-- CAPTCHA -->

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
          REGISTER
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