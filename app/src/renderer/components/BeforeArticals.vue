<template lang="html">
  <div class="BeforeArticals-container">
    <zhihu-header :title="headerTitle"></zhihu-header>
    <!-- 过往精选文章列表 -->
    <div class="BeforeArticalList-wrap">
      <div class="date-picker">
        <i class="iconfont icon-calendar"></i>
        <mu-date-picker mode="landscape" v-model="datePicker" hintText="选择日期" minDate="2013-05-20" :maxDate="lastDate" @change="pickDate" :underlineShow="false"/>
      </div>
      <artical-list :stories-data="beforeArticalsData"></artical-list>
    </div>
    <div v-if="!datePicker" class="loading loading-text">
      <h1>暂未选择日期</h1>
    </div>
    <mu-circular-progress v-if="datePicker && !beforeArticalsData.date" class="loading" :size="60" :strokeWidth="5" color="#ff4081"/> 
  </div>
</template>


<script>
import zhihuHeader from './Header'
import ArticalList from './ArticalList'
import url from '../../assetes/url.json'

export default {
  name: "BeforeArticals",
  data () {
    return {
      url,
      headerTitle: '过往精选',
      beforeArticalsData: [],
      total: 500,
      current: 1,
      datePicker: '',
      lastDate: ''
    };
  },
  components: {
    zhihuHeader,
    ArticalList
  },
  methods: {
    pickDate (date) {
      let beforeArticalsKey = this.$route.path + '/' + date.replace(/[^0-9]/ig,"");
      let dbData = sessionStorage.getItem(beforeArticalsKey);
      if(dbData) {
        this.beforeArticalsData = JSON.parse(dbData);
      } else {
        var URL = this.url[0].data + '/api/v1/before-stories/' + date.replace(/[^0-9]/ig,"");
        this.$http.get(URL).then(response => {
          // success callback
          this.beforeArticalsData = response.data.STORIES;
          let str = JSON.stringify(this.beforeArticalsData);
          sessionStorage.setItem(beforeArticalsKey, str);
        }, response => {
            // error callback
            console.log(response);
        });
      }
    }
  },
  mounted () {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;  
    let currentDay = currentDate.getDate();
    currentMonth = currentMonth < 10 ? '0' + currentMonth : currentMonth;        
    currentDay = currentDay < 10 ? '0' + currentDay : currentDay;    
    this.lastDate = currentYear.toString() + '-' + currentMonth.toString() + '-' + currentDay.toString();
  }
}
</script>


<style lang="less" scoped>
  .BeforeArticals-container {
    margin: 0 30px;
  }

  .BeforeArticalList-wrap {
    margin-top: 100px;
  }

  .date-picker {
    margin-left: 175px;
    text-align: center;
  }

  .loading-text {
    & > h1 {
      font-size: 24px;
      color: #ec407a;
    }
  }

  .loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>