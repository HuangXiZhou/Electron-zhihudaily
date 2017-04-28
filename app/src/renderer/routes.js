export default [
  {
    path: '/',
    name: 'landing-page',
    component: require('components/Home')
  }, {
    path: '/contents/:id',
    name: 'Contents',
    component: require('components/Contents')  
  }, {
    path: '/themes',
    name: 'Themes',
    component: require('components/Themes')  
  }, {
    path: '/themes/:id',
    name: 'ThemeDes',
    component: require('components/ThemeDes')  
  }, {
    path: '/beforeArticals',
    name: 'BeforeArticals',
    component: require('components/BeforeArticals')  
  }, {
    path: '*',
    redirect: '/'
  }
]
