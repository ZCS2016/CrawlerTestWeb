<template>
  <div id="PictureList">

      <ul v-for="pic in pics" style="margin: 0px">
        <li>
          <img :src="pic.src" :alt="pic.title" style="width: 100%"/>
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
      title:'',
      pics: [],
      current:1,
      size:10,
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
    }
  },
  mounted() {
    this.page = this.$route.params.page;
    this.title = this.$route.params.title;
    this.loadData();

    var hammertime = new Hammer(document.getElementById('PictureList'));

    hammertime.on('swipeleft',this.onPageNext);

    hammertime.on('swiperight',this.onPagePrevious);

  }
}
</script>

<style>

</style>
