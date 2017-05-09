<template lang="html">
  <div v-else class="loading-container">
    <h1>欢迎使用知乎日报</h1>
    <h2>Designed by Trevor</h2>
    <mu-circular-progress class="loading" :size="60" :strokeWidth="5" color="#ff4081"/>   
  </div> 
</template>


<script>
export default {
  name: "HomeLoading",
  data () {
    return {
    };
  }
}
</script>


<style lang="less" scoped>
  .loading-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #7e57c2;
    & > h1 {
      font-size: 40px;
    }
    & > h2 {
      text-align: right;
      color: #212121;
    }
    .loading {
      margin-top: 80px; 
    }
  }
</style>