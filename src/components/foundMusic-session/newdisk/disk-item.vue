<template>
    <div class="diskShelves-centent-item-box">
      <div class="disk-box">
        <img :src="item.pic_src" alt="" :data-target="item.href" :data-diskNum = "item.singColNum">
      </div>
      <div class="disk-title not-wrap text-center">{{item.disk_title}}</div>
      <div class="disk-singer not-wrap text-center">{{item.disk_singer}}</div>
    </div>
</template>
<script>
 export default{
   name:"diskItem",
   props:["item"]
 }
</script>
<style>
  .diskShelves-centent-item-box{
    padding: 5px 10px;
  }
 .disk-box{
    position: relative;
    text-align:right;
    padding-right:18%;
    top:0px;
    left:0px;
    bottom:0px;
    right:0px;
    background:url(../../../assets/images/disk/coverall.png) 0% 74.8%;
    -webkit-background-size: 100%;
    background-size: 177%;
    margin-top:20px
  }

.disk-box img{
  width:100%;
  border-radius: 2px;
  border:1px solid #BEBEBE;
  border-right-width: 0px;
}
.not-wrap{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.disk-title{
  padding-right:18%;
}
.disk-singer{
  padding-right:18%;
}
</style>
