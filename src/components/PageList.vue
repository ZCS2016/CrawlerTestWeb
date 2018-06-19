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
    export default {
      name: "PageList",
      data(){
        return {
          pageList:[]
        };
      },
      methods:{
        loadData(){
          this.$http.get('http://172.27.49.77:8888/api/PageList/all')
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
