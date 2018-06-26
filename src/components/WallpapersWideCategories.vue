<template>
    <Collapse @on-change="loadChildCategories">
      <Panel v-for="Category in Categories" >
        {{ Category.title + '(' + Category.count + ')' }}
        <div slot="content">
          <div class="container">
            <div class="row">
              <div class="col-4" v-for="ChildCategory in Category.ChildCategories" style="padding: 0px">
                <img :src="ChildCategory.img" :alt="ChildCategory.title" @click="onPageChange(ChildCategory.id)" style="width: 100%"/>
                {{ ChildCategory.title }}<span class="badge" :class="{'badge-success':ChildCategory.status == 'Complete'}">{{ ChildCategory.count }}</span>
              </div>
            </div>
          </div>
        </div>
      </Panel>

    </Collapse>
</template>

<script>
  export default {
    name: "WallpapersWideCategories",
    data(){
      return {
        Categories:[]
      };
    },
    methods: {
      loadData() {
        this.$http.get('/api/WallpapersWide/Categories/level/0/-1')
          .then(res => {
            this.Categories = res;
          });
      },
      loadChildCategories(event){
        for(var i=0;i<event.length;i++){
          var index = parseInt(event[i]);
          var parentId = index+1;
          if(!this.Categories[index].ChildCategories){
            this.$http.get('/api/WallpapersWide/Categories/level/1/'+parentId)
              .then(res => {
                console.log('Loading Categories: '+parentId);
                if(res.length == 0){
                  this.Categories[index].ChildCategories = [];
                  this.Categories[index].ChildCategories.push(this.Categories[index]);
                }else{
                  this.Categories[index].ChildCategories = res;
                }
                this.$set(this.Categories,index,this.Categories[index]);
              });
            }
        }
      },
      onPageChange(categoriesId){
        console.log('To Categories: '+categoriesId);
        this.$router.push('/WallpapersWidePictureBox/'+categoriesId);
      }
    },
    mounted() {
      this.loadData();
    }
  }
</script>

<style scoped>

</style>
