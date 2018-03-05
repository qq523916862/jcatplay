<template>
    <div class="page-box">
      <div class="container once-singer-box">
        <div class="row">
          <div class="col-xs-12 col-md-9 onec-music-session">
            <div class="col-xs-4 text-center">
                <img class="once-music-pig" :src="singer.src" alt="">
            </div>
            <div class="col-xs-8">
              <div class="once-music-header">
                <span class="once-music-header-badge">歌手 ·</span>
                <span class="once-music-title">{{singer.name}}</span>
              </div>
              <div class="row singerTool">
                  <div class="col-xs-3 text-center">动态({{singer.lift}})</div>
                  <div class="col-xs-3 text-center"><span class="glyphicon glyphicon-plus"></span>关注</div>
                  <div class="col-xs-3 text-center">粉丝({{singer.fans}})</div>
              </div>
              <div class="once-music-content">
                <div class="once-music-detailed">
                  <p class="h5">歌手描述:</p>
                  <p class="text-indent">{{singer.detailed}}</p>
                </div>
              </div>
            </div>

            <div class="col-xs-12 singer-music">
                <item-title :title="'Ta的热门歌曲'" :list="[]"></item-title>
                <table class="table table-condensed music-table">
                  <thead>
                  <tr>
                    <td  style="width:9%" class="text-center"><span class="glyphicon bsicon-musictime"></span></td>
                    <td  style="width:30%"><span class="glyphicon bsicon-musicpush"></span> 歌名</td>
                    <td  style="width:25%"><span class="glyphicon bsicon-shebei"></span> 专辑</td>
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
                    <td class="">
                      <div class="msg text-ellip" @click="">{{item.disk_title}}</div>
                    </td>

                    <td class="text-center">
                      <span class="glyphicon bsicon-play1"></span> &nbsp
                      <span class="glyphicon glyphicon-heart"></span>
                    </td>
                  </tr>
                  </tbody>
                </table>
            </div>

            <div class="singer-disk col-xs-12">
                  <item-title :title="'Ta的专辑'" :list="[]"></item-title>
                  <div class="col-xs-12">
                      <div class="col-xs-2" v-for="item in diskList">
                          <disk-item :item="item"></disk-item>
                      </div>
                  </div>
            </div>

            <div class="col-xs-12">
              <comment></comment>
            </div>
          </div>
          <div class="hidden-xs hidden-sm  col-md-3 once-music-aside">
            <div class="once-music-aside-header">其他热门歌手</div>
            <div class="singer-modular-contain" @click="" v-for="item in singerList">
              <div class="singer-item" :data-singer="item.eid">
                <img :src="item.pic" alt="">
                <div class="inger-item-r">
                  <span class="singer-name">{{item.name}}</span><br>
                  <span class="singer-more">{{item.tips}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
    import playtool from '../base/playTool'
    import comment from '../../comment/comment'
    import itemTitle from "../header/title"
    import diskItem from '../newdisk/disk-item'
    export default {
      name: "once-singer",
      components:{
        playtool,
        comment,
        itemTitle,
        diskItem
      },
      data(){
        return {
          singer:{name:"王杰",src:"/static/images/index/singer2.jpg",detailed:"经典香港流行歌手.....",fans:8035,lift:52},
          singerList:[],
          musicList:[],
          diskList:[]
        }
      },
      methods:{
        getMusicMsg(id){
          this.$http.get("/api/ranking/music?sid="+id).then((result)=>{
            this.songmsg = result.body;
          },err=>{
            console.log(err.message);
          });
        },
        getSinger(){
          $.ajax({
            url:"/api/index/singer",
            type:"GET",
            dataType:"json"
          }).then(data=>{
            this.singerList=data;
          },err=>{
            console.log(err);
          });
        },
        getMusic(){
          this.$http.get("/api/singer/getMusic?singer="+"林峰").then(result=>{
            this.musicList = result.body;
          },err=>{
            console.log(err);
          })
        },
        getDisk(){
          this.$http.get("/api/singer/getDisk?singer="+"林峰").then(result=>{
            this.diskList = result.body;
            console.log(result);
          },err=>{
            console.log(err);
          })
        }
      },
      mounted(){
          this.getSinger();
          this.getMusic();
          this.getDisk();
      }
    }
</script>

<style scoped>
  .page-box{
    background:#F5F5F5;
    position: relative;
    top:-10px;
  }
  .once-singer-box{
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
  .once-music-pig{
    width:80%;
    border-radius: 5px;
    border: #37444b 1px solid;
    box-shadow: 0px 0px 10px rgba(100,100,100,0.8);
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
  .once-music-recommend-box img{
    width:80%;
  }
  .singer-modular-contain{
    padding: 0 5% ;
  }
  .singer-item{
    border:1px solid #E9E9E9;
    display:flex;
    margin-top:15px;
    flex-flow:row wrap;
    justify-content:space-between;
    align-items:flex-start;
    background: #FAFAFA;
    border-radius:5px;
    cursor: pointer;
  }
  .singer-item img{
    width:30%;
    box-sizing:border-box;
  }
  .inger-item-r{
    width:70%;
    box-sizing:border-box;
    padding:5% 10% 0;
  }
  .inger-item-r .singer-name{
    margin-top:20px;
    color:black;
    font-size:1.1em;
    font-family: STKAITI;
  }
  .inger-item-r .singer-more{
    color:gray;
    font-size:0.7em;
    display:block;
    width:100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
  }
  .singerTool{
    margin:0px;
    margin-top:20px;
    border-top: 1px solid #D3D3D3;
    padding:5px 20px;
  }
  .singerTool>div{
    cursor: pointer;
    padding:10px 0;
  }
  .singerTool>div:nth-child(2){
    border-right: 1px solid #D3D3D3;
    border-left: 1px solid #D3D3D3;
  }
  .singer-music{
    margin-top:30px;
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
  .singer-disk{
    margin-top:20px;
  }
</style>
