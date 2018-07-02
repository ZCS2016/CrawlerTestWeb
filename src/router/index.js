import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import PictureBox from '@/components/PictureBox'
import PictureList from '@/components/PictureList'
import CrawlerHome from '@/components/admin/CrawlerHome'
import WallpapersWidePictureCrawler from '@/components/admin/WallpapersWidePictureCrawler'
import WallpapersWidePictureBox from '@/components/WallpapersWidePictureBox'
import WallpapersWidePictureList from '@/components/WallpapersWidePictureList'
import WallpapersWidePictureCarousel from '@/components/WallpapersWidePictureCarousel'
import GameWallpaperCategories from '@/components/GameWallpaperCategories'

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
    },{
      path: '/CrawlerHome',
      name: 'CrawlerHome',
      component: CrawlerHome
    },{
      path: '/WallpapersWidePictureCrawler',
      name: 'WallpapersWidePictureCrawler',
      component: WallpapersWidePictureCrawler
    },{
      path: '/WallpapersWidePictureBox/:categoriesId',
      name: 'WallpapersWidePictureBox',
      component: WallpapersWidePictureBox
    },{
      path: '/WallpapersWidePictureList/:categoriesId/:wallpaperId',
      name: 'WallpapersWidePictureList',
      component: WallpapersWidePictureList
    },{
      path: '/WallpapersWidePictureCarousel/:categoriesId/:wallpaperId',
      name: 'WallpapersWidePictureCarousel',
      component: WallpapersWidePictureCarousel
    },{
      path: '/GameWallpaperCategories',
      name: 'GameWallpaperCategories',
      component: GameWallpaperCategories
    }
  ]
});
