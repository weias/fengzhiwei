import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router/router'
import axios from 'axios'
import Cookies from 'js-cookie'
import store from './store/store'
import VueParticles from 'vue-particles'
import { hostDomain } from './global/global'
import Cipher from './utils/cipher'
// import * as utils from '@/utils'
import VuePreview from 'vue-preview'
import VueLazyload from 'vue-lazyload'

import 'font-awesome/less/font-awesome.less'
import {
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Carousel,
  CarouselItem,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Popover,
  Tooltip,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Icon,
  Row,
  Col,
  Card,
  Rate,
  Cascader,
  Transfer,
  Loading,
  MessageBox,
  Message,
  Notification,
  Breadcrumb,
  BreadcrumbItem,
  Pagination,
  Badge,
  Upload,
  Dialog,
  DatePicker,
  TimeSelect,
  Table,
  TableColumn,
  TimePicker
} from 'element-ui'

Vue.use(VuePreview, {
  mainClass: 'pswp--minimal--dark',
  barsSize: {top: 0, bottom: 0},
  captionEl: true,
  fullscreenEl: true,
  shareEl: false,
  bgOpacity: 0.8,
  tapToClose: true,
  tapToToggleControls: true
})

Vue.use(Autocomplete)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Rate)
Vue.use(Cascader)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Pagination)
Vue.use(Badge)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Table)
Vue.use(TableColumn)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.prototype.$axios = axios
Vue.use(VueParticles)

Vue.use(VueLazyload)

// Vue 的全局配置
Vue.config.productionTip = false

/*const service = axios.create({
  baseURL: hostDomain,
  timeout: 5000, // 请求的超时时间
  //设置默认请求头，使post请求发送的是formdata格式数据// axios的header默认的Content-Type好像是'application/json;charset=UTF-8',我的项目都是用json格式传输，如果需要更改的话，可以用这种方式修改
  // headers: {
  // "Content-Type": "application/x-www-form-urlencoded"
  // },
  withCredentials: true // 允许携带cookie
})*/
// axios.defaults.baseURL = hostDomain
axios.defaults.timeout = 5000
axios.defaults.withCredentials = true
// http request 拦截器
axios.interceptors.request.use(
  config => {
    // console.log(config.data)
    config.data = 'encryptData=' + Cipher.Encrypt(config.data)
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    // response.data = eval('(' + Cipher.Decrypt(response.data) + ')')
    response.data = JSON.parse(Cipher.Decrypt(response.data));
    // console.log(response.data)
    return response
  /*},
  error => {
    if (error.response) {
      switch (error.response.status) {
        // 如果后端返回没有权限
        case 401:
          // 清除token信息并跳转到登录页面
          Cookies.set('powingerp_isLogin', '0')
          router.replace('/login')
      }
    }
    console.log('==>' + error)
    return Promise.reject(error.response.data) // 返回接口返回的错误信息*/
  }
)

new Vue({
  el: '#app',
  mode: hostDomain,
  router,
  store,
  template: '<App/>',
  components: { App }
})
