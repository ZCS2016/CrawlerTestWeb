<template>
    <Collapse @on-change="loadChildCategories">
      <Panel v-for="Category in Categories" >
        {{ Category.title + '(' + Category.count + ')' }}
        <div slot="content">
          <div class="container">
            <div class="row">
              <div class="col-4" v-for="ChildCategory in Category.ChildCategories" style="padding: 0px">
                <img :src="ChildCategory.img" :alt="ChildCategory.title" style="width: 100%"/>
                {{ ChildCategory.title + '(' + ChildCategory.count + ')'}}
              </div>
            </div>
          </div>
        </div>
      </Panel>

    </Collapse>
</template>

<script>

  //const WallpapersWideCategoriesHome = 'http://172.27.49.91:8888';
  const WallpapersWideCategoriesHome = 'http://192.168.2.123:8888';

  export default {
    name: "WallpapersWideCategories",
    data(){
      return {
        Categories:[]
      };
    },
    methods: {
      loadData() {
        this.$http.get(WallpapersWideCategoriesHome+'/api/WallpapersWide/Categories/level/0/-1')
          .then(res => {
            this.Categories = res;
          });
      },
      loadChildCategories(event){
        for(var i=0;i<event.length;i++){
          var index = parseInt(event[i]);
          var parentId = index+1;
          if(!this.Categories[index].ChildCategories){
            this.$http.get(WallpapersWideCategoriesHome+'/api/WallpapersWide/Categories/level/1/'+parentId)
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
      }
    },
    mounted() {
      this.loadData();
    }
  }
</script>

<style scoped>

</style>
