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
      categoriesId:1,
      wallpaperId:1
    },
    WallpapersWideCategories:{
      WindowLocation:{
        x:0,
        y:0
      },
      OpenPanels:[]
    },
    GameWallpaperCategories:{
      WindowLocation:{
        x:0,
        y:0
      },
      OpenPanels:[]
    },
    CGWallpaperCategories:{
      WindowLocation:{
        x:0,
        y:0
      },
      OpenPanels:[]
    }
  },
  mutations:{
    setPictureBox(state,params){
      state.PictureBox.WindowLocation = params.WindowLocation;
      state.PictureBox.current = params.current;
    },
    setPictureList(state,params){
      state.PictureList.id = params.id;
    },
    setWallpapersWideCategories(state,params){
      if(params.WindowLocation){
        state.WallpapersWideCategories.WindowLocation = params.WindowLocation;
      }
      if(params.OpenPanels){
        state.WallpapersWideCategories.OpenPanels = params.OpenPanels;
      }
    },
    setGameWallpaperCategories(state,params){
      if(params.WindowLocation){
        state.GameWallpaperCategories.WindowLocation = params.WindowLocation;
      }
      if(params.OpenPanels){
        state.GameWallpaperCategories.OpenPanels = params.OpenPanels;
      }
    },
    setCGWallpaperCategories(state,params){
      if(params.WindowLocation){
        state.CGWallpaperCategories.WindowLocation = params.WindowLocation;
      }
      if(params.OpenPanels){
        state.CGWallpaperCategories.OpenPanels = params.OpenPanels;
      }
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
