<template>
  <GameWallpaperCategories/>
</template>

<script>
  import PageList from '@/components/PageList';
  import WallpapersWideCategories from '@/components/WallpapersWideCategories';
  import CrawlerHome from '@/components/admin/CrawlerHome';
  import GameWallpaperCategories from '@/components/GameWallpaperCategories';

    export default {
        name: "Home",
        components:{
          PageList:PageList,
          WallpapersWideCategories:WallpapersWideCategories,
          CrawlerHome:CrawlerHome,
          GameWallpaperCategories:GameWallpaperCategories
        }
    }
</script>

<style scoped>

</style>
