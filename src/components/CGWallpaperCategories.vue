<template>

  <div>
    <Collapse v-model="OpenPanels" @on-change="loadChildCategories">
      <Panel v-for="Category in Categories" :name="Category.name">
        {{ Category.name }}
        <div slot="content">
          <div class="container">
            <div class="row">
              <div class="col-4" v-for="ChildCategory in Category.ChildrenCategories" style="padding: 0px">
                <img :src="imgURL(ChildCategory.imgHash)" :alt="ChildCategory.title" @click="onPageChange(ChildCategory.id)" style="width: 100%"/>
                {{ ChildCategory.title }}<span class="badge">{{ ChildCategory.count }}</span>
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </Collapse>
  </div>

</template>

<script>
  export default {
    name: "CGWallpaperCategories",
    data(){
      return {
        Categories:[],
        OpenPanels: []
      };
    },
    methods:{
      loadData() {
        var index = 0;
        for(var i = 65; i < 91; i++){
          this.Categories.push({});
          this.Categories[index].name = String.fromCharCode(i);
          index++;
        }
        this.Categories = this.Categories;

        const _this = this;
        const OpenPanels = this.$store.state.CGWallpaperCategories.OpenPanels;
        const scrollX = this.$store.state.CGWallpaperCategories.WindowLocation.x;
        const scrollY = this.$store.state.CGWallpaperCategories.WindowLocation.y;

        console.log('OpenPanels:'+OpenPanels);
        this.loadChildCategories(OpenPanels);

        window.setTimeout(function () {
          _this.OpenPanels = OpenPanels;
        },15);

        window.setTimeout(function () {
          console.log('scrollTo:'+scrollX+' '+scrollY);
          window.scrollTo(scrollX,scrollY);
        },35);

      },
      loadChildCategories(event){
        this.$store.commit({
          type:'setCGWallpaperCategories',
          OpenPanels:event
        });

        for(let i=0; i < event.length; i++){
          for(let j=0; j < this.Categories.length; j++){
            if(event[i] == this.Categories[j].name) {
              if (!this.Categories[j].ChildrenCategories) {
                this.$http.get('/api/CGWallpaper/Categories/' + this.Categories[j].name)
                  .then(res => {
                    this.Categories[j].ChildrenCategories = res;
                    this.$set(this.Categories,j,this.Categories[j]);
                  });
                break;
              }
            }
          }
        }
      },
      imgURL(hash){
        return this.$http.baseURL + '/api/Picture/' + hash +'.jpg';
      },
      onPageChange(categoriesId){
        console.log('To Categories: '+categoriesId);
        this.$store.commit({
          type:'setCGWallpaperCategories',
          WindowLocation:{
            x:window.scrollX,
            y:window.scrollY
          }
        });
        this.$router.push('/CGWallpaperPictureList/'+categoriesId);
      }
    },
    mounted(){
      this.loadData();
    }
  }
</script>

<style scoped>

</style>
