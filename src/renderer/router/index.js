import Vue from 'vue'
import Router from 'vue-router'
const Layout = require('@/layouts/default.vue').default;
// const Layout = resolve => require(["../layouts/default.vue"], resolve);
console.log(Layout)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      component:Layout,
      children:[{
        path:'/',
        component: require('@/pages/index.vue').default
      }
    ]
    },
    {
      path:'/musicword',
      component:require('@/components/common/music-word.vue').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
