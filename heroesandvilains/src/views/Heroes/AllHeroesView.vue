<script>
import {mapState, mapActions, mapMutations} from 'vuex';
export default {
  name: 'HeroesView',
  computed: {
    ...mapState('appdataStore', ['heroAliases', 'heroPowers', 'currentHero']),
  },
  data() {
    return {
      headers: [
        {text: 'Public Name', align: 'start', sortable: true, value: 'publicName'},
      ],
      dialogVisible: false,
      search: '',
      newHeroPublicName: '',
      newHeroRealName: '',
      selectedPowers: [],

      showPowerForm: false,
      newPowerName: '',
      newPowerType: null,
      newPowerLevel: 0,
      powerTypes: ['Force', 'Vitesse', 'Endurance', 'Magie', 'Effrayant', 'Furtivité', 'Stupidité'],

      notifOn: false,
      notifMsg: ''
    };
  },
  methods: {
    ...mapActions('appdataStore', ['loadHeroAliases', 'createHero']),
    ...mapMutations('errorStore', ['pushError']),
    ...mapMutations('appdataStore', ['showNotif']),
    openHeroCreationDialog() {
      this.dialogVisible = true;
    },
    closeHeroCreationDialog() {
      this.dialogVisible = false;
      this.showPowerForm = false;

      this.newHeroPublicName = '';
      this.newHeroRealName = '';
      this.selectedPowers = [];
    },
    addNewPower() {
      const typeIndex = this.powerTypes.indexOf(this.newPowerType);

      if (typeIndex !== -1) {
        this.heroPowers.push({
          name: this.newPowerName,
          type: typeIndex + 1,
          level: this.newPowerLevel
        });
      }

      this.newPowerName = '';
      this.newPowerType = null;
      this.newPowerLevel = 0;

      this.showPowerForm = false;
    },
    async createNewHero() {
      try {
        if(this.newHeroPublicName === '' || this.newHeroRealName === '' || this.selectedPowers.length === 0) {
          return this.pushError('Please fill in all fields.')
        }

        await this.createHero({publicName: this.newHeroPublicName, realName: this.newHeroRealName, powers: this.selectedPowers});

        this.closeHeroCreationDialog();
        this.showNotif({msg: "Hero created successfully.", type: "success", color: "green"});
      } catch(err) {
        console.error(err);
      }
    }
  },
  mounted() {
    this.loadHeroAliases();
  },
};
</script>

<template>
  <v-container class="container">
    <v-data-table
        :headers="headers"
        :items="heroAliases"
        :items-per-page="5"
        class="elevation-1"
        :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Heroes</v-toolbar-title>
          <v-spacer/>
          <v-text-field
              v-model="search"
              label="Search Hero"
              append-icon="mdi-magnify"
              style="margin-top: 20px;"
          ></v-text-field>
          <v-spacer/>
          <v-btn id="open-create-dialog" color="primary" @click="openHeroCreationDialog">NEW HERO</v-btn>
        </v-toolbar>
      </template>
    </v-data-table>

    <v-dialog v-model="dialogVisible" max-width="600">
      <v-card>
        <v-card-title>Create New Hero</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="createNewHero">
            <v-text-field v-model="newHeroPublicName" label="Public Name"></v-text-field>
            <v-text-field v-model="newHeroRealName" label="Real Name"></v-text-field>

            <v-btn v-if="!showPowerForm" @click="showPowerForm = true" color="primary" style="margin-bottom: 20px;">New Power</v-btn>

            <v-card v-if="showPowerForm" style="margin-bottom: 20px;">
              <v-form>
                <v-card-text>
                  <v-text-field v-model="newPowerName" label="Power Name"></v-text-field>
                  <v-select v-model="newPowerType" :items="powerTypes" label="Power Type"></v-select>
                  <v-slider v-model="newPowerLevel" label="Power Level" thumb-label></v-slider>
                </v-card-text>
                <v-card-actions>
                  <v-btn @click="addNewPower" color="primary">SAVE POWER</v-btn>
                  <v-btn @click="showPowerForm = false">CANCEL</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>

            <v-combobox
                v-model="selectedPowers"
                :items="heroPowers"
                item-value="name"
                item-text="name"
                label="Powers"
                small-chips
                multiple
                clearable
                solo
            >

            </v-combobox>
            <v-card-actions>
              <v-btn color="green" dark type="submit">Create</v-btn>
              <v-btn color="red" dark @click="closeHeroCreationDialog">Cancel</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.container {
  width: 60%;
}
</style>