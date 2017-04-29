<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import store from 'renderer/vuex/store'
  export default {
    store,
    name: "App",
    data () {
      return {
      };
    }
  }
</script>

<style lang="less">
  ::-webkit-scrollbar{width: 0}
</style>
