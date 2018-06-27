<template>
    <Collapse v-model="OpenPanels" @on-change="loadChildCategories">
      <Panel v-for="(Category,index) in Categories" :name="index+''" >
        {{ Category.title + '(' + Category.count + ')' }}
        <div slot="content">
          <div class="container">
            <div class="row">
              <div class="col-4" v-for="ChildCategory in Category.childrenCategories" style="padding: 0px">
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
        Categories: [],
        OpenPanels: []
      };
    },
    methods: {
      loadData() {
        const _this = this;
        const OpenPanels = this.$store.state.WallpapersWideCategories.OpenPanels;
        const scrollX = this.$store.state.WallpapersWideCategories.WindowLocation.x;
        const scrollY = this.$store.state.WallpapersWideCategories.WindowLocation.y;
        this.$http.get('/api/WallpapersWide/Categories/level/0/-1')
          .then(res => {
            this.Categories = res;
          })
          .then(
            function () {
              console.log('OpenPanels:'+OpenPanels);
              _this.loadChildCategories(OpenPanels);
            }
          )
          .then(
            function () {
              _this.OpenPanels = OpenPanels;
            }
          )
          .then(
            function () {
              window.setTimeout(function () {
                console.log('scrollTo:'+scrollX+' '+scrollY);
                window.scrollTo(scrollX,scrollY);
              },10);
            }
          );
      },
      loadChildCategories(event){
        this.$store.commit({
          type:'setWallpapersWideCategories',
          OpenPanels:event
        });

        for(let i=0;i<event.length;i++){
          let index = parseInt(event[i]);
          let parentId = index+1;

          console.log('Loading Categories: '+parentId);
          if(this.Categories[index].childrenCategories.length == 0){
            this.$http.get('/api/WallpapersWide/Categories/level/1/'+parentId)
              .then(res => {
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
      onPageChange(categoriesId){
        console.log('To Categories: '+categoriesId);
        this.$store.commit({
          type:'setWallpapersWideCategories',
          WindowLocation:{
            x:window.scrollX,
            y:window.scrollY
          }
        });
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
