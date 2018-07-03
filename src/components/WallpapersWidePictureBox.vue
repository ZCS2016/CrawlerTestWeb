<template>
  <div id="PictureBox">
    <div class="container">
      <div class="row">
        <div class="col-4" v-for="pic in pics" style="padding: 0px">
          <img :src="pic.img" :alt="pic.title" style="width: 100%" @click="onPictureClicked(categoriesId,pic.id)"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'PictureBox',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        categoriesId:-1,
        Categories:null,
        pics: [],
        current:1,
        size:60,
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
            this.total = this.Categories.count;
          });

        const scrollX = this.$store.state.PictureBox.WindowLocation.x;
        const scrollY = this.$store.state.PictureBox.WindowLocation.y;
        this.$http.get('/api/WallpapersWide/Categories/'+this.categoriesId+'/page',{
          params:{
            current:this.current,
            size:this.size
          }
        }).then(res => {
          this.pics = res;
        }).then(
          function () {
            window.scrollTo(scrollX,scrollY);
          }
        );
      },
      onPageNext() {
        if (this.current < this.totalPage) {
          this.current++;
          console.log("Page:" + this.current);
          this.noticePage();
          this.$store.commit({
            type:'setPictureBox',
            WindowLocation:{
              x:0,
              y:0
            },
            current:this.current
          });
          this.loadData();
        }
      },
      onPagePrevious(){
        if(this.current > 1) {
          this.current--;
          console.log("Page:" + this.current);
          this.noticePage();
          this.$store.commit({
            type:'setPictureBox',
            WindowLocation:{
              x:0,
              y:0
            },
            current:this.current
          });
          this.loadData();
        }
      },
      noticePage(){
        this.$Message.info({
          content:'Page:'+this.current+'/'+this.totalPage,
          duration:1
        });
      },
      onPictureClicked(categoriesId,wallpaperId){
        console.log('To WallpapersWidePictureList:'+this.categoriesId+"\t"+wallpaperId);
        this.$store.commit({
          type:'setPictureBox',
          WindowLocation:{
            x:window.scrollX,
            y:window.scrollY
          },
          current:this.current
        });
        this.$store.commit({
          type:'setPictureList',
          categoriesId:this.categoriesId,
          wallpaperId:wallpaperId
        });
        this.$router.push('/WallpapersWidePictureList/'+this.categoriesId+'/'+wallpaperId);
      }
    },
    mounted() {
      this.categoriesId = this.$route.params.categoriesId;
      this.current = this.$store.state.PictureBox.current;
      this.loadData();

      var hammertime = new Hammer(document.getElementById('PictureBox'));
      hammertime.on('swipeleft',this.onPageNext);
      hammertime.on('swiperight',this.onPagePrevious);
    }
  }
</script>

<style scoped>

</style>
