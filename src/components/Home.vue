<template>
  <CrawlerHome/>
</template>

<script>
  import WallpapersWideCategories from '@/components/WallpapersWideCategories'
  import CrawlerHome from '@/components/admin/CrawlerHome'

    export default {
        name: "Home",
        components:{
          WallpapersWideCategories:WallpapersWideCategories,
          CrawlerHome:CrawlerHome
        }
    }
</script>

<style scoped>

</style>
