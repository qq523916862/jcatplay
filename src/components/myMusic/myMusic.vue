<template>
  <div class="page-box-song-sheel">
    <div class="container once-music-box">
      <div class="row">
        <div class="col-xs-3 once-music-aside">
          <div class="once-music-aside-header">我的歌单</div>

          <ul class="u">
            <li :class="{'open-songsheel':openAside==0,'close-songsheel':openAside!=0}" @click="setAside(0)">创建的歌单</li>
            <li :class="{'open-songsheel':openAside==1,'close-songsheel':openAside!=1}" @click="setAside(1)">收藏的歌单</li>
          </ul>
          <p class="my-songsheel" ></p>
          <div class="once-music-recommend-box row"  v-show="openAside==0" >

          </div>
          <p class="hold-songsheel" >收藏的歌单</p>
            <div class="once-music-recommend-box row active" v-show="openAside==1">

            </div>
        </div>
        <div class="col-xs-9 onec-music-session">
          <div class="col-xs-4">
            <div class="text-center once-music-disk">
              <img class="once-music-pig img-thumbnail" :src="songsheel.src" alt="">
            </div>
          </div>
          <div class="col-xs-8">
            <div class="once-music-header">
              <span class="once-music-header-badge">歌单 ·</span>
              <span class="once-music-title">{{songsheel.title}}</span>
            </div>
            <div class="once-music-content">
              <div >
                创建者: <span class="once-music-msg" @click="">{{songsheel.anthor}}</span>
              </div>
              <div>
                标语:
                <span class="label label-info songsheel-label" v-for="item in songsheel.label">{{item}}</span>
              </div>
              <div>
                    <span class="once-tool-play once-music-tool">
                        <span class="glyphicon bsicon-play1" title="播放"> 播放</span><span class="glyphicon glyphicon-plus" title="添加到播放列表"></span>
                    </span>
                        <span class="once-music-tool once-tool-hold">
                        <span class="glyphicon glyphicon-dashboard" title="删除">删除</span>
                    </span>
                    <span class="once-music-tool once-tool-hold">
                    <span class="glyphicon bsicon-message3" title="评论"> 评论({{pinglunCount}})</span>
                </span>
              </div>
              <br>
              <div class="once-music-detailed">
                <p class="h5">介绍:</p>
                <p class="text-indent">{{songsheel.detailed}}</p>
              </div>
            </div>
          </div>
          <div class="songsheel-list col-xs-12">
            <item-title :title="'歌曲列表'" :list="[]"></item-title>
            <music-list :list="Musiclist"></music-list>
          </div>
          <div class="col-xs-12">
            <comment></comment>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import comment from '../comment/comment'
import itemTitle from "../foundMusic-session/header/title"
import musicList from "../foundMusic-session/ranking-list/music-list"
export default {
    name:"myMusic",
    components:{
      comment,
      itemTitle,
      musicList
    },
    data(){
      return {
        songsheel:{src:"/static/images/index/disk4.jpg",anthor:"leungboasing",label:["摇滚","粤语","休闲"],title:"失忆蝴蝶",detailed:"如果真的有平行时空的话，我希望我们再也不要相见了。天南地北或者远隔重洋 ，像落叶躲开了春季 ，像鲸鱼跃不过天际 ，像飞鸟飞不到海底 ，就让我对你，避之不及。从此山水不相逢,不问就人长于短"},
        pinglunCount:8013,
        Musiclist:[],
        recommend:[{title:"樱花树下",author:"leungboasing",pic:"/static/images/index/list1.jpg",shid:1},{title:"樱花树下",author:"leungboasing",pic:"/static/images/index/list1.jpg",shid:1}],
        openAside:0
      }
    },
    methods:{
      getMusic(){
        this.$http.get("/api/ranking/forElectric").then(result=>{
          this.Musiclist = result.body;
        });
      },
      setAside(num){
        this.openAside = num;
      }
    },
    mounted(){
      this.getMusic();
    }
}

</script>

<style scoped>
  .page-box-song-sheel{
    background:#F5F5F5;
    position: relative;
    top:50px;
  }
  .once-music-box{
    background: white;
    border-left:1px solid #D3D3D3;
    border-right:1px solid #D3D3D3;
  }
  .onec-music-session{
    min-height:100px;
    padding:40px 10px;
    border-right:1px solid #D3D3D3;
    border-left:1px solid #dcdcdc;
    position: relative;
    right:-1px;
  }
  .once-music-aside{
    border-left:1px solid #dcdcdc;
    padding: 0px 15px;
    padding-top:30px;

  }
  .once-music-disk{
    position: relative;
  }
  .once-music-pig{
    width:80%;
    margin:auto;
    border: #0E1113 1px solid;
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
    font-size: 17px;
    font-weight: 600;
    color: #2a2a2a;
    padding-bottom: 5px;
    border-bottom: 3px solid #C20C0B;
  }
  .once-music-recommend-box{
    margin:0px;
    margin-top:10px;
    padding:0px;
  }
  .once-music-recommend-box .active{
    background: #E6E6E6;
  }
  .once-music-recommend-box img{
    width:100%;
    border:1px #CCCCCC solid;
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
  .songsheel-label{
    margin-left:10px;
    font-weight: 500;
  }
  .songsheel-list{
    margin-top:50px;
  }
  .once-tool-play{
    background: linear-gradient(to bottom,#5EA3E3 0%, #2E7ECB 50%,#1D6EBE 100%);
    color: white;
    border:1px solid #5FA8E3;
    box-shadow: 0px 0px 3px #5EA3E3;
  }
  .once-tool-play span{
    padding-left:10px;
    padding:7px;
    margin-top:-2px;
  }
  .once-tool-play span:first-child{
    border-right:1px solid #2a6da6;
    padding-right:5px;
    margin-bottom:1px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  .once-tool-play span:last-child{
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .once-tool-play span:hover{
    background:rgba(255,255,255,0.1);
  }
  .once-tool-hold{
    box-shadow:0px 0px 2px #E5E5E5;
    margin-left:10px;
    color: #000;
    background: linear-gradient(to bottom, #fafafa 0%, #e0e0e0 100%);
    border:1px #cbcbcb solid;
    padding:5px 7px;
  }
  .once-tool-hold:hover{
    background: rgba(103, 103, 103, 0.1);
  }
  .once-music-tool{
    display: inline-block;
    border-radius: 5px;
    font-size:13px;
    cursor: pointer;
  }
  .my-songsheel,.hold-songsheel{
    padding: 5px 0;
    margin-top:10px;
    font-weight:600;
    position: relative;
    /*border-bottom:1px solid #DCDCDC;*/
    cursor: pointer;
  }
  .hold-songsheel{
    margin-top:0px;
  }
  .open-songsheel::before{
    content:"";
    display:inline-block;
    width: 0px;
    height: 0px;
    border: 5px solid transparent;
    border-top-color: #000;
    margin-right:4px;
  }
  .close-songsheel::before{
    content:"";
    display:inline-block;
    width: 0px;
    height: 0px;
    border: 5px solid transparent;
    border-left-color: #000;
  }
</style>

