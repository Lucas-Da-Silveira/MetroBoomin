<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'NotificationAlert',
  computed: {
    ...mapState('appdataStore', ['notifOn', 'notifMsg', 'notifType', 'notifColor'])
  },
  methods: {
    ...mapMutations('appdataStore', ['showNotif'])
  }
};
</script>

<template>
  <v-alert
      v-if="notifOn"
      text
      :type="notifType"
      :color="notifColor"
  >{{ notifMsg }}</v-alert>
</template>