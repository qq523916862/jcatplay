<template>
    <div class="once-disk-box">
        <div class="container once-disk-box">
          <div class="row">
            <div class="col-xs-12 col-md-9 onec-music-session">
              <div class="col-xs-4">
                  <diskItem :item="disk"></diskItem>
              </div>
              <div class="col-xs-8">
                <div class="once-music-header">
                  <span class="once-music-header-badge">专辑 ·</span>
                  <span class="once-music-title">{{disk.title}}</span>
                </div>
                <div class="once-music-content">
                  <div >
                    歌手: <span class="once-music-msg" @click="">{{disk.singer}}</span>
                  </div>
                  <div>
                    发行时间: <span class="once-music-msg" @click="">{{new Date().toLocaleDateString()}}</span>
                  </div>
                  <playtool :count="3000"></playtool>
                  <br>
                  <div class="once-music-detailed">
                    <p class="h5">歌曲描述:</p>
                    <p class="text-indent">{{disk.detailed}}</p>
                  </div>
                </div>
              </div>

              <div class="col-xs-12 singer-music">
                <item-title :title="'专辑歌曲'" :list="[]"></item-title>
                <table class="table table-condensed music-table">
                  <thead>
                  <tr>
                    <td  style="width:9%" class="text-center"><span class="glyphicon bsicon-musictime"></span></td>
                    <td  style="width:30%"><span class="glyphicon bsicon-musicpush"></span> 歌名</td>
                    <td style="width:16%"></td>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item,index) in musicList">
                    <td class="text-center">
                      <span class="glyphicon icon-last " :class="{'bsicon-st':index==0,'bsicon-nd':index==1,'bsicon-rd':index==2}" v-if="index<3" ></span>{{index<3?"":index+1}}
                    </td>
                    <td>
                      <div class="msg text-ellip" :class="{'last-three':index<3}" @click=""> {{item.s_title}}</div>
                    </td>
                    <td class="text-center">
                      <span class="glyphicon bsicon-play1"></span> &nbsp
                      <span class="glyphicon glyphicon-heart"></span>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>


              <div class="col-xs-12">
                <comment></comment>
              </div>
            </div>
            <div class="hidden-xs hidden-sm  col-md-3 once-music-aside">
              <div class="once-music-aside-header"><span class="text-danger">Ta</span>的其他热门专辑</div>
              <div class="once-music-recommend-box row" v-for="item in recommend">
                <div class="col-xs-4 text-center"><img class="" :src="item.pic" alt=""></div>
                <div class="col-xs-8">
                  <p class="recommend-title text-ellip">{{item.title}}</p>
                  <p class="recommend-author1 text-ellip">发行时间  <span class="recommend-author">{{item.time}}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    import diskItem from '../newdisk/disk-item'
    import playtool from '../base/playTool'
    import comment from '../../comment/comment'
    import itemTitle from "../header/title"

    export default {
        name: "disk",
        data(){
          return {
            disk:{
              pic_src:"/static/images/index/disk2.jpg",
              disk_title:"",
              disk_singer:"",
              title:"不浪漫罪名",
              singer:"王杰",
              detailed:"王杰经典之作..."
            },
            recommend:[{title:"谁明浪子心",time:"95-04-06",pic:"/static/images/index/list1.jpg",shid:1},{title:"封锁我一生",time:"95-08-06",pic:"/static/images/index/list1.jpg",shid:1}],
            musicList:[]
          }
        },
        components:{
          diskItem,
          playtool,
          comment,
          itemTitle
        },
        methods:{
          getMusic(){
            this.$http.get("/api/disk/getMusic?did="+"1").then(result=>{
              this.musicList = result.body;
            },err=>{
              console.log(err);
            })
          }
        },
        mounted(){
          this.getMusic();
        }
    }
</script>

<style scoped>
  .once-disk-box{
    position: relative;
    background: #F5F5F5;
    top:-10px;
  }
  .once-disk-box .container{
    background: #ffffff;
  }
  .once-disk-box{
    background: white;
    border-left:1px solid #D3D3D3;
    border-right:1px solid #D3D3D3;
  }
  .onec-music-session{
    min-height:100px;
    padding:40px 10px;
    border-right:1px solid #D3D3D3;
    position: relative;
    right:-1px;
  }
  .once-music-aside{
    border-left:1px solid #dcdcdc;
    padding: 0px 15px;
    padding-top:30px;

  }
  .once-music-header-badge{
    background: #cd0d0c;
    padding:5px;
    padding-left:10px;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    color: white;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .once-music-header-badge::after{
    content:"";
    display: inline-block;
    position: absolute;
    width: 0px;
    height: 0px;
    border: transparent 12px solid;
    border-left-color: #cd0d0c;
    margin-left:4px;
    margin-top:2px;
  }
  .once-music-title{
    margin-left:15px;
    font-weight:600;
    font-size:18px;
    font-family: "Microsoft YaHei UI";
  }
  .once-music-content{
    padding-top: 10px;
    padding-left:10px;
    font-size:12px;
    color:gray;
  }
  .once-music-content>div{
    margin-top:10px;
  }
  .once-music-msg{
    padding-left:5px;
    color: #0C73C2;
    text-decoration: underline;
    cursor: pointer;
  }
  .text-indent{
    text-indent: 20px;
  }
  .once-music-aside-header{
    font-size: 15px;
    font-weight: 600;
    color: #2a2a2a;
    padding-bottom: 5px;
    border-bottom: 3px solid #C20C0B;
  }
  .once-music-recommend-box{
    margin:0px;
    margin-top:10px;
    padding:5px;
    border-bottom: 1px solid #efefef;
  }
  .once-music-recommend-box img{
    width:80%;
  }
  .text-ellip{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .recommend-title{
    height:50%;
    text-decoration: underline;
    cursor: pointer;
  }
  .recommend-author1{
    height:50%;
    display: table;
    color: gray;
  }
  .recommend-author{
    text-decoration: underline;
    cursor: pointer;
  }
  .singer-music{
    margin-top:20px;
  }
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
