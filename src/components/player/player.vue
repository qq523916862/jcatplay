<template>
    <div class="player-box">
        <div class="player-disk palyerRun" :class="{'playerPause':!Active}"></div>
        <div class="player-constrol">
            <span class="glyphicon glyphicon-step-backward" @click="prev()"></span>
            <span class="glyphicon glyphicon-play" :class="{'glyphicon-pause':Active,'glyphicon-play':!Active}" @click="puase()"></span>
            <span class="glyphicon glyphicon-step-forward" @click="next()"></span>
        </div>
        <div class="process-bg" @mousedown.prevent="process($event)">
            <div class="process-on" :style="{'width':processNow+'%'}"></div>
        </div>
        <span class="nowTime">{{timeror}}</span>
        <span class="player-mode glyphicon" :class="{'glyphicon-random':!musicMode,'glyphicon-retweet':musicMode}"  @click="mode()" ></span>
        <span class="volume glyphicon" :class="{'glyphicon-volume-off':volumeNow==0,'glyphicon-volume-down':volumeNow!=0&&volumeNow<0.5,'glyphicon-volume-up':volumeNow>=0.5}" @click="volumeZero()" ></span>
        <span class="song-title">
            {{songMsg}}
        </span>
        <div class="volume-Roller" @mousedown.prevent="volume($event)">
             <div class="volume-now" :style="{'width':volumeNow*100+'%'}"></div>
        </div>
        <audio id="player" :src="require('../../assets/media/'+src)" :volume="volumeNow"></audio>
        <!--<audio id="player" src="D:/Music/刘德华/222.mp3" ></audio>-->
        <!--<div class="player-hidden"> <span class="glyphicon bsicon-suo"></span></div>-->
    </div>
</template>

<script>
  class player{
      constructor(id){
          this.player = $("#"+id)[0];
      }
      getTime(){
          return this.player.duration;
      }
      getNow(){
          return this.player.currentTime;
      }
      play(){
          this.player.play();
      }
      pause(){
          this.player.pause();
      }
      setNow(time){
          return this.player.currentTime = time;
      }
      getPlayer(){
          return this.player;
      }
      getVol(){
          return this.player.volume;
      }
      setVol(vol){
          this.player.volume = vol;
      }
  }
 export default {
    name:"player",
    data(){
        return {
            songName:"",
            singer:"",
            Active:false,
            musicMode:true,
            volumeNow:1,
            volumeBefore:0,
            bus:this.$parent.bus,
            src:"卢冠廷 - 賭神.mp3",
            time:0,
            now:0,
            player:null,
            timer:null
        }
    },
    computed:{
        songMsg(){
            if(this.songName==""){
                return "";
            }else{
                return this.songName+"-"+this.singer;
            }
        },
        timeror(){
            var min = Math.floor(this.now/60)<10?"0"+ Math.floor(this.now/60): Math.floor(this.now/60);
            var second = Math.floor(this.now%60)<10?"0"+Math.floor(this.now%60):Math.floor(this.now%60);
            var emin = Math.floor(this.time/60)<10?"0"+ Math.floor(this.time/60):""+Math.floor(this.time/60);
            var esecond = Math.floor(this.time%60)<10?"0"+Math.floor(this.time%60):""+Math.floor(this.time%60);
            return min+":"+second+" / "+ emin+":"+esecond;
        },
        processNow(){
            return this.now/this.time*100;
        }
    },
    methods:{
        puase(){
            if(this.Active){
                this.player.pause();
                clearInterval(this.timer);
            }else{
                this.player.play();
                this.timer = setInterval(()=>{
                    this.now = this.player.getNow();
                    this.time = this.player.getTime();
                },500);
            }
            this.Active = !this.Active;
            this.time = this.player.getTime();
        },
        mode(){
            this.musicMode = !this.musicMode;
        },
        process(e){
            var $tar = $(".process-bg");
            var ps = e.offsetX/$tar.innerWidth();
            this.player.setNow(this.time*ps);
            this.now = this.time*ps;
            $tar[0].onmousemove = (e)=>{
                var ps = e.offsetX/$tar.innerWidth();
                this.player.setNow(this.time*ps);
                this.now = this.time*ps;
            };
             $tar[0].onmouseup = (e)=>{
                 $tar[0].onmousemove = null;
             }
             $tar[0].onmouseleave = (e)=>{
                 $tar[0].onmousemove = null;
             }
        },
        volume(e){
            var $tar = $(".volume-Roller");
            this.volumeNow = e.offsetX/$tar.innerWidth()>1?1:e.offsetX/$tar.innerWidth();
            this.player.setVol(this.volumeNow);
             $tar[0].onmousemove = (e)=>{
                  this.volumeNow = e.offsetX/$tar.innerWidth()>1?1:e.offsetX/$tar.innerWidth();
                  this.player.setVol(this.volumeNow);
             };
             $tar[0].onmouseup = (e)=>{
                  $tar[0].onmousemove = null;
             }
             $tar[0].onmouseleave = (e)=>{
                  $tar[0].onmousemove = null;
             }
        },
        volumeZero(){
            if(this.volumeNow!=0){
                this.volumeBefore = this.volumeNow;
                this.volumeNow = 0;
                this.player.setVol(this.volumeNow);
            }else{
                 this.volumeNow = this.volumeBefore;
                 this.player.setVol(this.volumeNow);
            }
        },
        next(){
            this.bus.$emit("btnTool",this.musicMode,"next");
        },
        prev(){
            this.bus.$emit("btnTool",this.musicMode,"prev");
        }
    },
    created(){
        this.bus.$on("changePlayer",(data)=>{
              this.songName = data.title;
              this.singer = data.singer;
              this.src = data.src;
              this.player.getPlayer().oncanplay = ()=>{
                  this.Active=false;
                  this.puase();
              }
        });
    },
    mounted(){
        this.player = new player("player");
        this.player.getPlayer().onended = ()=>{
            this.bus.$emit("btnTool",this.musicMode,"next");
        }
    }
 }
</script>

<style>
.player-box{
    min-width:640px;
    position:fixed;
    bottom:0px;
    width:100%;
    height:50px;
    background:linear-gradient(to top,rgba(10,10,10,1) 0%,rgba(20,20,20,0.9) 100%);
    z-index:10;
}
.player-disk{
    position:absolute;
    left:30px;
    width:40px;
    height:40px;
    top:5px;
    background:url("../../assets/images/index/cddisk.png") center center no-repeat;
    background-size:100%;
    background-color:transparent;
}
.palyerRun{
    animation:cdplay 5s linear infinite 0s;
}
.playerPause{
    animation-play-state:paused;
}
@keyframes cdplay{
	0%{
		transform:rotate(0deg);
	}
	100%{
		transform:rotate(360deg);
	}
}
.player-constrol{
    position:absolute;
    left:80px;
    color:#ccc;
    height:30px;
    top:10px;
}
.player-constrol .glyphicon{
    margin-left:20px;
    line-height:30px;
}
.glyphicon{
    cursor:pointer;
}
.process-bg,.process-on{
    height:6px;
    position:absolute;
    background:rgba(255, 255, 255, 0.1);
    border-radius:7px;
    top:20px;
    left:260px;
    right:25%;
    text-shadow:0 1px 2px #000;
    cursor:pointer;
}
.process-on{
    background:#258fb8;
    opacity:0.7;
    top:0px;
    left:0px;
    width:0px;
}
.nowTime{
    position:absolute;
    color:white;
    font-size:10px;
    right:25%;
    top:30px;
}
.player-mode,.volume{
    position:absolute;
    color:#ccc;
    right:30px;
    top:18px;
    font-size:12px;
}
.volume{
    right:18%;
    margin-right:5px;
}
.song-title{
    position:absolute;
    width:100%;
    text-align:center;
    height:15px;
    left:0px; top:2px;
    color:white;
    font-size:10px;
}
.volume-Roller,.volume-now{
    height:6px;
    width:10%;
    text-shadow:0 1px 2px #000;
    cursor:pointer;
    background:rgba(255, 255, 255, 0.1);
    position:absolute;
    right:8%;
    border-radius:7px;
    top:21px;
}
.volume-now{
    background:#258fb8;
    opacity:0.7;
    top:0px;
    left:0px;
}
/*.player-hidden{*/
  /*height:30px;*/
  /*width: 50px;*/
  /*background:red;*/
  /*position: absolute;*/
  /*top:-30px;*/
  /*right:5%;*/
/*}*/
/*.player-hidden .glyphicon{*/
  /*font-size:16px;*/
/*}*/
</style>
