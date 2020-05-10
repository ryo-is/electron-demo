<template lang="pug">
  v-app
    v-content
      main-view
</template>

<script lang="ts">
import Vue from 'vue'
import MainView from '@/views/MainView.vue'

export default Vue.extend({
  components: { MainView },
})
</script>

<style lang="scss">
#app {
  font-family: 'Hiragino Maru Gothic Pro', 'ヒラギノ角ゴ Pro W3', 'メイリオ',
    Meiryo, 'MS Pゴシック', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
