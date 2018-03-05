<template>
  <div class="fetchlist-box row">
      <div class="fetchlist-header col-xs-12">
          <button class="btn btn-default btn-sm col-xs-3">全部风格</button>
      </div>
      <div class="col-xs-12 fetchlist-body">
          <div class="col-xs-3 fetchlist-body-aside">
              <div class="col-xs-12" v-for="(item,index) in title"><span class="glyphicon" :class="{'bsicon-shuju':index==0,'bsicon-style':index==1,'bsicon-changjing':index==2,'bsicon-feel':index==3}"></span>{{item.msg}}</div>
          </div>
          <div class="col-xs-9 fetchlist-body-session">
               <div class="col-xs-12" v-for="(item,index) in list">
                   <ul class="list-unstyle list-inline">
                        <li v-for="(child,index) in item">{{child.msg}}</li>
                   </ul>
               </div>
          </div>
      </div>

  </div>

</template>



<script>
  export default {
      data(){
          return {
              title:[{msg:"语言"},{msg:"风格"},{msg:"场景"},{msg:"情感"}],
              list:{
                  language:[{msg:"华语"},{msg:"粤语"},{msg:"欧美"},{msg:"日语"},{msg:"韩语"}],
                  style:[{msg:"民谣"},{msg:"摇滚"},{msg:"民谣"},{msg:"古风"},{msg:"电子"}],
                  place:[{msg:"学习"},{msg:"工作"},{msg:"休闲"},{msg:"深夜"}],
                  feel:[{msg:"怀旧"},{msg:"清新"},{msg:"动感"},{msg:"思念"}]
              }
          }
      }

  }

</script>



<style>


.fetchlist-box{
  position:absolute;
  height:270px;
  width:400px;
  background: white;
  z-index:8;
  border:1px #E6E6E6 solid;
  -webkit-border-radius:3px;
  -moz-border-radius:3px;
  border-radius:3px;
  -webkit-box-shadow: 0px 0px 5px #444444;
  -moz-box-shadow: 0px 0px 5px #444444;
  box-shadow:-1px 1px 10px #444444;
}
.fetchlist-header{
  padding:10px;
  border-bottom:1px solid #CBCBCB;
  height:50px;
}
.fetchlist-body-aside{
  border-right:1px solid #CBCBCB;
  height:218px;
}
.fetchlist-body-aside>div{
  height:50px;
  line-height:50px;
  text-align: center;
}
.fetchlist-body-aside .glyphicon{
  font-size:20px;
  float:left;
  margin:13px 0 0 20px;
}
.fetchlist-body-session{
  height:218px;
}
.fetchlist-body-session>div{
    padding-left:20px;
    height:50px;
}
.fetchlist-body-session>div li{
  cursor: pointer;
  border-right:1px solid #CBCBCB;
  height: 20px;
  padding:0 10px;
  margin-top:15px;
}
.fetchlist-body-session>div li:last-child{
  border-right-color: transparent;
}
.fetchlist-body-session li:hover{
  text-decoration: underline;
}
</style>
