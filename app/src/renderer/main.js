import Vue from 'vue'
import Electron from 'vue-electron'
import Router from 'vue-router'
import 'muse-ui/dist/muse-ui.css'
import 'element-ui/lib/theme-default/index.css'
import '../assetes/css/contents.css'
import '../assetes/css/reset.css'
import '../assetes/fonts/iconfont.css'
import MuseUI from 'muse-ui'
import ElementUI from 'element-ui'

import App from './App'
import routes from './routes'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)
Vue.use(Electron)
Vue.use(Router)
Vue.use(MuseUI)
Vue.use(ElementUI)
Vue.config.debug = true

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')
