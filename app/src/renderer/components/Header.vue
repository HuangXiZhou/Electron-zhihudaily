<template lang="html">
  <div>
    <mu-appbar class="app-bar" :title="'知乎日报 | ' + title">
      <mu-icon-button v-if="icon == 'menu'" :icon="icon" slot="left" @click="toggle(true)"/>      
      <mu-icon-button v-else :icon="icon" slot="left" @click="back()"/>
    </mu-appbar>
    <mu-drawer :open="open" :docked="docked" @close="toggle()">
      <mu-list @itemClick="docked ? '' : toggle()">
        <mu-list-item/>     
        <mu-list-item class="link-wrap">
          <router-link class="link-item" to="/">
            每日推荐
          </router-link>
        </mu-list-item>
        <mu-list-item class="link-wrap">
          <router-link class="link-item" to="/themes">
            主题日报
          </router-link>          
        </mu-list-item>
        <mu-list-item class="link-wrap">
          <router-link class="link-item" to="/beforeArticals">
            过往精选
          </router-link> 
        </mu-list-item>          
        <mu-list-item v-if="docked" @click.native="open = false" title="Close"/>
      </mu-list>
    </mu-drawer>
  </div>
</template>


<script>
export default {
  name: "Header",
  data () {
    return {
      open: false,
      docked: true
    };
  },
  methods: {
    toggle (flag) {
      this.open = !this.open
      this.docked = !flag
    },
    back () {
      this.$router.go(-1)
    }
  },
  props: {
    icon: {
      type: String,
      default: "menu"
    },
    title: {
      type: String,
      default: "首页"
    }
  }
}
</script>


<style lang="less" scoped>
  .app-bar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .link-wrap {
    text-align: center;
    .link-item {
      text-decoration: none;
      font-size: 16px;
      color: #444;
    }
  }
</style>