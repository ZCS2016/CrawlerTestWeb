<template>
  <div>
    <Card v-for="page in pageList">
      <div style="text-align: center">
        <img :src="page.src" :alt="page.title" style="width:100%" @click="onPageChange(page.title)"/>
        <h5>
          <router-link :to="'/PictureBox/'+page.title">{{ page.title }}</router-link>
        </h5>
      </div>
    </Card>

  </div>
</template>

<script>
  //const PictureBoxHome = 'http://172.27.49.91:8888';
  const PictureBoxHome = 'http://192.168.2.123:8888';

  export default {
    name: "PageList",
    data(){
      return {
        pageList:[]
      };
    },
    methods:{
      loadData(){
        this.$http.get(PictureBoxHome+'/api/PageList/all')
          .then(res => {
            this.pageList = res;
          });
      },
      onPageChange(title){
        this.$router.push('/PictureBox/'+title);
      }
    },
    mounted() {
      this.loadData();
    }
  }
</script>

<style scoped>

</style>
