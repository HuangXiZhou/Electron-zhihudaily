<template lang="html">
  <div>
    <zhihu-header :icon="headerIcon" :title="headerTitle"></zhihu-header>
    <!-- 主题日报文章列表 -->
    <artical-list v-if="themeData.name" class="themeArticalList-wrap" :stories-data="themeData"></artical-list>
    <mu-circular-progress class="loading" v-else :size="60" :strokeWidth="5"/> 
  </div>
</template>


<script>
import zhihuHeader from './Header'
import ArticalList from './ArticalList'
import url from '../../assetes/url.json'
export default {
  name: "ThemeDes",
  data () {
    return {
      headerIcon: 'close',
      headerTitle: '',
      themeData: [],
      url
    };
  },
  components: {
    zhihuHeader,
    ArticalList
  },
  mounted () {
    let dbData = sessionStorage.getItem(this.$route.path);
    if(dbData) {
      this.themeData = JSON.parse(dbData);
      this.headerTitle = this.themeData.name;
    } else {
      var URL = this.url[0].data + '/api/v1' + this.$route.path;
      this.$http.get(URL).then(response => {
        // success callback
        this.themeData = response.data.THEMEDES;
        this.headerTitle = this.themeData.name;
        let str = JSON.stringify(this.themeData);
        sessionStorage.setItem(this.$route.path, str);
      }, response => {
          // error callback
          console.log(response);
      });
    }
  }
}
</script>


<style lang="less" scoped>
  .themeArticalList-wrap {
    margin-top: 100px;
  }

  .loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>