<template>
  <div>
    <ul style="margin: 0px">
      <li v-for="pic in pics" >
        <img :id="pic.id" :src="imgURL(pic.hash)" :alt="pic.title" style="width: 100%"/>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "CGWallpaperPictureList",
    data () {
      return {
        categoriesId: -1,
        pics: []
      };
    },
    methods:{
      loadData(){
        this.$http.get('/api/CGWallpaper/CGWallpaper/' + this.categoriesId)
          .then(res => {
            this.pics = res;
          });
      },
      imgURL(hash){
        return this.$http.baseURL + '/api/Picture/' + hash +'.jpg';
      }
    },
    mounted() {
      this.categoriesId = this.$route.params.categoriesId;
      this.loadData();
    }
  }
</script>

<style scoped>

</style>
