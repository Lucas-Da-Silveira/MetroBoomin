<script>
import {mapActions, mapMutations, mapState} from "vuex";
import NotificationAlert from "@/components/NotificationAlert.vue";

export default {
  name: 'OrgView',
  components: {NotificationAlert},
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
    ...mapState('appdataStore', ['currentOrg', 'currentTeam', 'teams']),
  },
  watch: {
    selectToogle() {
      if (this.selectToogle) {
        this.loadTeams();
      }
    }
  },
  methods: {
    ...mapActions('appdataStore', ['loadTeams', 'loadTeamDetails', 'addTeam', 'removeTeam']),
    ...mapMutations('appdataStore', ['setCurrentTeam', 'showNotif']),

    async seeTeamInfo(team) {
      this.setCurrentTeam(team);
      await this.$router.push(`/teams/${team._id}`);
    },

    async linkTeam() {
      this.linkLoading = true;
      await this.addTeam(this.selectedTeam).then(() => {
        this.linkLoading = false;
      });

      this.selectToogle = false;
      this.showNotif({msg: "Team linked successfully.", type: "success", color: "blue"});
    },

    async unlinkTeam(team) {
      await this.removeTeam(team);
      this.showNotif({msg: "Team unlinked successfully.", type: "success", color: "blue"});
    }
  },
}
</script>

<template>
  <v-container class="container">
    <NotificationAlert></NotificationAlert>
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
              solo
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
  </v-container>
</template>

<style scoped>
.container {
  width: 60%;
}
</style>