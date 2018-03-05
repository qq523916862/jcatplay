<template>
    <div id="frame">
        <navtool :bus="bus" :isLogin="isLogin" @changeLogin="loginActive"></navtool>
        <router-view ></router-view>
        <player></player>
        <panel v-if="isLogin"></panel>
        <login :bus="bus" v-if="!isLogin"></login>
        <register :bus="bus" v-if="!isLogin"></register>
    </div>
</template>

<script>
import Vue from 'vue'
import navtool from './components/header/navtool'
import player from './components/player/player'
import panel from './components/panel/panel'
import login from './components/modal/login'
import register from './components/modal/register'

export default {
  name: 'app',
  data(){
    return{
        bus:new Vue(),
        isLogin:false
    }
  },
  methods:{
    loginActive(value){
          this.isLogin  = value;
      }
  },
  components:{
    navtool,
    player,
    panel,
    login,
    register,
  }
}
</script>
<style>
  #frame{
      height:100%;
      width:100%;
      position:relative;
      top:0px;
      left:0px;
      min-width:625px;
      background:url(./assets/images/index/bg.jpg) center center no-repeat;
      background-attachment:fixed;
      background-size:cover;
  }
  html{
    min-height:100%;
    background:#F5F5F5;
  }
  body{
    height:100%;
  }
</style>
