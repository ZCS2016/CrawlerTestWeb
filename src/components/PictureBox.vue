<template>
  <div id="PictureBox">
    <div class="container">
      <div class="row">
        <div class="col-4" v-for="pic in pics" style="padding: 0px">
          <img :src="pic.src" :alt="pic.title" style="width: 100%" @click="onPictureClicked(pic.id)"/>
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
        this.$http.get('http://172.27.49.77:8888/api/'+this.page+'/total')
          .then(res => {
            this.total = res;
          });

        const scrollX = this.$store.state.PictureBox.WindowLocation.x;
        const scrollY = this.$store.state.PictureBox.WindowLocation.y;
        this.$http.get('http://172.27.49.77:8888/api/'+this.page+'/page',{
          params:{
            current:this.current,
            size:this.size
          }
        }).then(res => {
          this.pics = res;
        }).then(
          function () {
            console.log(scrollX,scrollY);
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
      onPictureClicked(id){
        console.log(this.page+"\t"+id);
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
          id:id
        });
        this.$router.push('/PictureList/'+this.page);
      }
    },
    mounted() {
      this.page = this.$route.params.page;
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
