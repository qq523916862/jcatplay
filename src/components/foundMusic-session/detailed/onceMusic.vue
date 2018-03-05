<template>
    <div class="page-box">
        <div class="container once-music-box">
            <div class="row">
                <div class="col-xs-12 col-md-9 onec-music-session">
                    <div class="col-xs-4">
                      <div class="text-center once-music-disk">
                        <img class="once-music-bg" :src="require('../../../assets/images/index/cddisk.png')" alt="">
                        <img class="once-music-pig" :src="song.src" alt="">
                      </div>
                    </div>
                    <div class="col-xs-8">
                      <div class="once-music-header">
                          <span class="once-music-header-badge">单曲 ·</span>
                          <span class="once-music-title">{{songmsg.s_title}}</span>
                      </div>
                      <div class="once-music-content">
                          <div >
                              歌手: <span class="once-music-msg" @click="onceSinger">{{songmsg.s_singer}}</span>
                          </div>
                          <div>
                            所属专辑: <span class="once-music-msg" @click="onceDisk">&lt;{{song.disk}}&gt;</span>
                          </div>
                        <playtool :count="pinglunCount"></playtool>
                        <br>
                        <div class="once-music-detailed">
                            <p class="h5">歌曲描述:</p>
                            <p class="text-indent">{{song.detailed}}</p>
                        </div>
                      </div>
                    </div>
                  <div class="col-xs-12">
                      <comment></comment>
                  </div>
                </div>
                <div class="hidden-xs hidden-sm  col-md-3 once-music-aside">
                  <div class="once-music-aside-header">包含这首歌的歌单</div>
                  <div class="once-music-recommend-box row" v-for="item in recommend">
                        <div class="col-xs-4 text-center"><img class="" :src="item.pic" alt=""></div>
                        <div class="col-xs-8">
                          <p class="recommend-title text-ellip">{{item.title}}</p>
                          <p class="recommend-author1 text-ellip">by  <span class="recommend-author">{{item.author}}</span></p>
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
    export default {
        name: "once-music",
        components:{
          playtool,
          comment
        },
        data(){
          return {
            song:{title:"爱不起",singer:"王杰",disk:"不浪漫是罪名",detailed:"王杰经典之作............................",src:"/static/images/index/disk4.jpg",sid:1},
            songmsg:{s_title:"",s_singer:""},
            pinglunCount:8013,
            recommend:[{title:"樱花树下",author:"leungboasing",pic:"/static/images/index/list1.jpg",shid:1},{title:"樱花树下",author:"leungboasing",pic:"/static/images/index/list1.jpg",shid:1}]
          }
        },
        methods:{
            onceSinger(){
              this.$router.push("/detailedSinger");
            },
            onceDisk(){
              this.$router.push("/detailedDisk")
            },
            getMusicMsg(id){
                this.$http.get("/api/ranking/music?sid="+id).then((result)=>{
                    this.songmsg = result.body;
                },err=>{
                  console.log(err.message);
                });
            }
        },
      mounted(){
          this.getMusicMsg(this.$route.query.id);
      }
    }
</script>

<style scoped>
.page-box{
  background:#F5F5F5;
  position: relative;
  top:-10px;
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
.once-music-bg{
  width:80%;
  margin-top:10px;
}
.once-music-pig{
  width:50%;
  position: absolute;
  top:10px;
  left:0px;
  right:0px;
  bottom:0px;
  margin:auto;
  border-radius: 50%;
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
</style>
