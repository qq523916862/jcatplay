<template>
    <div class="ranking-session-box row">
        <div class="rangking-session-header row">
            <div class="col-xs-4 col-sm-3 col-md-2">
                <img class="pull-left img-thumbnail" :src="require('../../../assets/images/index/'+listtype.img)" alt="">
            </div>
            <div class="col-xs-8 col-sm-9 col-md-10">
                <div class="h2  rangking-session-title">{{listtype.title}}</div>
                <div class="update-last" >更新时间-{{time}}</div>
            </div>
          <div class="playtool">
            <playtool count="8000"></playtool>
          </div>
        </div>
        <div class="rangking-session-body row">
            <music-item :list="list"></music-item>
        </div>
    </div>

</template>
<script>
  import musicItem from './music-list'
  import playtool from '../base/playTool'
  export default {
      name:"rankingListsession",
      props:["listtype"],
      components: {
        musicItem,
        playtool
      },
      data(){
          return {
              list:[],
              time:0,

          }
      },
      methods:{
          getData(){
             if(this.listtype.type==1){
               this.$http.get("/api/ranking/forHot").then(result=>{
                 this.list = result.body;
               });
             }else if(this.listtype.type==2){
               this.$http.get("/api/ranking/fotTime").then(result=>{
                 this.list = result.body;
               });
             }else if(this.listtype.type==3){
               this.$http.get("/api/ranking/forElectric").then(result=>{
                 this.list = result.body;
               });
             }
          },
          getTime(){
              this.$http.get("/api/ranking/getNewTime").then(result=>{
                  this.time = result.body[0].s_time.substr(0,10);
              });
          }

      },
      mounted(){
          this.getTime();
          this.getData();
      }
  }

</script>

<style>

.ranking-session-box{
    padding:20px;
    font-family: STKAITI;
    padding-bottom:50px;
    margin:0px;

}

.rangking-session-header{
    padding:5px;
    margin:0px;
    padding-bottom:30px;
    border-bottom:3px solid #C20C0B;
}

.rangking-session-title{
    margin-top:8px;
}

.update-last{
  color:gray;
  font-family: "Microsoft YaHei";
  font-size:10px;
  margin-left:10px;
}

.rangking-session-body{
    padding:30px 15px 0px 15px;
}
.playtool{
  margin-top:85px;
}

</style>
