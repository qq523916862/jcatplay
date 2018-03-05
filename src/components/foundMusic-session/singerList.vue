<template>
 <div class="singer-box">
     <div class="container">
       <div class="singer-aside">
       <div v-for="(item,index) in list">
         <singer-nav :info="item" :index="index" :bus="bus"></singer-nav>
       </div>
       </div>
       <div class="singer-session">
          <div class="singer-session-item">
              <div class="singer-session-title h3">
                  推荐歌手
              </div>
          </div>
         <singer-item ></singer-item>
         <div class="singer-session-footer text-center">
             <ul class="pagination pagination-sm">
               <li :class="{'disable':count==1}"><a href="#" aria-label="Previous" @click="prev($event)" ><span class="glyphicon glyphicon-arrow-left"></span></a></li>
               <li v-show="count-2>0"><a href="" @click="turnPage($event,count-2)">{{count-2}}</a></li>
               <li v-show="count-1>0"><a href="#" @click="turnPage($event,count-1)">{{count-1}}</a></li>
               <li class="active"><a href="#" @click="preventD($event)">{{count}}</a></li>
               <li v-show="count+1<=maxCount" @click="turnPage($event,count+1)"><a href="#">{{count+1}}</a></li>
               <li v-show="count+2<=maxCount" @click="turnPage($event,count+2)"><a href="#">{{count+2}}</a></li>
               <li :class="{'disable':count==maxCount}"><a href="#" aria-label="next" @click="next($event)"><span class="glyphicon glyphicon-arrow-right"></span></a></li>
             </ul>
         </div>
       </div>
     </div>
 </div>

</template>
<script>
  import Vue from 'vue'
  import singerNav from './singer/singer-aside-item'
  import singerItem from './singer/singer-session-item'
  export default {
      name:"singerList",
      components:{
        singerNav,
        singerItem
      },
      data(){
          return {
              list:[{title:"推荐",list:["推荐歌手","全部歌手"]},{title:"华语",list:["华语男歌手","华语女歌手","华语组合"]},{title:"粤语",list:["粤语男歌手","粤语女歌手","粤语组合"]},{title:"欧美",list:["欧美男歌手","欧美女歌手","欧美组合"]},{title:"日韩",list:["日韩男歌手","日韩女歌手","日韩组合"]}],
              bus:new Vue(),
              count:1,
              maxCount:1,
          }
      },
      methods:{
        toTop(){
          let timer = setInterval(function () {
            if(window.scrollY<=50){
              clearInterval(timer);
            }else{
              window.scrollBy(0,-200);
            }
          },10);
        },
        turnPage(e,now){
          e.preventDefault();
          this.count = now;
          this.getPage(this.count);
        },
        preventD(e){
          e.preventDefault();
          return ;
        },
        prev(e){
          e.preventDefault();
          this.count = this.count==1?1:this.count-1;
          this.getPage(this.count);
        },
        next(e){
          e.preventDefault();
          this.count = this.count == this.maxCount ? 1 : this.count + 1;
          this.getPage(this.count);
        },
        getMaxCount(){
          this.$http.get("/api/singer/maxcount").then(data=>{
            this.maxCount = data.body.count;
          },err=>{
            console.log(err);
          });
        },
        getPage(num){
          this.$http.get("/api/singer/recommend?count="+num).then(data=>{
            this.bus.$emit("setSessionData",data.body);
            this.toTop();
          },err=>{
            console.log(err);
          })
        }
      },
      mounted(){
            this.getMaxCount();
      }
  }

</script>

<style>
.singer-box{
  padding:0px;
  position:relative;
  top:-10px;
  background:#F5F5F5;
}
.singer-box>div{
  padding:0px;
}
.singer-aside{
  background:#F9F9F9;
  position:fixed;
  border-left:#D4D4D4 1px solid;
  border-right:#D4D4D4 1px solid;
  top:50px;
  padding-top:40px;
  bottom:50px;
  width:190px;
}



.singer-session{
  padding:0px 30px;
  position:relative;
  margin-left:190px;
  background:white;
  padding-bottom:80px;
}
.singer-session-item{
  padding-top:10px;
  border-bottom:3px red solid;
}
.singer-session-title{

}



</style>
