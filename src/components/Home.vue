<template>
  <CGWallpaperCategories/>
</template>

<script>
  import PageList from '@/components/PageList';
  import WallpapersWideCategories from '@/components/WallpapersWideCategories';
  import CrawlerHome from '@/components/admin/CrawlerHome';
  import GameWallpaperCategories from '@/components/GameWallpaperCategories';
  import CGWallpaperCategories from '@/components/CGWallpaperCategories';

    export default {
        name: "Home",
        components:{
          PageList:PageList,
          WallpapersWideCategories:WallpapersWideCategories,
          CrawlerHome:CrawlerHome,
          GameWallpaperCategories:GameWallpaperCategories,
          CGWallpaperCategories:CGWallpaperCategories
        }
    }
</script>

<style scoped>

</style>
