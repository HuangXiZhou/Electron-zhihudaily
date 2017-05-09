<template lang="html">
  <div class="home-container">
    <zhihu-header></zhihu-header>
    <div v-if="storiesData.date">
      <!-- 轮播图 -->
      <zhihu-carousel :carousel-data="storiesData.top_stories"></zhihu-carousel>
      <!-- 最新文章列表标题 -->
      <h1 class="lastStory-title">最新文章</h1>  
      <!-- 最新文章列表 -->  
      <artical-list :stories-data="storiesData"></artical-list>
    </div>
    <!-- 加载视图 -->
    <home-loading v-else></home-loading>
  </div>
</template>


<script>
import ajax from '../../../service/http.js'
import ZhihuCarousel from '../ui/Carousel'
import ZhihuHeader from '../ui/Header'
import ArticalList from '../ui/ArticalList'
import HomeLoading from '../ui/HomeLoading'
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
    HomeLoading
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
    margin: 0 30px;
  }

  .lastStory-title {
    margin-top: 40px;
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    color: @font-color;
  }

  // .loading-container {
  //   position: fixed;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  //   text-align: center;
  //   color: #7e57c2;
  //   & > h1 {
  //     font-size: 40px;
  //   }
  //   & > h2 {
  //     text-align: right;
  //     color: #212121;
  //   }
  //   .loading {
  //     margin-top: 80px; 
  //   }
  // }
</style>