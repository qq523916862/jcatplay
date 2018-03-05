<template>
        <div class="singer-session-Body">
            <div class="singer-session-Body-item" @click="onceSinger" v-for="(item,index) in list" :class="{'before':index<10&&index>=5}">
              <img :src="item.pic" alt="" v-if="index<10">
              <figure class="text-center"><span class="bsicon-c" v-if="index<10"></span>{{item.name}}</figure>
            </div>
        </div>
</template>
<script>
  export default {
      name:"singerSession",
      data(){
          return {
              list:[],
              bus:this.$parent.bus
          }
      },
      methods:{
          getData(){
              this.$http.get("/api/singer/recommend").then(result=>{
                  this.list = result.body;
              },err=>{
                  console.log(err.message);
              })
          },
          setData(data){
              this.list = data;
          },
          onceSinger(){
            this.$router.push("/detailedSinger");
          }
      },
      mounted(){
          this.getData();
          this.bus.$on("setSessionData",(data)=>{
              this.setData(data);
          });
      }
  }

</script>

<style>
.singer-session-Body{
  padding-top:30px;
  display: flex;
  flex-flow: wrap;
  width:100%;
  padding-bottom:50px;
}
.singer-session-Body-item{
  width:20%;
  padding:10px;
  border:1px solid transparent;
  cursor: pointer;
  position: relative;
}
.singer-session-Body-item.before{
  margin-bottom: 50px;
}
.singer-session-Body-item.before::after{
  content:"";
  position: absolute;
  margin-top:30px;
  width:100%;
  border:1px #d0d2d2 dotted;
}
.singer-session-Body-item:hover{
  border-color:#D4D4D4;
  border-radius: 5px;
}
.singer-session-Body-item img{
  width:100%;
  border:1px solid #eeeeee;
}
.singer-session-Body-item .bsicon-c{
  color:red;
}
</style>
