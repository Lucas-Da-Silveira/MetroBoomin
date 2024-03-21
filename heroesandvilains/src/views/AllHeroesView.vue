<script>
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
  name: 'HeroesView',
  computed: {
    ...mapState(['heroAliases', 'heroPowers']),
  },
  data() {
    return {
      headers: [
        {text: 'Public Name', align: 'start', sortable: true, value: 'publicName'},
        {text: 'Actions', value: 'actions', sortable: false},
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
      powerTypes: ['Force', 'Vitesse', 'Endurance', 'Magie', 'Effrayant', 'Furtivité', 'Stupidité']
    };
  },
  methods: {
    ...mapActions(['loadHeroAliases', 'loadHeroDetails', 'createHero']),
    ...mapMutations(['setCurrentHero']),
    filterText (value, search) {
      search = search.toString().toLocaleLowerCase();
      return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleLowerCase().indexOf(search) !== -1
    },
    openHeroCreationDialog() {
      this.dialogVisible = true;
    },
    closeHeroCreationDialog() {
      this.dialogVisible = false;
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
    async handleClick(org) {
      await this.loadOrgDetails(org._id);
      if(!this.currentOrg.error) {
        await this.$router.push(`/orgs/${org._id}`);
      } else {
        alert('Wrong password for this org');
      }
    },
    async createNewHero() {
      try {
        // console.log({publicName: this.newHeroPublicName, realName: this.newHeroRealName, powers: this.selectedPowers});
        await this.createHero({publicName: this.newHeroPublicName, realName: this.newHeroRealName, powers: this.selectedPowers});

        this.newHeroPublicName = '';
        this.newHeroRealName = '';
        this.selectedPowers = [];

        this.closeHeroCreationDialog();
      } catch(err) {
        console.error(err);
      }
    },
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
        :custom-filter="filterText"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Heroes</v-toolbar-title>
          <v-spacer/>
          <v-text-field
              v-model="search"
              label="Search Hero"
              append-icon="mdi-magnify"
              class="mx-4"
              style="margin-top: 20px;"
          ></v-text-field>
          <v-spacer/>
          <v-btn id="open-create-dialog" color="primary" @click="openHeroCreationDialog">NEW HERO</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn color="primary" @click="handleClick(item)">
          INFO
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="dialogVisible" max-width="600">
      <v-card>
        <v-card-title>Create New Hero</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="createNewHero">
            <v-text-field v-model="newHeroPublicName" label="Public Name"></v-text-field>
            <v-text-field v-model="newHeroRealName" label="Real Name"></v-text-field>

            <v-btn @click="showPowerForm = true">New Power</v-btn>

            <v-form v-if="showPowerForm">
              <v-text-field v-model="newPowerName" label="Power Name"></v-text-field>
              <v-select v-model="newPowerType" :items="powerTypes" label="Power Type"></v-select>
              <v-slider v-model="newPowerLevel" label="Power Level" thumb-label></v-slider>
              <v-btn @click="addNewPower">Save Power</v-btn>
            </v-form>

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