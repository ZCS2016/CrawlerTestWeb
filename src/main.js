// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import httpRequest from './utils/httpRequest'
import $ from 'jquery'
import Popper from 'popper.js'
import bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Hammer from 'hammerjs'

Vue.config.productionTip = false;
Vue.use(iView);
// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
