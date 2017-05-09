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
  </div>
</template>


<script>
import ajax from '../../../service/http.js'
import zhihuHeader from 'components/ui/Header'
import ArticalList from 'components/ui/ArticalList'

export default {
  name: "BeforeArticals",
  data () {
    return {
      url: {
        url: ''
      },
      headerTitle: '过往精选',
      beforeArticalsData: [],
      total: 500,
      current: 1,
      datePicker: '',
      lastDate: '',
      ajax
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
        this.url.url = '/api/v1/before-stories/' + date.replace(/[^0-9]/ig,"");
        ajax.get(this.url)
        .then(response => {
          this.beforeArticalsData = response.data.STORIES;
          let str = JSON.stringify(this.beforeArticalsData);
          sessionStorage.setItem(beforeArticalsKey, str);
        })
        .catch(error => {
          console.log(error);
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
    margin-left: 185px;
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