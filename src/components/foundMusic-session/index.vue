<template>
  <div class="row centain">
    <div class="col-sm-1 hidden-xs bg-l"></div>
    <div class="content col-xs-12 col-sm-10 col-sm-offset-1">
      <carousel></carousel>
      <playerBack></playerBack>
    </div>
    <div class="col-sm-1 hidden-xs bg-r"></div>
    <div class="col-xs-12 col-sm-10 col-sm-offset-1 bgw">
      <div class="col-xs-9">
        <div class="row motule-item">
          <musictitle :list="list[0]" :title="title[0]" :jump="'songsheel'"></musictitle>
          <musicItem></musicItem>
        </div>
        <div class="row motule-item">
          <musictitle :list="list[1]" :title="title[1]" :jump="'diskshelves'"></musictitle>
          <newdiskitem></newdiskitem>
        </div>
        <div class="row motule-item">
          <musictitle :list="list[2]" :title="title[2]" :jump="'rankinglist'"></musictitle>
          <songlist></songlist>
        </div>
        <div class="row motule-item">
          <myfoot></myfoot>
        </div>
      </div>
      <div class="col-xs-3 singer">
        <singerlist></singerlist>
      </div>
    </div>
  </div>

</template>
<script>
  import carousel from "./carousel/carousel"
  import playerBack from "./carousel/playerBack"
  import musictitle from "./header/title"
  import musicItem from "./hotMusic/musicItem"
  import newdiskitem from "./newdisk/newdisk"
  import songlist from "./musicList/musicList"
  import singerlist from "./singer/singer"
  import myfoot from "../footer/footer"

  export default {
    name:"foundMusic-index",
    data:function(){
      return {
          list:[["华语","流行","摇滚","民谣","电子"],[],[]],title:["热门推荐","新碟上架","榜单"],
          bus:this.$parent.bus
      }
    },
    components:{
      carousel,
      playerBack,
      musictitle,
      musicItem,
      songlist,
      newdiskitem,
      singerlist,
      myfoot
    }
  }



</script>

<style>
  .content{
    position: relative;
    margin-top:-10px;
    overflow: hidden;
  }
  .row.centain{
    margin-left:0px;
    margin-right:0px;
  }
  .bg-r,.bg-l{
    position:fixed;
    z-index:1;
    height:100%;
    top:50px;
    opacity:0.5;
    transition:background-color 1s ease 0s;
  }
  .bg-r{
    right:0px;
  }
  .motule-item{
    padding:15px;
    background:#E7E9EB;
    margin-left:0px;
    margin-right:0px;
    border-left:1px solid #A9A498;
    border-right:1px solid #A9A498;
  }
  .singer{
    height:100%;
    background:white;
  }
  .bgw{
    background: white;
  }

</style>
