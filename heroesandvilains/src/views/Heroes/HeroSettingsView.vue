<script>
import NotificationAlert from "@/components/NotificationAlert.vue";
import {mapActions, mapMutations, mapState} from "vuex";
export default {
  name: 'HeroSettingsView',
  components: {NotificationAlert},
  data: () => ({
    headers: [
      { text: "Name", value: "name" },
      { text: "Type", value: "type" },
      { text: "Level", value: "level" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    powerTypes: ['Force', 'Vitesse', 'Endurance', 'Magie', 'Effrayant', 'Furtivité', 'Stupidité'],
    isChanged: false,
    heroData: {
      login: '',
      hero: {
        _id: '',
        publicName: '',
        realName: '',
        powers: []
      }
    },
    deleteDialogVisible: false,
    createDialogVisible: false,
    powerToRemove: {
      name: '',
      type: 0,
      level: 0
    },
    newPower: {
      name: '',
      type: 0,
      level: 0
    },
    search: '',
  }),
  computed: {
    ...mapState('heroStore', ['hero']),
  },
  methods: {
    ...mapMutations('appdataStore', ['showNotif']),
    ...mapActions('heroStore', ['heroUpdate']),
    checkIfChanged() {
      this.isChanged = this.heroData.hero.publicName !== this.hero.hero.publicName ||
          this.heroData.hero.realName !== this.hero.hero.realName ||
          JSON.stringify(this.heroData.hero.powers) !== JSON.stringify(this.hero.hero.powers);
    },

    getPowerType(type) {
      return this.powerTypes[type - 1];
    },

    fetchHeroData() {
      this.heroData = {
        login: this.hero.login,
        hero: {
          _id: this.hero.hero._id,
          publicName: this.hero.hero.publicName,
          realName: this.hero.hero.realName,
          powers: JSON.parse(JSON.stringify(this.hero.hero.powers))
        }
      };
      this.checkIfChanged();
    },

    openConfirmDialog(power) {
      this.powerToRemove = power;
      this.deleteDialogVisible = true;
    },
    closeConfirmDialog() {
      this.deleteDialogVisible = false;
      this.powerToRemove = {
        name: '',
        type: 0,
        level: 0
      };
    },

    openPowerCreationDialog() {
      this.createDialogVisible = true;
    },
    closePowerCreationDialog() {
      this.createDialogVisible = false;
      this.newPower = {
        name: '',
        type: 0,
        level: 0
      };
    },

    addNewPower() {
      const typeIndex = this.powerTypes.indexOf(this.newPower.type);
      this.newPower.type = typeIndex + 1;

      this.heroData.hero.powers.push(this.newPower);
      this.checkIfChanged();

      this.newPower = {
        name: '',
        type: 0,
        level: 0
      };
      this.closePowerCreationDialog();

      this.showNotif({msg: "Power added successfully.", type: "success", color: "green"});
    },

    removePower(power) {
      this.heroData.hero.powers = this.heroData.hero.powers.filter(p => p.name !== power.name);
      this.closeConfirmDialog();
      this.checkIfChanged();

      this.showNotif({msg: "Power removed successfully.", type: "success", color: "red"});
    },

    async saveHero() {
      await this.heroUpdate(this.heroData).then(() => {
        this.fetchHeroData();
      });

      this.showNotif({msg: "Hero updated successfully.", type: "info", color: "blue"});
      this.checkIfChanged();
    }
  },
  mounted() {
    this.fetchHeroData();
  }
}
</script>

<template>
  <v-container class="container">
    <NotificationAlert></NotificationAlert>

    <v-card>
      <v-card-title>Settings for {{ heroData.login }}</v-card-title>

      <v-card-text>
        <div class="hero-info">
          <v-text-field
              class="infos"
              label="Public Name"
              v-model="heroData.hero.publicName"
              outlined
              @change="checkIfChanged"
          ></v-text-field>
          <v-text-field
              class="infos"
              label="Real Name"
              v-model="heroData.hero.realName"
              outlined
              @change="checkIfChanged"
          ></v-text-field>
        </div>

        <v-data-table
            :headers="headers"
            :items="heroData.hero.powers.map(power => ({...power, type: getPowerType(power.type)}))"
            item-key="name"
            :items-per-page="5"
            class="elevation-1"
            :search="search"
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
              <v-btn id="open-create-dialog" color="primary" @click="openPowerCreationDialog">ADD POWER</v-btn>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn color="error" @click="openConfirmDialog(item)" icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>


      <v-card-actions>
        <v-btn color="primary" :disabled="!isChanged" @click="saveHero">SAVE</v-btn>
        <v-btn v-if="isChanged" color="error" @click="fetchHeroData">CANCEL</v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="deleteDialogVisible" max-width="400">
      <v-card>
        <v-card-title>Are you sure?</v-card-title>
        <v-card-text>
          You are about to remove <b>{{ powerToRemove.name }}</b> from the hero.
        </v-card-text>
        <v-card-actions>
          <v-btn color="green" dark @click="removePower(powerToRemove)">CONFIRM</v-btn>
          <v-btn color="red" dark @click="closeConfirmDialog">CANCEL</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="createDialogVisible" max-width="600">
      <v-card>
        <v-card-title>Add New Power</v-card-title>
        <v-form @submit.prevent="addNewPower">
          <v-card-text>
            <v-text-field v-model="newPower.name" label="Power Name"></v-text-field>
            <v-select v-model="newPower.type" :items="powerTypes" label="Power Type"></v-select>
            <v-slider v-model="newPower.level" label="Power Level" thumb-label></v-slider>
          </v-card-text>
          <v-card-actions>
            <v-btn type="submit" color="primary">SAVE POWER</v-btn>
            <v-btn @click="closePowerCreationDialog">CANCEL</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>

.hero-info {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.infos {
  width: 50%;
  margin: 0 20px;
}
</style>