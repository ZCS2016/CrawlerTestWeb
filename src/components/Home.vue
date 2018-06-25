<template>
  <WallpapersWideCategories/>
</template>

<script>
  import PageList from '@/components/PageList'
  import WallpapersWideCategories from '@/components/WallpapersWideCategories'
  import CrawlerHome from '@/components/admin/CrawlerHome'

    export default {
        name: "Home",
        components:{
          PageList:PageList,
          WallpapersWideCategories:WallpapersWideCategories,
          CrawlerHome:CrawlerHome
        }
    }
</script>

<style scoped>

</style>
