<template lang="html">
  <div class="themes-container">
    <zhihu-header :title="headerTitle"></zhihu-header>
    <div v-if="themeData.limit" class="themes-wrap">
      <div class="themes-item" v-for="item in themeData.others" :key="item.id">
        <div class="img-hover">
          <router-link :to="'/themes/' + item.id">
            <span>{{ item.name }}</span>
          </router-link>            
        </div>
          <img :src="item.thumbnail" :alt="item.name">
      </div>
    </div>
    <!-- 加载模块 -->
    <mu-circular-progress class="loading" v-else :size="60" :strokeWidth="5"/>    
  </div>
</template>


<script>
import ajax from '../../../service/http.js'
import zhihuHeader from '../ui/Header'
export default {
  name: "Themes",
  data () {
    return {
      headerTitle: '主题日报',
      themeData: [],
      url: {
        url: '/api/v1/themes'
      },
      ajax
    };
  },
  components: {
    zhihuHeader
  },
  mounted () {
    let dbData = localStorage.getItem('themesImg');
    if(dbData) {
      this.themeData = JSON.parse(dbData);
    } else {
      ajax.get(this.url)
      .then(response => {
        this.themeData = response.data.THEMES;
        let str = JSON.stringify(this.themeData);
        localStorage.setItem('themesImg', str);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
}
</script>


<style lang="less" scoped>
  .themes-wrap {
    margin-top: 100px;
    margin-bottom: 60px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    width: 720px;
  }

  .themes-item {
    position: relative;
    display: inline-block;
    margin: 20px;
    overflow: hidden;
    & > img {
      width: 160px;
      height: 160px;
      border-radius: 3px;
      transition: all 0.2s ease-in-out;
    }
  }

  .img-hover {
    position: absolute;
    top: 0;
    left: 0;
    width: 160px;
    height: 160px;
    background-color: #333;
    opacity: 0;
    & > a {
      text-decoration: none;
      & > span {
        line-height: 160px;
        font-size: 18px;
        font-weight: 400px;
        color: #fff;
        cursor: pointer;
      }
    }
    &:hover {
      opacity: .8;
      cursor: pointer;
      z-index: 3;
    }
    &:hover + img {
      transform: scale(1.1);
    }
  }
  
  .loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>