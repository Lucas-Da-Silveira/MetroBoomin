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
        // Add other headers as needed based on your team data structure
      ],
      dialogVisible: false,
      newTeamName: '',
      // Add other properties for new team creation as needed
    };
  },
  methods: {
    ...mapActions(['loadTeams', 'createTeam']),
    openTeamCreationDialog() {
      this.dialogVisible = true;
    },
    closeTeamCreationDialog() {
      this.dialogVisible = false;
      // Reset any form fields if needed
      this.newTeamName = '';
    },
    createNewTeam() {
      // Add logic to create a new team and update the list
      this.createTeam({name: this.newTeamName /* Add other properties */})
          .then(() => {
            // Close the dialog and reset form fields
            this.closeTeamCreationDialog();
          })
          .catch((error) => {
            console.error('Error creating team:', error.message);
            // Handle error if needed
          });
    },
  },
  created() {
    // Load teams when the component is created
    this.loadTeams();
  },
};
</script>

<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="teams"
        :items-per-page="5"
        class="elevation-1"
    ></v-data-table>

    <!-- Button to trigger team creation -->
    <v-btn @click="openTeamCreationDialog">Create New Team</v-btn>

    <!-- Dialog for creating a new team -->
    <v-dialog v-model="dialogVisible" max-width="600">
      <v-card>
        <v-card-title>Create New Team</v-card-title>
        <v-card-text>
          <!-- Your form for creating a new team goes here -->
          <!-- Example: -->
          <v-form @submit.prevent="createNewTeam">
            <v-text-field v-model="newTeamName" label="Team Name"></v-text-field>
            <!-- Add other form fields as needed -->
            <v-btn type="submit">Create</v-btn>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeTeamCreationDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>

</style>