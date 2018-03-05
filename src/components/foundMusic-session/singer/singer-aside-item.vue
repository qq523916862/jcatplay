<template>
  <div class="singer-aside-item">
    <div class="singer-aside-title">
      <span>{{info.title}}</span>
      <ul>
        <li v-for="(item,i) in info.list" :class="{'active':active==i}" @click="change(i)">{{item}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default{
      name:"singerNav",
      props:["info","index","bus"],
      data(){
          return {
              active:null
          }
      },
      methods:{
          change(i){
            this.bus.$emit("singerChange");
            this.active = i;
          }
      },
      mounted(){
          this.bus.$on("singerChange",()=>{
              this.active=null;
          });
          if(this.index==0){
              this.active=0;
          }
      }
  }


</script>

<style>
.singer-aside-item{
  padding-top:10px;
  border-bottom:1px solid #D2D2D2;
  margin:0 10px;
}
.singer-aside-title>span{
  font-weight:600;
  font-size:18px;
  font-family: "Microsoft YaHei";
  padding-left:20px;
  color: #3c3c3c;
}
.singer-aside-item ul{
  padding:5px 10px 0px;
  list-style-type: circle;
}
.singer-aside-item ul li{
  border:1px transparent solid;
  list-style-position: inside;
  padding-left:20px;
  margin:1px 0;
  color:#2B342F;
  cursor: pointer;
}
.singer-aside-item ul li:hover{
  text-decoration: underline;
}
.singer-aside-item ul li.active{
  background: #fdfdfd;
  color:#C80813;
  list-style-type:disc;
  border-color: #dbdbdb;
  text-decoration: none;
}

</style>
