<template>
    <table class="table table-condensed music-table">
      <thead>
        <tr>
          <td  style="width:9%" class="text-center"><span class="glyphicon bsicon-musictime"></span></td>
          <td  style="width:30%"><span class="glyphicon bsicon-musicpush"></span> 歌名</td>
          <td  style="width:25%"><span class="glyphicon bsicon-shebei"></span> 专辑</td>
          <td  style="width:20%"><span class="glyphicon bsicon-user1"></span> 歌手</td>
          <td style="width:16%"></td>
        </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in list">
        <td class="text-center">
          <span class="glyphicon icon-last " :class="{'bsicon-st':index==0,'bsicon-nd':index==1,'bsicon-rd':index==2}" v-if="index<3" ></span>{{index<3?"":index+1}}
        </td>
        <td>
          <div class="msg text-ellip" :class="{'last-three':index<3}" @click="onceMusic(item.sid)"> {{item.s_title}}</div>
        </td>
        <td class="">
          <div class="msg text-ellip" @click="onceDisk">{{item.disk_title}}</div>
        </td>

        <td>
          <div class="msg text-ellip" @click="onceSinger">{{item.s_singer}}</div>
        </td>

        <td class="text-center">
          <span class="glyphicon bsicon-play1"></span> &nbsp
          <span class="glyphicon glyphicon-heart"></span>
        </td>
      </tr>
      </tbody>
    </table>
</template>

<script>
    export default {
        name: "music-list",
        props:["list"],
        data(){
          return {
            songLike:false,
            songsheelLike:false
          }
        },
      methods:{
        likeSong(){
          this.songLike = !this.songLike;
          console.log(this.songLike)
        },
        likeSongsheel(){
          this.songsheelLike = !this.songsheelLike;
          console.log(this.songsheelLike)
        },
        onceSinger(){
          this.$router.push("/detailedSinger");
        },
        onceDisk(){
          this.$router.push("/detailedDisk");
        },
        onceMusic(sid){
          this.$router.push({path:"/detailedMusic",query:{id:sid}});
        }
      },
      mounted(){
          console.log(this.list)
      }
    }
</script>

<style scoped>
.music-table{
  table-layout: fixed;
}
.music-table thead td{
  color: #474747;
}
.music-table tbody tr td:last-child .glyphicon:hover{
  color: #464646;
}
.music-table tbody{
  border-left:1px solid #D9D9D9;
  border-bottom:1px solid #D9D9D9;
  border-right:1px solid #D9D9D9;
}
.music-table td{
  color: gray;
  font-family: "Microsoft YaHei UI";
  padding-left:10px;
  padding-right:10px;
}
.music-table thead tr {
  border-top:1px solid #D9D9D9;
  border-right: 1px solid #D9D9D9;
}
.music-table thead tr td{
  border-left:1px solid #D9D9D9;
  background:linear-gradient(to bottom,#FFFFFF 0%,#F0F0F0 100%);
}
.music-table tbody tr:first-child td:first-child{
  color:red;
}
.music-table tbody tr:nth-child(2) td:first-child{
  color: #ffaa3f;
}
.music-table tbody tr:nth-child(3) td:first-child{
  color: #c3ff1a;
}
.music-table tbody tr:nth-child(2n-1){
  background: #F7F7F7;
}

.text-ellip{
  width:100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.msg:hover{
  text-decoration: underline;
  cursor: pointer;
}
</style>
