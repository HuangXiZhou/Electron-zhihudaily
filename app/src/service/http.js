import axios from 'axios'
axios.defaults.timeout = 50000;//响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = 'https://zhihu-daily.leanapp.cn';//配置接口地址

export default {
  //GET请求
  get(...obj) {
    return axios.get(obj[0].url)
  }
}