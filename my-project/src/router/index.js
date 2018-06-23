//1.引用vue
import Vue from 'vue'

//引用路由
import Router from 'vue-router'

import Index from '@/page/index'

import Content from '@/page/content'
//使用路由
Vue.use(Router);
export default new Router({
  routes: [{
    path: '/',
    component: Index
  }, {
    path: '/content/:id',
    component: Content
  }]
})

