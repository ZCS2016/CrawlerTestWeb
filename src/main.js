// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
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
Vue.use(Vuex);
Vue.use(iView);
// 挂载全局
// ajax请求方法
Vue.prototype.$http = httpRequest;

const store = new Vuex.Store({
  state:{
    PictureBox:{
      WindowLocation:{
        x:0,
        y:0
      },
      current:1
    },
    PictureList:{
      id:1
    }
  },
  mutations:{
    setPictureBox(state,params){
      state.PictureBox.WindowLocation = params.WindowLocation;
      state.PictureBox.current = params.current;
    },
    setPictureList(state,params){
      state.PictureList.id = params.id;
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:store,
  components: { App },
  template: '<App/>'
});
