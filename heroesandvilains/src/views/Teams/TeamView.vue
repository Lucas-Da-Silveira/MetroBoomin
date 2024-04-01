<script>
import {mapActions, mapMutations, mapState} from "vuex";
import {forEach} from "core-js/internals/array-iteration";

export default {
  name: 'TeamView',
  data() {
    return {
      headers: [
        {text: 'Public Name', align: 'start', sortable: true, value: 'publicName'},
        {text: 'Actions', value: 'actions', sortable: false},
      ],
      dialogVisible: false,
      selectToogle: false,
      selectedHero: null,
      linkLoading: false,

      heroes: [],
    };
  },
  computed: {
    ...mapState(['currentOrg', 'currentTeam', 'heroAliases']),
  },
  watch: {
    selectToogle() {
      if (this.selectToogle) {
        this.$store.dispatch('loadHeroAliases');
      }
    },
  },
  methods: {
    ...mapActions(['loadTeamDetails', 'addHero', 'removeHero', 'loadHeroDetails']),
    ...mapMutations(['setCurrentTeam']),

    async seeHeroInfo(hero) {
      await this.loadHeroDetails(hero._id);
      await this.$router.push(`/heroes/${hero._id}`);
    },

    async linkHero() {
      this.linkLoading = true;
      await this.addHero(this.selectedHero).then(() => {
        this.heroes = [];
        this.linkLoading = false;
      });
      await this.fetchHeroes();
    },

    async unlinkHero(hero) {
      await this.removeHero(hero).then(() => {
        this.heroes = [];
      });
      await this.fetchHeroes();
    },

    async fetchHeroes() {
      forEach(this.currentTeam.members, async (heroId) => {
        await this.loadHeroDetails(heroId).then((hero) => {
          this.heroes.push(hero[0]);
        });
      });
    }
  },
  mounted() {
    this.fetchHeroes();
  }
}
</script>

<template>
  <v-container class="container">
    <v-data-table
        :headers="headers"
        :items="heroes"
        :items-per-page="5"
        class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Heroes in {{ currentTeam.name }}</v-toolbar-title>
          <v-spacer/>
          <v-autocomplete
              v-model="selectedHero"
              :items="heroAliases"
              item-text="publicName"
              item-value="_id"
              label="Hero"
              outlined
              v-show="selectToogle"
          >
            <template v-slot:append-outer>
              <v-btn color="error" @click="selectToogle = !selectToogle" fab small>
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-btn color="success" @click="linkHero" fab small :loading="linkLoading" :disabled="!!!selectedHero">
                <v-icon>mdi-check</v-icon>
              </v-btn>

            </template>
          </v-autocomplete>
          <v-btn v-show="!selectToogle" color="primary" @click="selectToogle = !selectToogle">
            LINK HERO
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn color="primary" @click="seeHeroInfo(item)">
          INFO
        </v-btn>
        <v-btn color="primary" @click="unlinkHero(item)">
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