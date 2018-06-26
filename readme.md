### 更新代码步骤：
    * git add .->git commit -m 'xxx'
    * git fetch origin master
    * git rebase origin/master
    * 若有冲突，则解决冲突后 git add . 再执行 git rebase --continue;

## 网络请求
  * 实例： request()\[method\]('/xxx', {data}).then(res=>{})
  * 引用方式: import request from '@/utils/request';
  * method 取值可为get,post,delete,put;
  * request返回的是promise对象，捕获异常可用catch方法

## 目录结构
  * components -公用组件
  * constants -配置项
  * pages --页面，活动页目录为pages/activity, 正式的页面目录为pages/app,
  * route --路由配置, 添加规则为{name: page名称(不加.vue后缀), title: 页面标题},
  * store --vuex配置文件
  * api --获取后台数据的通用方法
  * utils --微信jssdk相关的方法为wxMethods, 通用的时间，字符串等处理函数写在methods
