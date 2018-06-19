<template>
  <div id="PictureList">

      <ul v-for="pic in pics" style="margin: 0px">
        <li>
          <img :id="pic.id" :src="pic.src" :alt="pic.title" style="width: 100%"/>
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
      page:'',
      id:'',
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
      this.$http.get('http://172.27.49.77:8888/api/'+this.page+'/total')
        .then(res => {
          this.total = res;
        });

      this.current = Math.ceil(this.id/this.size);
      var id = this.id;
      this.$http.get('http://172.27.49.77:8888/api/'+this.page+'/page',{
          params:{
            current:this.current,
            size:this.size
          }
        })
        .then(res => {
          this.pics = res;
        }).then(
          function () {
            var topElement = document.getElementById(id);
            window.scrollTo(topElement.x,topElement.y);
          }
      );
    },
    onPageNext() {
      if (this.current < this.totalPage) {
        this.current++;
        console.log("Page:" + this.current);
        this.noticePage();
        this.id = (this.current-1)*this.size + 1;
        this.loadData();
        window.scrollTo(0,0);
      }
    },
    onPagePrevious(){
      if(this.current > 1) {
        this.current--;
        console.log("Page:" + this.current);
        this.noticePage();
        this.id = (this.current-1)*this.size + 1;
        this.loadData();
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
    this.page = this.$route.params.page;
    this.id = this.$store.state.PictureList.id;
    this.loadData();

    var hammertime = new Hammer(document.getElementById('PictureList'));

    hammertime.on('swipeleft',this.onPageNext);

    hammertime.on('swiperight',this.onPagePrevious);
  }
}
</script>

<style>

</style>
