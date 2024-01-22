<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'OrgsView',
  computed: {
    ...mapState(['orgs']),
  },
  data() {
    return {
      headers: [
        {text: 'Name', align: 'start', sortable: true, value: 'name'},
        {text: 'Actions', sortable: false, value: 'actions'},
      ],
      dialogVisible: false,
      newOrgName: '',
      newOrgPassword: '',
    };
  },
  methods: {
    ...mapActions(['loadOrgs', 'createOrg']),
    openOrgCreationDialog() {
      this.dialogVisible = true;
    },
    closeOrgCreationDialog() {
      this.dialogVisible = false;
      this.newOrgName = '';
      this.newOrgPassword = '';
    },
    async createNewOrg() {
      try {
        await this.createOrg({name: this.newOrgName, password: this.newOrgPassword});
        this.closeOrgCreationDialog();
      } catch(err) {
        console.error(err);
      }
    },
  },
  mounted() {
    this.loadOrgs();
    console.log(this.orgs)
  },
};
</script>

<template>
  <v-container class="container">
    <v-data-table
        :headers="headers"
        :items="orgs"
        :items-per-page="5"
        class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Organisations</v-toolbar-title>
          <v-spacer/>
          <v-btn id="open-create-dialog" color="primary" @click="openOrgCreationDialog">NEW ORG</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:actions="{  }"> <!-- FIXME: faire en sorte que les orgas aient un bouton info (demander à domas?) -->
        <v-icon small color="black">
          mdi-information-box
        </v-icon>
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
              <v-btn color="green" type="submit">Create</v-btn>
              <v-btn @click="closeOrgCreationDialog">Cancel</v-btn>
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