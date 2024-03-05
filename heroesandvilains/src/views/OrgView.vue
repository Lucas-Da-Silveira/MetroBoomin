<script>
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: 'OrgView',
  data() {
    return {
      headers: [
        {text: 'Name', align: 'start', sortable: true, value: 'name'},
        {text: 'Actions', value: 'actions', sortable: false},
      ],
      dialogVisible: false,
    };
  },
  computed: {
    ...mapState(['currentOrg', 'currentTeam']),
  },
  methods: {
    ...mapActions(['loadTeamDetails']),
    ...mapMutations(['setCurrentTeam']),
    async handleClick(team) {
      await this.loadTeamDetails(team._id);
      await this.$router.push(`/teams/${team._id}`);
    },
  },
}
</script>

<template>
  <v-container>
    <v-data-table
        :headers="headers"
        :items="currentOrg[0].teams"
        :items-per-page="5"
        class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Teams in {{ currentOrg[0].name }}</v-toolbar-title>
          <v-spacer/>
          <v-btn id="open-create-dialog" color="primary">ADD TEAM</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn color="primary" @click="handleClick(item)">
          INFO
        </v-btn>
      </template>
    </v-data-table>

<!--    <v-dialog v-model="dialogVisible" max-width="600">-->
<!--      <v-card>-->
<!--        <v-card-title>Create New Org</v-card-title>-->
<!--        <v-card-text>-->
<!--          <v-form @submit.prevent="createNewOrg">-->
<!--            <v-text-field v-model="newOrgName" label="Org Name"></v-text-field>-->
<!--            <v-text-field v-model="newOrgPassword" label="Org Password"></v-text-field>-->
<!--            <v-card-actions>-->
<!--              <v-btn color="green" dark type="submit">Create</v-btn>-->
<!--              <v-btn color="red" dark @click="closeOrgCreationDialog">Cancel</v-btn>-->
<!--            </v-card-actions>-->
<!--          </v-form>-->
<!--        </v-card-text>-->
<!--      </v-card>-->
<!--    </v-dialog>-->
  </v-container>
</template>

<style scoped>

</style>