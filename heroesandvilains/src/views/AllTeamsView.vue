<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'TeamsView',
  computed: {
    ...mapState(['teams']),
  },
  data() {
    return {
      headers: [
        {text: 'Team Name', align: 'start', sortable: true, value: 'name'},
      ],
      dialogVisible: false,
      newTeamName: '',
    };
  },
  methods: {
    ...mapActions(['loadTeams', 'createTeam']),
    openTeamCreationDialog() {
      this.dialogVisible = true;
    },
    closeTeamCreationDialog() {
      this.dialogVisible = false;
      this.newTeamName = '';
    },
    createNewTeam() {  //FIXME : mettre  en await et non try catch
      this.createTeam({name: this.newTeamName })
          .then(() => {
            this.closeTeamCreationDialog();
          })
          .catch((error) => {
            console.error('Error creating team:', error.message);
          });
    },
  },
  created() {
    this.loadTeams();
  },
};
</script>

<template>
 <v-container class="container">
    <v-data-table
        :headers="headers"
        :items="teams"
        :items-per-page="5"
        class="elevation-1"
    >

      <template v-slot:item.name="{ item }" >
        <router-link :to="{ name: 'team-id', params: { id: item.id } }" class="route">
          {{ item.name }}
        </router-link>
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Teams</v-toolbar-title>
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