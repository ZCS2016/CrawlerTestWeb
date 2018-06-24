<template>
    <Collapse @on-change="loadChildCategories">
      <Panel v-for="Category in Categories" style="padding: 0px">
        {{ Category.title + '(' + Category.count + ')' }}
        <div slot="content">
          <ul class="list-unstyled" v-for="ChildCategory in Category.ChildCategories" style="padding: 0px; margin: 0px">
            <li class="media">
              <img class="mr-3" :src="ChildCategory.img" :alt="ChildCategory.title" width="35%">
              <div class="media-body">
                <h6 class="mt-0 mb-1">{{ ChildCategory.title + '(' + ChildCategory.count + ')'}}
                  <Icon type="ios-checkmark-outline" color="#19be6b"></Icon>
                  <Switch style="float: right"></Switch>
                </h6>
                <span class="badge badge-success">
                  Running({{ ChildCategory.count + '/' +ChildCategory.count }})
                </span>
                <Progress :percent="50"></Progress>
              </div>
            </li>
          </ul>
        </div>
      </Panel>

    </Collapse>
</template>

<script>

  //const WallpapersWideCategoriesHome = 'http://172.27.49.91:9999';
  const WallpapersWideCategoriesHome = 'http://192.168.2.123:9999';

  export default {
    name: "WallpapersWidePictureCrawler",
    data(){
      return {
        Categories:[]
      };
    },
    methods: {
      loadData() {
        this.$http.get(WallpapersWideCategoriesHome+'/api/Crawler/WallpapersWide/Categories/level/0/-1')
          .then(res => {
            this.Categories = res;
          });
      },
      loadChildCategories(event){
        for(var i=0;i<event.length;i++){
          var index = parseInt(event[i]);
          var parentId = index+1;
          if(!this.Categories[index].ChildCategories){
            this.$http.get(WallpapersWideCategoriesHome+'/api/Crawler/WallpapersWide/Categories/level/1/'+parentId)
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
