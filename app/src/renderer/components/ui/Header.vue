<template lang="html">
  <div>
    <mu-appbar class="app-bar" :title="'知乎日报 | ' + title">
      <mu-icon-button :style=" icon === 'close' ? 'visibility: visible' : 'visibility: hidden' " :icon="icon" slot="left" @click="back()"/>
      <mu-flat-button class="link-span" label="每日推荐" href="#/" slot="right"/>
      <mu-flat-button class="link-span" label="主题日报" href="#/themes" slot="right"/>
      <mu-flat-button class="link-span" label="过往精选" href="#/beforeArticals" slot="right"/>
    </mu-appbar>
  </div>
</template>


<script>
export default {
  name: "Header",
  data () {
    return {
    };
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  props: {
    icon: {
      type: String
    },
    title: {
      type: String,
      default: "每日推荐"
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

  .link-span {
    text-decoration: none;
  }
</style>