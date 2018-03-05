<template>
    <div class="ranking-list">
        <songitem :img="img[0]" :search="search[0]" :title="title[0]"></songitem>
        <songitem :img="img[1]" :search="search[1]" :title="title[1]"></songitem>
        <songitem :img="img[2]" :search="search[2]" :title="title[2]"></songitem>
    </div>
</template>

<script>

import songitem from "./listItem"
export default {
      name:"songlist",
      components:{
         songitem
      },
       data(){
          return {img:[1,2,3],search:["/api/index/songByHot","/api/index/songByTime","/api/index/songByElectric"],title:["音乐飙升榜","音乐新歌榜","音乐电力榜"]};
      },
      mounted(){

      }


  }


</script>

<style>
.ranking-list{
		border:1px #D3D3D3 solid;
		border-right-width:0px;
		margin-top:20px;
		display: flex;
		flex-flow:row nowrap;
		justify-content:space-between;
		align-items:flex-start;
		box-sizing:border-box;
	}
</style>
