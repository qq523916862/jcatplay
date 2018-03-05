<template>
  <div class="song-sheel">
      <div class="song-sheel-title container">
          <h3>全部
              <button @click="activeFetch" class="title-btn btn btn-sm btn-danger">选择分类 <span class="glyphicon" :class="{'glyphicon-menu-down':fetchActive,'glyphicon-menu-right':!fetchActive}"></span></button>
          </h3>
        <fetch-list v-show="fetchActive"></fetch-list>
      </div>
      <div class="container songsheel-body-box">
          <div class="song-sheel-body ">
              <div class="music-list-item col-xs-4 col-md-3 col-lg-2"  v-for="(item,index) in list">
                <div class="music-list-item-body">
                  <img class="music-pic" :src="item.pic_src" alt="" :data-target="item.singColNum" />
                  <div class="music-pic-box2"></div>
                </div>
                  <div class="footer">
                      <span class="foot-left glyphicon bsicon-listening"></span>
                      <span>{{item.foot_listen}}万</span>
                      <span class="foot-right glyphicon bsicon-play" :data-target="item.href"></span>
                  </div>
                  <figure @click="onceSongSheel">{{item.item_title}}</figure>
              </div>
          </div>
      </div>
      <div class="song-sheel-foot container text-center">
          <ul class="pagination pagination-sm">
            <li :class="{'disable':count==1}"><a href="#" aria-label="Previous" @click="prev($event)" ><span class="glyphicon glyphicon-arrow-left"></span></a></li>
            <li v-show="count-2>0"><a href="" @click="turnPage($event,count-2)">{{count-2}}</a></li>
            <li v-show="count-1>0"><a href="#" @click="turnPage($event,count-1)">{{count-1}}</a></li>
            <li class="active"><a href="#" @click="preventD($event)">{{count}}</a></li>
            <li v-show="count+1<=maxCount" @click="turnPage($event,count+1)"><a href="#">{{count+1}}</a></li>
            <li v-show="count+2<=maxCount" @click="turnPage($event,count+2)"><a href="#">{{count+2}}</a></li>
            <li :class="{'disable':count==maxCount}"><a href="#" aria-label="next" @click="next($event)"><span class="glyphicon glyphicon-arrow-right"></span></a></li>
          </ul>
      </div>
  </div>

</template>
<script>

import fetchList from './songsheelFetch/fetchList'
export default {
    name:"songSHeel",
    components:{
        fetchList
    },
    data(){
        return {
            list:[],
            count:1,
            maxCount:1,
            fetchActive:false
        }
    },
    methods:{
        toTop(){
            let timer = setInterval(function () {
                if(window.scrollY<=0){
                    clearInterval(timer);
                }else{
                    window.scrollBy(0,-100);
                }
            },10);
        },
        getData(){
            this.$http.get("/api/songsheel/all").then(data=>{
                this.list = data.body;
            },err=>{
                console.log(err);
            })
            this.getMaxCount();
        },
        turnPage(e,now){
            e.preventDefault();
            this.count = now;
            this.getPage(this.count);
        },
        preventD(e){
            e.preventDefault();
            return ;
        },
        prev(e){
            e.preventDefault();
            this.count = this.count==1?1:this.count-1;
            this.getPage(this.count);
        },
        next(e){
            e.preventDefault();
            this.count = this.count == this.maxCount ? 1 : this.count + 1;
            this.getPage(this.count);
        },
        getMaxCount(){
          this.$http.get("/api/songsheel/maxcount").then(data=>{
              this.maxCount = data.body.count;
          },err=>{
              console.log(err);
          });
        },
        getPage(num){
            this.$http.get("/api/songsheel/getpage?count="+num).then(data=>{
                this.list = data.body;
                this.toTop();
            },err=>{
                console.log(err);
            });
        },
        activeFetch(){
             this.fetchActive = !this.fetchActive;
        },
        onceSongSheel(){
          this.$router.push("/detailedSongSheel")
        }
    },
    mounted(){
        this.getData();
    }
}


</script>

<style>
.song-sheel{
  position: relative;
  top:-20px;
  background:#F5F5F5;
}
.song-sheel-title{
  padding:30px 40px 0 40px;
  background:white;
  border-left:1px #CBCBCB solid;
  border-right:1px #CBCBCB solid;
}
.song-sheel-title h3{
  border-bottom:3px solid #C20C0B;
  padding-bottom:10px;
}
.song-sheel-title .title-btn{
    width:80px;
    font-size:12px;
    margin-left:20px;
}
.songsheel-body-box{
  padding:0px;
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
  border-left:1px #CBCBCB solid;
  border-right:1px #CBCBCB solid;
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
.song-sheel-foot{
    position: relative;
    bottom:30px;
    height:70px;
    border-left:1px #CBCBCB solid;
    border-right:1px #CBCBCB solid;
    border-bottom:1px #CBCBCB solid;
    background:white;
}
.song-sheel-foot .pagination{
    margin:0;
}
.song-sheel-foot .pagination li a{
  border-color: #bbbfc0;
}
.song-sheel-foot .pagination li.active a:hover{
  border-color:#bbbfc0;
}
.song-sheel-foot .pagination li.disable a,.song-sheel-foot .pagination li.disable a span{
  color:gray;
  cursor: default;
}
.music-list-item-body{
  position: relative;
}
.music-pic-box2{
  background:url(../../assets/images/disk/coverall.png);
  -webkit-background-size: 100%;
  opacity: 0.8;
  background-size: 274%;
  position: absolute;
  z-index:5;
  width:100%;
  height:100%;
  top:0px;
}
.songsheel-body-box figure{
  cursor: pointer;
}
</style>
