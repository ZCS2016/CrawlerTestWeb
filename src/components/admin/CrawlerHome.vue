<template>
  <div>
    <Card v-for="job in jobs">
      <div slot="title">
        <h5>{{ job.name }}
          <span v-show="job.running" class="badge badge-success">
            Running({{ job.current +'/' + job.total }})&nbsp;{{ job.startTime | timeSpend }}
          </span>

          <Icon v-show="job.status == 'Complete'" type="ios-checkmark-outline" color="#19be6b"></Icon>
        </h5>
      </div>

      <p slot="extra">
        <Switch v-model="job.running" @on-change="runJob(job)"></Switch>
      </p>

      <p>
        <Progress :percent="Math.ceil(job.current*100/job.total)"></Progress>
      </p>

    </Card>
  </div>
</template>

<script>
  import moment from 'moment'
  import 'moment/locale/zh-cn'
  moment.locale('zh-cn');

  export default {
    name: "CrawlerHome",
    data(){
      return {
        jobs:[],
        timeoutId:null
      };
    },
    methods:{
      loadData() {
        this.$http.get('http://172.27.49.91:9999/api/Crawler/jobs')
          .then(res => {
            this.jobs = res;
          });
      },
      refreshJob(job){
        this.$http.get('http://172.27.49.91:9999/api/Crawler/jobs/'+job.name)
          .then(res => {
            for(var i = 0; i < this.jobs.length; i++){
              if(this.jobs[i].name == res.name){
                if(res.status == 'Complete'){
                  clearInterval(this.timeoutId);
                }else{
                  if(res.current == res.total){
                    res.current = 0;
                  }
                }
                this.$set(this.jobs,i,res);
              }
            }
          });
      },
      runJob(job){
        if(job.running){
          var _this = this;

          this.$Message.info('Start job: '+job.name);
          for(var i = 0; i < this.jobs.length; i++){
            if(this.jobs[i].name == job.name){
              this.jobs[i].current = 0;
              this.jobs[i].total = 0;
            }
          }

          this.$http.get('http://172.27.49.91:9999/api/Crawler/run/'+job.name)
            .then(res => {
              this.timeoutId = setInterval(function () {
                _this.refreshJob(job);
              },1000);
            });
        }else{
          this.$Message.info('Stop job: '+job.name);
        }
      }
    },
    filters:{
      timeSpend(startTime){
        var _startTime = moment(startTime);
        return _startTime.fromNow(true);
      }
    },
    mounted() {
      this.loadData();
    }
  }
</script>

<style scoped>

</style>
