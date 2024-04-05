<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import NotificationAlert from "@/components/NotificationAlert.vue";
export default {
  name: 'OrgsView',
  components: {NotificationAlert},
  computed: {
    ...mapState('appdataStore', ['orgs', 'orgPassword', 'currentOrg']),
  },
  data() {
    return {
      headers: [
        {text: 'Name', align: 'start', sortable: true, value: 'name'},
        {text: 'Actions', value: 'actions', sortable: false},
      ],
      dialogVisible: false,
      newOrgName: '',
      newOrgPassword: '',
      search: '',

      notifOn: false,
      notifMsg: ''
    };
  },
  methods: {
    ...mapActions('appdataStore', ['loadOrgs', 'loadOrgDetails', 'createOrg', 'authenticateOrganization']),
    ...mapMutations('errorStore', ['pushError']),
    ...mapMutations('appdataStore', ['showNotif']),
    openOrgCreationDialog() {
      this.dialogVisible = true;
    },
    closeOrgCreationDialog() {
      this.dialogVisible = false;
      this.newOrgName = '';
      this.newOrgPassword = '';
    },
    async handleClick(org) {
      await this.loadOrgDetails(org._id);
      if(!this.currentOrg.error) {
        await this.$router.push(`/orgs/${org._id}`);
      } else {
        this.pushError("Wrong password for this organization.");
      }
    },
    async createNewOrg() {
      try {
        await this.createOrg({name: this.newOrgName, password: this.newOrgPassword});
        this.closeOrgCreationDialog();
        this.showNotif({msg: "Organisation created successfully.", type: "success", color: "green"});
      } catch(err) {
        console.error(err);
      }
    }
  },
  mounted() {
    this.loadOrgs();
  },
};
</script>

<template>
  <v-container class="container">
    <NotificationAlert></NotificationAlert>
    <v-data-table
        :headers="headers"
        :items="orgs"
        :items-per-page="5"
        class="elevation-1"
        :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Organisations</v-toolbar-title>
          <v-spacer/>
          <v-text-field
              v-model="search"
              label="Search Org"
              class="mx-4"
              append-icon="mdi-magnify"
              style="margin-top: 20px;"
          ></v-text-field>
          <v-spacer/>
          <v-btn id="open-create-dialog" color="primary" @click="openOrgCreationDialog">NEW ORG</v-btn>
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
        <v-card-title>Create New Org</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="createNewOrg">
            <v-text-field v-model="newOrgName" label="Org Name"></v-text-field>
            <v-text-field v-model="newOrgPassword" label="Org Password"></v-text-field>
            <v-card-actions>
              <v-btn color="green" dark type="submit">Create</v-btn>
              <v-btn color="red" dark @click="closeOrgCreationDialog">Cancel</v-btn>
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