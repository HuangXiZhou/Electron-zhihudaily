<template lang="html">
  <div class="articalList-wrap">
    <div class="articalList-item" v-for="item in storiesData.stories" :key="item.id">
      <router-link :to="'/contents/' + item.id">
        <span v-if="item.title.length < 33"> {{ item.title }} </span>  
        <span v-else> {{ item.title.substring(0, 32) }}... </span>
        <img v-if="item.images" :src="item.images" :alt="item.title">
        <img v-else :src="logo" alt="无配图">        
      </router-link>
    </div>
  </div>
</template>


<script>
import logo from '../../../assetes/img/logo.png'
export default {
  name: "ArticalList",
  data () {
    return {
      logo
    };
  },
  props: {
    storiesData: {
      type: [Array, Object]
    }
  }
}
</script>


<style lang="less" scoped>
  .articalList-wrap {
    padding-bottom: 60px;
    margin: 0 auto;
    width: 720px;
  }

  .articalList-item {
    margin-top: 20px;
    width: 100%;
    height: 120px;
    border-radius: 3px;    
    box-shadow: 3px 3px 9px #ccc;
    background-color: #fff;
    transition: all .12s ease-in-out;
    & > a {
      color: #7e57c2;
      & > span {
        line-height: 50px;
        padding-left: 14px;
        font-size: 16px;
        font-weight: 300;
      }
      & > img {
        margin: 10px;
        float: right;
        width: 100px;
        height: 100px;
      }
      &:hover {
        text-decoration: none;
        color: #ec407a;
      }
    }
    &:hover {
      background-color: #eee;
    }
  }
</style>