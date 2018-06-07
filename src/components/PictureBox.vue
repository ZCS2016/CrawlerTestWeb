<template>
  <div id="PictureBox">
    <div class="container">
      <div class="row">
        <div class="col-4" v-for="pic in pics" style="padding: 0px">
          <img :src="pic.src" :alt="pic.title" style="width: 100%" @click="onPictureClicked(pic.title)"/>
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
        page:'',
        pics: [],
        current:1,
        size:90,
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
        this.$http.get('http://172.27.49.66:8888/api/'+this.page+'/total')
          .then(res => {
            this.total = res;
          });

        this.$http.get('http://172.27.49.66:8888/api/'+this.page+'/page',{
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
          window.scrollTo(0,0);
          this.noticePage();
          this.loadData();
        }
      },
      onPagePrevious(){
        if(this.current > 1) {
          this.current--;
          console.log("Page:" + this.current);
          window.scrollTo(0,0);
          this.noticePage();
          this.loadData();
        }
      },
      noticePage(){
        this.$Message.info({
          content:'Page:'+this.current+'/'+this.totalPage,
          duration:1
        });
      },
      onPictureClicked(title){
        console.log(title);
        this.$router.push('/PictureList/'+this.page+"/"+title);
      }
    },
    mounted() {
      this.page = this.$route.params.page;
      this.loadData();

      var hammertime = new Hammer(document.getElementById('PictureBox'));

      hammertime.on('swipeleft',this.onPageNext);

      hammertime.on('swiperight',this.onPagePrevious);

    }
  }
</script>

<style scoped>

</style>
