<script>
import {mapState, mapActions, mapMutations} from 'vuex';
import NotificationAlert from "@/components/NotificationAlert.vue";
export default {
  name: 'TeamsView',
  components: {NotificationAlert},
  computed: {
    ...mapState('appdataStore', ['teams']),
  },
  data() {
    return {
      headers: [
        {text: 'Team Name', align: 'start', sortable: true, value: 'name'},
        {text: 'Nb affiliations', value: 'nbAffiliations', sortable: true},
      ],
      dialogVisible: false,
      newTeamName: '',
      search: '',
    };
  },
  methods: {
    ...mapActions('appdataStore', ['loadTeams', 'createTeam']),
    ...mapMutations('appdataStore', ['showNotif']),
    openTeamCreationDialog() {
      this.dialogVisible = true;
    },
    closeTeamCreationDialog() {
      this.dialogVisible = false;
      this.newTeamName = '';
    },
    createNewTeam() {
      try {
        this.createTeam({name: this.newTeamName});
        this.closeTeamCreationDialog();
        this.showNotif({msg: "Team created successfully.", type: "success", color: "green"});
      } catch(err) {
        console.error(err);
      }
    },
  },
  created() {
    this.loadTeams();
  },
};
</script>

<template>
 <v-container class="container">
   <NotificationAlert></NotificationAlert>
    <v-data-table
        :headers="headers"
        :items="teams"
        :items-per-page="5"
        class="elevation-1"
        :search="search"
    >

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Teams</v-toolbar-title>
          <v-spacer/>
          <v-text-field
              v-model="search"
              label="Search Team"
              class="mx-4"
              append-icon="mdi-magnify"
              style="margin-top: 20px;"
          ></v-text-field>
          <v-spacer/>
          <v-btn id="open-create-dialog" color="primary" @click="openTeamCreationDialog">NEW TEAM</v-btn>
        </v-toolbar>
      </template>
    </v-data-table>

    <v-dialog v-model="dialogVisible" max-width="600">
      <v-card>
        <v-card-title>Create New Team</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="createNewTeam">
            <v-text-field v-model="newTeamName" label="Team Name"></v-text-field>
            <v-card-actions>
              <v-btn color="green" dark type="submit">Create</v-btn>
              <v-btn color="red" dark @click="closeTeamCreationDialog">Cancel</v-btn>
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

.route {
  text-decoration: none;
  color: inherit;
}
</style>