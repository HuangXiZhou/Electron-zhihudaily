<template lang="html">
  <div>
    <!-- 头部 -->
    <zhihu-header :icon="headerIcon" :title="headerTitle"></zhihu-header>
    <div v-if="comments.comments" class="contents-content">
      <!-- 文章正文 -->
      <div class="contents-body" v-html="contents.body">{{ contents.body }}</div>
      <!-- 用户评论模块 -->
      <div class="extra-info">
        <h2><i class="iconfont icon-comments"></i>精彩评论</h2>
        <div v-if="noComments" class="empty-comments">
          <span>暂无评论</span>
        </div>
        <mu-card v-else class="comment-card" v-for="item in comments.comments" :key="item.id">
          <mu-card-header :title="item.author" :subTitle="'👍 ' + item.likes">
            <mu-avatar :src="item.avatar" slot="avatar"/>
          </mu-card-header>
          <mu-card-text>
            {{ item.content }}
          </mu-card-text>
        </mu-card>
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
  name: "Contents",
  data () {
    return {
      contents: [],
      comments: [],
      headerIcon: 'close',
      headerTitle: '文章',
      contentUrl: {
        url: '/api/v1' + this.$route.path
      },
      commentsUrl: {
        url: '/api/v1' + this.$route.path + '/long-comments'
      },
      ajax,
      noComments: true
    };
  },
  components: {
    zhihuHeader
  },
  mounted () {
    let dbData = sessionStorage.getItem(this.$route.path);
    if (dbData) {
      this.contents = JSON.parse(dbData);
      this.comments = JSON.parse(sessionStorage.getItem(this.$route.path + '/long-comments'));
      this.comments.comments.length ? this.noComments = false : this.noComments = true;
    } else {
      ajax.get(this.contentUrl)
      .then(response => {
          this.contents = response.data.CONTENTS;
          this.contents.body = this.contents.body.replace("<div class=\"headline-background\">", "<div class=\"headline-background\" style=\"display: none\">");        
          this.contents.body = this.contents.body.replace("<div class=\"img-place-holder\"><\/div>", "<div class=\"img-place-holder\"\"><img src=\"" + this.contents.image + "\" alt=\"" + this.contents.title + "\"><\/div>");        
          this.contents.body = this.contents.body.replace(">查看知乎讨论", "style=\"display: none\">查看知乎讨论");
          this.contents.body = this.contents.body.replace(/href=\"(.*?)\"/gi, "");                                                                     
          let str = JSON.stringify(this.contents);
          sessionStorage.setItem(this.$route.path, str);
      })
      .catch(error => {
        console.log(error);
      });
      ajax.get(this.commentsUrl)
      .then(response => {
          this.comments = response.data.COMMENTS;
          this.comments.comments.length ? this.noComments = false : this.noComments = true;
          let str = JSON.stringify(this.comments);
          sessionStorage.setItem(this.$route.path + '/long-comments', str);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
}
</script>


<style lang="less" scoped>
  .contents-content {
    padding-bottom: 60px;
    background-color: #eee;
  }

  .contents-body {
    margin-top: 60px;
    margin-left: auto;
    margin-right: auto;
    width: 600px;
  }

  .extra-info {
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 40px;
    padding-bottom: 20px;
    width: 600px;
    background: #fff;
    & > h2 {
      margin-top: -20px;
      margin-left: 10px;
      font-size: 20px;
      color: #777;
    }
    .empty-comments {
      margin-top: 40px;
      margin-bottom: 40px;
      text-align: center;      
      & > span {
        font-size: 20px;
        color: #777;
      }
    }
  }

  .comment-card {
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .icon-comments {
    margin-right: 5px;
  }

  .mu-card-text {
    color: #888;
  }

  .loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>