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
      selectToogle: false,
      selectedTeam: null,
      linkLoading: false
    };
  },
  computed: {
    ...mapState(['currentOrg', 'currentTeam', 'teams']),
  },
  watch: {
    selectToogle() {
      if (this.selectToogle) {
        this.$store.dispatch('loadTeams');
      }
    }
  },
  methods: {
    ...mapActions(['loadTeamDetails', 'addTeam', 'removeTeam']),
    ...mapMutations(['setCurrentTeam']),

    async seeTeamInfo(team) {
      this.setCurrentTeam(team);
      await this.$router.push(`/teams/${team._id}`);
    },

    async linkTeam() { // FIXME: ne fonctionne pas
      this.linkLoading = true;
      console.log(this.selectedTeam, this.$route.params.id);
      await this.addTeam(this.selectedTeam).then(() => {
        this.linkLoading = false;
      });
    },

    async unlinkTeam(team) {
      await this.removeTeam(team);
    }
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
          <v-autocomplete
              v-model="selectedTeam"
              :items="teams"
              item-text="name"
              item-value="_id"
              label="Team"
              outlined
              v-show="selectToogle"
          >
            <template v-slot:append-outer>
              <v-btn color="error" @click="selectToogle = !selectToogle" fab small>
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-btn color="success" @click="linkTeam" fab small :loading="linkLoading" :disabled="!!!selectedTeam">
                <v-icon>mdi-check</v-icon>
              </v-btn>

            </template>
          </v-autocomplete>
          <v-btn v-show="!selectToogle" color="primary" @click="selectToogle = !selectToogle">
            LINK TEAM
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn color="primary" @click="seeTeamInfo(item)">
          INFO
        </v-btn>
        <v-btn color="primary" @click="unlinkTeam(item)">
          UNLINK
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