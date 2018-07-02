<template>
  <div>
    <ul>
      <li v-for="category in categories">
        {{ category.title }}
        <img :src="category.img" :alt="category.title"/>
      </li>
    </ul>
  </div>

</template>

<script>
  export default {
    name: "GameWallpaperCategories",
    data(){
      return {
        categories:[]
      };
    },
    methods:{
      loadData() {
        this.$http.get('/api/GameWallpaper/Categories/all')
          .then(res => {
            this.categories = res;
          });
      }
    },
    mounted(){
      this.loadData();
    }
  }
</script>

<style scoped>

</style>
