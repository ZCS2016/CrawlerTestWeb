import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import PictureList from '@/components/PictureList'
import PictureBox from '@/components/PictureBox'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/PictureBox/:page',
      name: 'PictureBox',
      component: PictureBox
    },{
      path: '/PictureList/:page',
      name: 'PictureList',
      component: PictureList
    }
  ]
});
