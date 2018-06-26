<template>
  <div id="WallpapersWidePictureList">

      <ul v-for="pic in pics" style="margin: 0px">
        <li>
          <img :id="pic.id" :src="pic.imgHD" :alt="pic.title" style="width: 100%"/>
        </li>
      </ul>

  </div>
</template>

<script>
export default {
  name: 'PictureList',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      categoriesId:-1,
      categories:null,
      wallpaperId:-1,
      wallpaper:null,
      pics: [],
      current:1,
      size:20,
      total:0
    }
  },
  computed:{
    totalPage(){
      return Math.ceil(this.total/this.size);
    }
  },
  methods:{
    loadData(){
      this.$http.get('/api/WallpapersWide/Categories/'+this.categoriesId)
        .then(res => {
          this.categories = res;
          this.total = this.categories.count;
        });

      this.$http.get('/api/WallpapersWide/Wallpaper/'+this.wallpaperId)
        .then(res => {
          this.wallpaper = res;
          this.current = Math.ceil(this.wallpaper.page*10/this.size);
          console.log('Current: '+this.current);

          var id = this.wallpaperId;
          this.$http.get('/api/WallpapersWide/Categories/'+this.categoriesId+'/page',{
            params:{
              current:this.current,
              size:this.size
            }
          })
          .then(res => {
            this.pics = res;
          })
          .then(
            function () {
              var topElement = document.getElementById(id);
              topElement.onload = function () {
                window.scrollTo(topElement.x,topElement.y);
                topElement.onload = null;
              };
            }
          );
        });
    },
    loadPageData(){
        this.$http.get('/api/WallpapersWide/Categories/'+this.categoriesId+'/page',{
          params:{
            current:this.current,
            size:this.size
          }
        })
        .then(res => {
          this.pics = res;
        });
    },
    onPageNext() {
      if (this.current < this.totalPage) {
        this.current++;
        console.log("Page:" + this.current);
        this.noticePage();
        this.loadPageData();
        window.scrollTo(0,0);
      }
    },
    onPagePrevious(){
      if(this.current > 1) {
        this.current--;
        console.log("Page:" + this.current);
        this.noticePage();
        this.loadPageData();
        window.scrollTo(0,0);
      }
    },
    noticePage(){
      this.$Message.info({
        content:'Page:'+this.current+'/'+this.totalPage,
        duration:1
      });
    }
  },
  mounted() {
    this.categoriesId = this.$route.params.categoriesId;
    this.wallpaperId = this.$route.params.wallpaperId;
    this.loadData();

    var hammertime = new Hammer(document.getElementById('WallpapersWidePictureList'));

    hammertime.on('swipeleft',this.onPageNext);

    hammertime.on('swiperight',this.onPagePrevious);
  }
}
</script>

<style>

</style>
