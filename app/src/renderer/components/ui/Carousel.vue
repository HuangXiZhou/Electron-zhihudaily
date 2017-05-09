<template lang="html">
  <el-carousel class="carousel" :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in carouselData" :key="item.id">
      <div class="carousel-img--wrapper">
        <div class="carousel-text">
          <p>
            {{ item.title }}   
          </p>
        </div>
        <router-link :to="'/contents/' + item.id">
          <img class="carousel-img" v-lazy="item.image" :alt="item.title">
        </router-link>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>


<script>
export default {
  name: "Carousel",
  data () {
    return {
    }
  },
  props: {
    carouselData: {
      type: [Array]
    }
  }
}
</script>


<style lang="less" scoped>
  .carousel {
    margin-top: 100px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    width: 720px;
  }

  .carousel-img {
    height: 300px;
  }

  .carousel-img--wrapper {
    position: relative;
  }

  .carousel-text {
    position: absolute;
    bottom: 100px;
    left: 30px;
    width: 300px;
    height: 80px;
    text-align: left;
    background: #555;
    opacity: .7;
    overflow: hidden;
    & > p {
      padding-top: -10px;
      padding-bottom: 10px;
      padding-left: 10px;
      padding-right: 10px;  
      text-decoration: none;    
      font-size: 16px;
      color: #fff;
      word-break: break-all;
    }
  }
</style>