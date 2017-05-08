export default [
  {
    path: '/',
    name: 'landing-page',
    component: require('components/pages/Home')
  }, {
    path: '/contents/:id',
    name: 'Contents',
    component: require('components/pages/Contents')  
  }, {
    path: '/themes',
    name: 'Themes',
    component: require('components/pages/Themes')  
  }, {
    path: '/themes/:id',
    name: 'ThemeDes',
    component: require('components/pages/ThemeDes')  
  }, {
    path: '/beforeArticals',
    name: 'BeforeArticals',
    component: require('components/pages/BeforeArticals')  
  }, {
    path: '*',
    redirect: '/'
  }
]
