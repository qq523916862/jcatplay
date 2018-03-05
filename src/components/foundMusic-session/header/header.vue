<template>
  <div class="page-nav">
     <ul class="list-unstyled list-inline" @click.prevent="turnNav">
         <li :class="{'active':navActive==index}" v-for="(item,index) in navMsg">{{item}}</li>
     </ul>
   </div>
</template>

<script>
    import Vue from 'vue'
    export default({
          name:"pagenav",
          data(){
              return {
                  navMsg:["推荐","排行榜","歌单","歌手","新碟上架"],
                  navActive:0,
                  bus:this.$parent.bus
              }
          },
          methods:{
              turnNav(e){
                  var ele = e.target;
                  if(ele.tagName=="LI"){
                      var index = [].indexOf.call(ele.parentElement.getElementsByTagName("li"),ele);
                      this.navActive=index;
                      if(index==0){
                          this.$router.push("/index");
                      }else if(index==1){
                        this.$router.push("/rankinglist");
                      }else if(index==2){
                        this.$router.push("/songsheel");
                      }else if(index==3){
                        this.$router.push("/singerlist");
                      }else if(index==4){
                        this.$router.push("/diskshelves");
                      }
                  }
              }
          },
          mounted(){
              this.bus.$on("jumpNav",(index)=>{
                this.navActive=index;
              });
          switch (location.hash){
            case '#/index':{
              this.navActive=0;
              break;
            }
            case '#/rankinglist':{
              this.navActive=1;
              break;
            }
            case '#/songsheel':{
              this.navActive=2;
              break;
            }
            case '#/singerlist':{
              this.navActive=3;
              break;
            }
            case '#/diskshelves':{
              this.navActive=4;
              break;
            }
            default:{
              this.navActive=null;
              break;
            }
          };
        }
    });
</script>

<style>
.page-nav{
    position:relative;
    z-index:2;
}

.page-nav ul{
  background-color: #C20C0B;
  height: 40px;
  padding:5px 0px 0px 10%;
  color: white;
}
.page-nav ul li{
  height: 30px;
  line-height: 30px;
  margin-left: 5%;
  padding:0 10px;
  cursor: pointer;
}
.page-nav ul li.active{
  background:rgba(0,0,0,0.2);
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
}
</style>
