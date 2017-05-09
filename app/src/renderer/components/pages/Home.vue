<template lang="html">
  <div class="home-container">
    <div v-if="storiesData.date">
      <!-- 头部 -->
      <zhihu-header></zhihu-header>      
      <!-- 轮播图 -->
      <zhihu-carousel :carousel-data="storiesData.top_stories"></zhihu-carousel>
      <!-- 最新文章列表标题 -->
      <h1 class="lastStory-title">最新文章</h1>
      <!-- 最新文章列表 -->
      <artical-list :stories-data="storiesData"></artical-list>
    </div>
    <!-- 加载动画 -->
    <loading v-else></loading>
  </div>
</template>


<script>
import ajax from '../../../service/http.js'
import ZhihuCarousel from 'components/ui/Carousel'
import ZhihuHeader from 'components/ui/Header'
import ArticalList from 'components/ui/ArticalList'
import Loading from 'components/ui/Loading'
export default {
  name: "Home",
  data () {
    return {
      storiesData: [],
      ajax,
      url: {
        url: '/api/v1/last-stories'
      }
    };
  },
  components: {
    ZhihuHeader,
    ArticalList,
    ZhihuCarousel,
    Loading
  },
  mounted () {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;
    let currentDay = currentDate.getDate();
    currentMonth = currentMonth < 10 ? '0' + currentMonth : currentMonth;
    currentDay = currentDay < 10 ? '0' + currentDay : currentDay;
    let lastDate = currentYear.toString() + currentMonth.toString() + currentDay.toString();
    let dbData = sessionStorage.getItem(lastDate);
    if (dbData) {
       this.storiesData = JSON.parse(dbData);
    } else {
      ajax.get(this.url)
      .then(response => {
        sessionStorage.clear();
        this.storiesData = response.data.STORIES;
        let str = JSON.stringify(this.storiesData);
        sessionStorage.setItem(this.storiesData.date, str);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
}
</script>


<style lang="less" scoped>
  @font-color: rgb(53,53,53);
  .home-container {
    margin: 0;
  }

  .lastStory-title {
    margin-top: 40px;
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    color: @font-color;
  }
</style>