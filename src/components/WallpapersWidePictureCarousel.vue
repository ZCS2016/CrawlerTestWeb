<template>
  <div id="WallpapersWidePictureCarousel">

    <Carousel v-model="index" dots="none" @on-change="onPageChange">
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
        Categories: null,
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
            this.total = this.Categories.count;
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
      onPageChange(oldIndex,index){
        console.log('oldIndex:' + oldIndex + ' index:' + index);

        if(oldIndex == 0 && index == this.size -1){
          if(this.current > 1){
            this.current--;
            console.log("Page:" + this.current);
            this.noticePage();
            this.loadPageData();
            this.index = index;
          }else{
            this.index = 0;
          }
        }else if(oldIndex == this.size -1 && index == 0){
          if(this.current < this.totalPage){
            this.current++;
            console.log("Page:" + this.current);
            this.noticePage();
            this.loadPageData();
            this.index = index;
          }else{
            this.index = this.size -1;
          }
        }else{
          if(index < this.pics.length){
            this.index = index;
          }
        }
      },
      onPageNext() {
        this.onPageChange(this.index, (this.index + 1) % this.size);
      },
      onPagePrevious(){
        this.onPageChange(this.index, (this.index - 1 + this.size) % this.size);
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
        console.log('getIndex()');
        let _index = 0;
        for(let i = 0; i < this.pics.length; i++){
          if(this.pics[i].id == this.wallpaperId){
            _index = i;
            console.log('Found index:' + i);
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
