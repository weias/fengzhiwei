import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'

// 登录
const Login = resolve => require(['../ui/login/Login'], resolve)
// 非登录页的包裹组件
const Layout = resolve => require(['../ui/Layout'], resolve)
// 项目信息
const Home = resolve => require(['../ui/main/Home'], resolve)
const Me = resolve => require(['../ui/main/Me'], resolve)
const Message = resolve => require(['../ui/main/Message'], resolve)
const Task = resolve => require(['../ui/main/Task'], resolve)

const Cars = resolve => require(['../ui/car/Cars'], resolve)
const AddCar = resolve => require(['../ui/car/AddCar'], resolve)
const CarDetail = resolve => require(['../ui/car/CarDetail'], resolve)

const Msg = resolve => require(['../ui/msg/Msg'], resolve)

// 404
const Notfound = resolve => require(['../ui/404'], resolve)

Vue.use(Router)

const router = new Router({
  routes: [
    // 首先是登录页的路由
    {
      path: '/login',
      name: 'login',
      meta: {
        requireAuth: false
      },
      component: Login
    },
    {
      path: '/',
      meta: {
        requireAuth: true
      },
      component: Layout,
      redirect: '/home', //重定向到第一个子路由，否则只渲染Layout组件
      children: [
        {
          path: 'home',
          meta: { requireAuth: true },
          component: Home
        },
        {
          path: 'me',
          meta: { requireAuth: true },
          component: Me
        },
        {
          path: 'message',
          meta: { requireAuth: true },
          component: Message
        },
        {
          path: 'task',
          meta: { requireAuth: true },
          component: Task
        },
        {
          path: 'cars',
          meta: { requireAuth: true },
          component: Cars
        },
        {
          path: 'addCar',
          meta: { requireAuth: true },
          component: AddCar
        },
        {
          path: 'carDetail',
          meta: { requireAuth: true },
          component: CarDetail
        },
        {
          path: 'msg',
          meta: { requireAuth: true },
          component: Msg
        }
      ]
    },
    // 最后是404页面
    {
      path: '*',
      meta: { requireAuth: true },
      component: Notfound
    }
  ]
})

// 当一个导航触发时，全局的 before 钩子按照创建顺序调用。钩子是异步解析执行，此时导航在所有钩子 resolve 完之前一直处于等待中。
router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
    // 判断是否是登录状态
    if (localStorage.userInfo != null) {
    // if (localStorage.userInfo != null && localStorage.userInfo != "null") {
      next()
    } else {
      // 否则跳回登录页
      next('/login')
    }
  } else {
    // 如果不需要登录权限，就直接resolve这个钩子
    next()
  }
})

export default router
