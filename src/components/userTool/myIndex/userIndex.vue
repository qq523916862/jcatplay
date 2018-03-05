<template>
  <div class="page-box">
    <div class="container once-singer-box">
      <div class="row">
        <div class="col-xs-12 onec-music-session">
          <div class="col-xs-4 text-center">
            <img class="once-music-pig" :src="user.src" alt="">
          </div>
          <div class="col-xs-8">
            <div class="once-music-header">
              <span class="once-music-header-badge"><span class="glyphicon glyphicon-user"></span> ·</span>
              <span class="once-music-title">{{user.name}}</span>
            </div>

            <div class="row singerTool">
              <div class="col-xs-2 text-center">动态({{user.lift}})</div>
              <div class="col-xs-2 text-center"><span class="glyphicon glyphicon-plus"></span>关注</div>
              <div class="col-xs-2 text-center">粉丝({{user.fans}})</div>
            </div>
            <div class="once-music-content">
              <p class="col-xs-12">地区：{{user.place}}</p>
              <p class="col-xs-12">年龄：{{user.years}}</p>
              <div class="once-music-detailed">
                <p class="h5">用户描述:</p>
                <p class="text-indent">{{user.detailed}}</p>
              </div>
            </div>
          </div>

          <div class="col-xs-12 singer-music">
            <item-title :title="'Ta的歌曲列表'" :list="[]"></item-title>
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

                <td>
                  <div class="msg text-ellip" @click="">{{item.s_singer}}</div>
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
            <item-title :title="'Ta创建的歌单'" :list="[]"></item-title>
            <div class="col-xs-12">
              <div class="song-sheel-body ">
                <div class="music-list-item col-xs-4 col-md-3 col-lg-2"  v-for="(item,index) in songsheelList">
                  <div class="music-list-item-body">
                    <img class="music-pic" :src="item.pic_src" alt="" :data-target="item.singColNum" />
                    <div class="music-pic-box2"></div>
                  </div>
                  <div class="footer">
                    <span class="foot-left glyphicon bsicon-listening"></span>
                    <span>{{item.foot_listen}}万</span>
                    <span class="foot-right glyphicon bsicon-play" :data-target="item.href"></span>
                  </div>
                  <figure @click="">{{item.item_title}}</figure>
                </div>
              </div>
            </div>
          </div>

          <div class="singer-disk col-xs-12">
            <item-title :title="'Ta收藏的歌单'" :list="[]"></item-title>
            <div class="col-xs-12">
              <div class="song-sheel-body ">
                <div class="music-list-item col-xs-4 col-md-3 col-lg-2"  v-for="(item,index) in songsheelList">
                  <div class="music-list-item-body">
                    <img class="music-pic" :src="item.pic_src" alt="" :data-target="item.singColNum" />
                    <div class="music-pic-box2"></div>
                  </div>
                  <div class="footer">
                    <span class="foot-left glyphicon bsicon-listening"></span>
                    <span>{{item.foot_listen}}万</span>
                    <span class="foot-right glyphicon bsicon-play" :data-target="item.href"></span>
                  </div>
                  <figure @click="">{{item.item_title}}</figure>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>


<script>
    import playtool from '../../foundMusic-session/base/playTool'
    import itemTitle from "../../foundMusic-session/header/title"
    import diskItem from '../../foundMusic-session/newdisk/disk-item'

    export default {
      name: "user-index",
      components:{
        playtool,
        itemTitle,
        diskItem
      },
      data(){
        return {
          user:{name:"leungboasing",src:"/static/images/index/user.jpg",detailed:"属于我得是未知的存在.....",fans:8035,lift:52,place:"广东",years:23},
          singerList:[],
          musicList:[],
          songsheelList:[]
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
        getSongSheel(){
          this.$http.get("/api/songsheel/getpage?count="+1).then(data=>{
            this.songsheelList = data.body;
          },err=>{
            console.log(err);
          })
        }
      },
      mounted(){
        this.getSinger();
        this.getMusic();
        this.getSongSheel();
      }
    }
</script>

<style scoped>
  .page-box{
    background:#F5F5F5;
    position: relative;
    top:50px;
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
  .once-music-recommend-box img{
    width:80%;
  }
  .singer-item img{
    width:30%;
    box-sizing:border-box;
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
  .once-music-detailed{
    margin-top:20px;
  }
  .song-sheel-body{
    display:flex;
    flex-flow:row wrap;
    justify-content:flex-start;
    align-items:flex-start;
    margin-left:0px;
    margin-right:0px;
    background:white;
    padding:30px;
    margin:0px;
  }
  .music-list-item{
    padding:10px;
    position: relative;
    color:#CACACA;
  }
  .music-list-item figure{
    cursor: pointer;
  }
  .music-list-item img{
    width:100%;
    border:1px #A9B9C6 solid;
    box-sizing:border-box;
    cursor: pointer;
  }
  .music-list-item figure{
    position: relative;
    width:100%;
    height:3.5em;
    line-height:1.2em;
    font-size:0.9em;
    overflow: hidden;
    text-overflow:ellipsis;
    color:black;
    top:-1em;
  }
  .music-list-item .footer{
    height:2em;
    background:linear-gradient(to bottom,rgba(0,0,0,.3) 0%,rgba(0,0,0,.5)100%);
    line-height:2em;
    position: relative;
    bottom:2em;
  }
  .music-list-item .footer .glyphicon{
    color:#ffffff;
  }
  .music-list-item .foot-left{
    margin-left:5px;
    margin-top:2px;
  }
  .music-list-item .foot-right{
    float:right;
    margin-top:6px;
    margin-right:5px;
    cursor: pointer;
  }



</style>

