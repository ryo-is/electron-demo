<template lang="pug">
  .home
    .title.py-4 Main View
    v-divider
    v-btn(to="/users") users
    v-btn(@click="onNotification") notification
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    onNotification() {
      // actionはServiceWorker内でのみサポート
      new Notification('notification', {
        body: 'notification body',
      })
    },
  },
})
</script>
