<template>
    <Collapse @on-change="loadChildCategories">
      <Panel v-for="(Category,index) in Categories" :name="index+''" style="padding: 0px">
        {{ Category.title + '(' + Category.count + ')' }}
        <div slot="content">
          <ul class="list-unstyled" v-for="ChildCategory in Category.childrenCategories" style="padding: 0px; margin: 0px">
            <li class="media">
              <img class="mr-3" :src="ChildCategory.img" :alt="ChildCategory.title" width="35%">
              <div class="media-body">
                <h6 class="mt-0 mb-1">{{ ChildCategory.title + '(' + ChildCategory.count + ')'}}
                  <Icon v-show="ChildCategory.status == 'Complete'" type="ios-checkmark-outline" color="#19be6b"></Icon>
                  <Switch v-model="ChildCategory.running" @on-change="runJob(ChildCategory)" style="float: right"></Switch>
                </h6>
                <span class="badge badge-success">
                  Running({{ ChildCategory.current + '/' +ChildCategory.total }})
                </span>
                <Progress :percent="Math.ceil(ChildCategory.current*100/ChildCategory.total)"></Progress>
              </div>
            </li>
          </ul>
        </div>
      </Panel>

    </Collapse>
</template>

<script>
  export default {
    name: "WallpapersWidePictureCrawler",
    data(){
      return {
        Categories:[],
        timeoutId:null
      };
    },
    methods: {
      loadData() {
        this.$http.get('/api/Crawler/WallpapersWide/Categories/level/0/-1')
          .then(res => {
            this.Categories = res;
          });
      },
      loadChildCategories(event){
        for(var i=0;i<event.length;i++){
          var index = parseInt(event[i]);
          var parentId = index+1;
          if(this.Categories[index].childrenCategories.length == 0){
            this.$http.get('/api/Crawler/WallpapersWide/Categories/level/1/'+parentId)
              .then(res => {
                console.log('Loading Categories: '+parentId);
                if(res.length == 0){
                  this.Categories[index].childrenCategories = [];
                  this.Categories[index].childrenCategories.push(this.Categories[index]);
                }else{
                  this.Categories[index].childrenCategories = res;
                }
                this.$set(this.Categories,index,this.Categories[index]);
              });
          }
        }
      },
      refreshJob(job){
        this.$http.get('/api/Crawler/WallpapersWide/Categories/id/'+job.id)
          .then(res => {
            for(var i = 0; i < this.Categories.length; i++) {
              if (this.Categories[i].childrenCategories) {
                for (var j = 0; j < this.Categories[i].childrenCategories.length; j++) {
                  if(this.Categories[i].childrenCategories[j].id == res.id){
                    if(res.status == 'Complete'){
                      clearInterval(this.timeoutId);
                    }else{
                      if(res.current == res.total){
                        res.current = 0;
                      }
                    }
                    this.$set(this.Categories[i].childrenCategories,j,res);
                    this.$set(this.Categories,i,this.Categories[i]);
                  }
                }
              }
            }
          });
      },
      runJob(job){
        if(job.running){
          var _this = this;

          this.$Message.info('Start job: '+job.title);

          this.$http.get('/api/Crawler/run/wallpaperListJob/'+job.id)
            .then(res => {
              this.timeoutId = setInterval(function () {
                _this.refreshJob(job);
              },1000);
            });
        }else{
          this.$Message.info('Stop job: '+job.title);
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
