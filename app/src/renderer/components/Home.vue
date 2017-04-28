<template lang="html">
  <div class="home-container">
    <zhihu-header></zhihu-header>
    <div v-if="storiesData.date">
      <!-- carousel -->
      <el-carousel class="carousel" :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in storiesData.top_stories" :key="item.id">
          <div class="carousel-img--wrapper">
            <div class="carousel-text">
              <p>
                &nbsp;&nbsp;&nbsp;{{ item.title }}   
              </p>
            </div>
            <router-link :to="'/contents/' + item.id">
              <img class="carousel-img" :src="item.image" :alt="item.title">
            </router-link>
          </div>
        </el-carousel-item>
      </el-carousel>
      <!-- lastStories title -->
      <h1 class="lastStory-title">最新文章</h1>  
      <!-- lastStory list -->  
      <artical-list :stories-data="storiesData"></artical-list>
    </div>
    <div v-else class="loading-container">
      <h1>欢迎使用知乎日报</h1>
      <h2>Designed by Trevor</h2>
      <mu-circular-progress class="loading" :size="60" :strokeWidth="5" color="#ff4081"/>   
    </div> 
  </div>
</template>


<script>
import zhihuHeader from './Header'
import ArticalList from './ArticalList'
import url from '../../assetes/url.json'
export default {
  name: "Home",
  data () {
    return {
      storiesData: [],
      url
    };
  },
  components: {
    zhihuHeader,
    ArticalList
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
      let URL = this.url[0].data + '/api/v1/last-stories';
      this.$http.get(URL).then(response => {
        // success callback
        sessionStorage.clear( );
        this.storiesData = response.data.STORIES;
        let str = JSON.stringify(this.storiesData);
        sessionStorage.setItem(this.storiesData.date, str);
      }, response => {
          // error callback
          console.log(response);
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

  .lastStory-title {
    margin-top: 40px;
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    color: @font-color;
  }

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