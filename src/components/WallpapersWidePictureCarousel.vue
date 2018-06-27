<template>
  <div id="WallpapersWidePictureCarousel">

    <Carousel v-model="index" dots="none" arrow="never">
      <CarouselItem v-for="pic in pics" >
        <img :id="pic.id" :src="imgURL(pic.hash)" :alt="pic.title" style="width: 100%"/>
      </CarouselItem>
    </Carousel>

  </div>
</template>

<script>
  export default {
    name: 'WallpapersWidePictureCarousel',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        categoriesId: -1,
        categories: null,
        wallpaperId: -1,
        wallpaper: null,
        pics: [],
        current: 1,
        size: 20,
        total: 0,
        index: 0
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
            .then(res => {
              this.index = this.getIndex();
              console.log('index:'+this.index);
            });
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
        if (this.index < this.size) {
          this.index++;
        }
      },
      onPagePrevious(){
        if(this.index > 1) {
          this.index--;
        }
      },
      noticePage(){
        this.$Message.info({
          content:'Page:'+this.current+'/'+this.totalPage,
          duration:1
        });
      },
      imgURL(hash){
        return this.$http.baseURL + '/api/Picture/' + hash +'-FHD.jpg';
      },
      getIndex(){
        let _index = 0;
        for(let i = 0; i < this.pics.length; i++){
          if(this.pics[i].id == this.categoriesId){
            _index = i;
            break;
          }
        }
        return _index;
      }
    },
    mounted() {
      this.categoriesId = this.$route.params.categoriesId;
      this.wallpaperId = this.$route.params.wallpaperId;
      this.loadData();

      var hammertime = new Hammer(document.getElementById('WallpapersWidePictureCarousel'));
      hammertime.on('swipeleft',this.onPageNext);
      hammertime.on('swiperight',this.onPagePrevious);
    }
  }
</script>

<style>

</style>
