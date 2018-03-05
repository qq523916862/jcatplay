<template>
  <div class="ranking-box">
      <div class="container module-ranking">
            <div class="ranking-aside">
                <div class="ranking-aside-title">
                  音乐特色榜
                </div>
                <ul class="ranking-nav">
                    <li class="ranking-nav-item row" @click="changeNav(index)" :class="{'active':navActive==index}" v-for="(item,index) in navlist">
                        <div class="col-xs-4 col-lg-4 text-right">
                            <img :src="require('../../assets/images/index/'+item.img)" alt="">
                        </div>
                        <div class="msg col-xs-7 col-lg-7">
                              <p class="ranking-title">
                                {{item.title}}
                               </p>
                              <p class="ranking-news">
                                {{item.news}}
                              </p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="ranking-session row" v-for="(item,index) in navlist" v-show="navActive==index">
                <ranlist :listtype="item"></ranlist>
            </div>
      </div>
  </div>
</template>
<script>
  import rankinglist from './ranking-list/list-session'

  export default {
      name:"rankinglist",
      data(){
          return {
              navlist:[
                  {img:"ranking1.jpg",title:"音乐飙升榜",news:"每天更新",type:1},
                  {img:"ranking2.jpg",title:"音乐新歌榜",news:"每周更新",type:2},
                  {img:"ranking3.jpg",title:"音乐电力榜",news:"每周更新",type:3}
              ],
              navActive:0
          }
      },
      methods:{
        changeNav(index){
          this.navActive = index;
        }
      },
      components:{
          ranlist:rankinglist
      }
  }

</script>

<style>
  .ranking-box{
    position: relative;
    top:-10px;
    background: #F5F5F5;
  }

  .module-ranking{
    position:relative;
    background:white;
    padding-left:0px;
  }

  .ranking-aside{
    background:#F9F9F9;
    padding-left:15px;
    border:1px solid #DCDCDC;
    position: fixed;
    width:200px;
    height:100%;
    top:50px;
    padding-top:40px;
  }

  .ranking-session{
    background: #FFFFFF;
    margin-left:200px;
  }
  .ranking-aside-title{
    font-size:18px;
    padding-top:20px;
    padding-bottom:5px;
    font-family: STKAITI;
    font-weight: 600;
  }

  .ranking-nav{
    padding-top:10px;
    list-style-type: none;
    margin-left:-15px;
  }
  .ranking-nav-item{
      padding:10px;
      margin-left:-40px;
      padding-left:25px;
      margin-right:0px;
      border-top:1px #f1f1f1 solid;
      border-bottom:1px #f1f1f1 solid;
      cursor: pointer;
      -webkit-border-radius:2px;
      -moz-border-radius:2px;
      border-radius:2px;
  }
  .ranking-nav-item img{
      width:60px;
  }
  .ranking-nav .active{
      background: #E6E6E6;
      box-shadow: 5px 5px 5px gray;
      margin-left:-43px;
      margin-top:-3px;
  }
  .ranking-nav-item .msg{
      margin-left:10px;
  }
  .ranking-title{
    margin-top:5px;
    font-weight:600;
  }
  .ranking-news{
    font-size:10px;
    color:gray;
  }

</style>
