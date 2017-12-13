// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css' //引入样式文件
Vue.use(ElementUI) //全局使用组件库
global.ApiUrl = 'http://localhost:3000/api/v1'//全局定义api请求的服务器端地址
global.ServerHoseName = 'http://localhost:3000' //远程服务器主机的信息
/* eslint-disable no-new */
// 实例化vue构造函数／／
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
