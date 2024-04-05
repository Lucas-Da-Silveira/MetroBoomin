<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'ErrorDialog',
  props: {
    title: String,
    width: String,
  },
  computed: {
    ...mapState('errorStore', ['isError','errorMsg'])
  },
  methods: {
    ...mapMutations('errorStore', ['popError'])
  }
};
</script>

<template>
  <v-dialog
      :value="isError"
      persistent
      :max-width="width"
      :retain-focus="false"
  >
    <v-card>
      <v-card-title class="headline">
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{errorMsg}}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            dark
            color="green"
            @click="popError()"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>