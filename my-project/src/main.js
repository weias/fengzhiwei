// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//1.引用vue
import Vue from 'vue'
//引用路由
import VueRouter from 'vue-router'
//使用路由
Vue.use(VueRouter);
//入口文件为 src/app.vue 文件 所以要引用
import App from './App.vue'
//引用路由配置文件
import router from './config/router'
//引用api文件
import api from './config/api'
//将api方法绑定全局
Vue.prototype.$api = api
//使用配置文件规则
const router = new VueRouter({
  routes
})
new Vue({
  routes,
  el:'#app',
  render :(h) => h(app)
})
