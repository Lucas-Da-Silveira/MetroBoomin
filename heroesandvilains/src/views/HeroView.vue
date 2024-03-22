<script>
import { mapState,  } from 'vuex';

export default {
  name: 'HeroView',
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Type", value: "type" },
        { text: "Level", value: "level" },
        { text: "Actions", value: "actions" }
      ],
      powerTypes: ['Force', 'Vitesse', 'Endurance', 'Magie', 'Effrayant', 'Furtivité', 'Stupidité'],
      heroData: {
        publicName: '',
        realName: '',
        powers: []
      },
      isChanged: false,
    }
  },
  computed: {
    ...mapState(['currentHero']),
  },
  methods: {
    checkIfChanged() {
      this.isChanged = this.heroData.publicName !== this.currentHero[0].publicName ||
          this.heroData.realName !== this.currentHero[0].realName ||
          this.heroData.powers !== this.currentHero[0].powers;
    },
    fetchHeroData() {
      this.heroData = {
        publicName: this.currentHero[0].publicName,
        realName: this.currentHero[0].realName,
        powers: this.currentHero[0].powers
      }
    }
  },
  mounted() {
    this.fetchHeroData();
  }
};
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>{{ currentHero[0].publicName }} ({{ currentHero[0].realName }})</v-card-title>
      <v-text-field
          label="Public Name"
          v-model="heroData.publicName"
          @change="checkIfChanged"
      ></v-text-field>
      <v-text-field
          label="Real Name"
          v-model="heroData.realName"
          @change="checkIfChanged"
      ></v-text-field>

      <!-- TODO: finir de remplir le tableau et faire le edit d'un héros -->
      <v-data-table
          :headers="headers"
          :items="heroData.powers"
          item-key="name"
          :items-per-page="5"
          class="elevation-1"
          @change="checkIfChanged"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Powers</v-toolbar-title>
            <v-spacer/>
            <v-text-field
                v-model="search"
                label="Search Power"
                append-icon="mdi-magnify"
                class="mx-4"
                style="margin-top: 20px;"
            ></v-text-field>
            <v-spacer/>
            <v-btn id="open-create-dialog" color="primary" @click="openHeroCreationDialog">ADD POWER</v-btn>
          </v-toolbar>
        </template>
      </v-data-table>

      <v-btn color="primary" :disabled="!isChanged">Save</v-btn>
    </v-card>
  </v-container>
</template>

<style scoped>

</style>