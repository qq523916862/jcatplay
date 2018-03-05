<template>
  <nav class="nav-box row">
        <div class="logo" @click="openPanel()">
            <canvas id="logo-radius"  width="200" height="200">
                您的浏览器不支持canvas
            </canvas>
            <div class="nav-title">Jcat Palyer</div>
        </div>
        <div class="nav-tool row">
            <div class="nav-nav col-xs-7 hidden-xs">
                <ul class="list-unstyled" @click.prevent="turnTo">
                   <li :class="{'active':navActive==index}" v-for="(item,index) in navMsg"> {{item}}</li>
                </ul>
            </div>

            <div class="nav-search col-sm-3 col-xs-6" @mouseenter="">
                <span class="glyphicon glyphicon-search" @click="search"></span>
                <input type="text" name="search" id="search" placeholder="搜索歌曲" @keydown.enter="search">
            </div>

            <div class="nav-hidden-nav col-xs-3 visible-xs-inline-block text-center" @mouseenter="openNavDown()" @mouseleave="closeNavDown()">
                <span class="glyphicon glyphicon-triangle-bottom"></span>
                <transition name="" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp" >
                    <ul class="dropdown  hidden-sm hidden-lg hidden-md list-caret" v-show="openNav">
                        <li :class="{'navlist-active':navActive==index}"  v-for="(item,index) in navMsg" @click.prevent="turnTo">{{item}}</li>
                    </ul>
                </transition>
            </div>

            <div class="nav-login col-sm-2 text-center col-xs-3" @mouseenter="opendown()" @mouseleave="closedown()">
                <span v-show="!isLogin">登录<span class="glyphicon glyphicon-menu-down " ></span></span>
                <div class="user-box" v-if="isLogin">
                    <img class="user" src="/static/images/index/user.jpg" alt=""/>
                </div>
                <transition name="" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
                    <ul class="login-down  list-caret" :class="{'login-after':isLogin}" v-if="!isLogin" v-show="openList" @click="loginTool($event)">
                        <li class="user-tool-list-item user-index" v-for="(item,index) in login" :data-index="index">{{item}}</li>
                    </ul>
                    <ul class="login-down  list-caret login-after"  v-if="isLogin" v-show="openList" @click="userTool($event)">
                        <li class="user-tool-list-item user-index" v-for="(item,index) in loginAfter" :data-index="index"><span class="glyphicon" :class="item.class"></span> {{item.title}}</li>
                    </ul>
                </transition>
            </div>
        </div>
    </nav>
</template>


<script>

    class logo{
        constructor(){
            this.logo = null;
            this.ctx = null;
            this.start = null;
            this.end = null;
            this.start = 0;
        }
        init(){
            this.logo = new Image();
            this.logo.src="static/images/index/logo.gif";
            this.logo.onload=function(){
                this.ctx.save();
                this.ctx.scale(4,4);
                this.ctx.drawImage(this.logo,3,3,44,44);
                this.ctx.restore();
            }.bind(this);
            var logoRadius = document.getElementById("logo-radius");
            this.ctx = logoRadius.getContext("2d");
        }
        drawLogo(){
            this.ctx.save();
            this.ctx.scale(4,4);
            this.ctx.drawImage(this.logo,3,3,44,44);
            this.ctx.restore();
        }
        drawCircle(){
            this.ctx.beginPath();
            this.ctx.lineWidth = 5;
            this.ctx.strokeStyle = "#ffffff";
            this.ctx.arc(100,100,80,this.start*Math.PI,(this.start+1/3)*Math.PI);
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.beginPath();
            this.ctx.arc(100+80*Math.cos((this.start+1/3)*Math.PI),100+80*Math.sin((this.start+1/3)*Math.PI),6,0,2*Math.PI);
            this.ctx.fillStyle="#ffffff";
            this.ctx.fill();
            this.ctx.closePath();
            this.start+=0.01;
        }
        clearDraw(){
            this.ctx.clearRect(0,0,200,200);
        }
    }
  export default {
    name:"navtool",
    props:["bus"],
    data(){
        return{
            navMsg:["发现音乐","我的音乐","朋友","商城","音乐人"],
            navActive:0,
            login:["会员登录","成为会员"],
            loginAfter:[{class:"glyphicon-home",title:"我的主页"},{class:"glyphicon-envelope",title:"我的消息"},{class:"glyphicon-bookmark",title:"我的等级"},{class:"glyphicon-wrench",title:"个人设置"},{class:"glyphicon-off",title:"退出"}],
            openList:false,
            listLife:null,
            openNav:false,
            navLife:null,
            isLogin:false
        }
    },
    methods:{
          init(){
            var draw = new logo();
            draw.init("logo-radius");
             setInterval(function(){
                  draw.clearDraw();
                  draw.drawLogo();
                  draw.drawCircle();
             },20);
          },
          turnTo(e){
              var ele = e.target;
              if(ele.tagName=="LI"){
                  var index = [].indexOf.call(ele.parentElement.getElementsByTagName("li"),ele);
                  this.navActive=index;
                  switch (index) {
                    case 0:{
                          this.$router.push("/");
                          break;
                      }
                    case 1:{
                          this.$router.push("/myMusic")
                          break;
                    }
                    case 2:{
                      this.$router.push("/myFriends")
                      break;
                    }
                  }
              }
          },
          openPanel(){
              this.$parent.bus.$emit("panelOpen");
          },
          opendown(){
              clearTimeout(this.listLife);
              this.listLife = null;
              this.openList = true;
          },
          closedown(){
              this.listLife = setTimeout(()=>{
                   this.openList = false;
              },200)
          },
          openNavDown(){
              clearTimeout(this.navLife);
              this.navLife = null;
              this.openNav = true;
          },
          closeNavDown(){
              this.navLife = setTimeout(()=>{
                    this.openNav = false;
              },200);
          },
          loginTool(e){
              let index = $(e.target).data("index");
              if(e.target.tagName=="LI"){
                  if(index==0){
                      this.bus.$emit("openLogin");
                  }else{
                    this.bus.$emit("openRegister");
                  }
              }
          },
          userTool(e){
              let index = e.target.tagName=="SPAN"?$(e.target).parents("li").data("index"):$(e.target).data("index");
              if(e.target.tagName=="LI"||e.target.tagName=="SPAN"){
                  switch (index){
                    case 0:{
                      this.$router.push("/myIndex");
                      break;
                    }
                    case 1:{
                      this.$router.push("/myMessages");
                      break;
                    }
                    case 2:{
                      this.$router.push("/myLevel");
                      break;
                    }
                    case 3:{
                      this.$router.push("/mySetting");
                      break;
                    }
                    case 4 :{
                        this.userDestory();
                        break;
                    }
                  }
              }
          },
          checkLogin(){
                this.$http.get("/api/user/checkLogin").then(result=>{
                  if(result.body.code==1){
                           this.isLogin = true;
                      }else{
                           this.isLogin = false;
                      }
                  this.$emit("changeLogin",this.isLogin);
                },err=>{
                      throw err;
                });
          },
          userDestory(){
              this.$http.get("/api/user/userdestory").then(result=>{
                  this.checkLogin();
              },err=>{
                  throw err;
              });
          },
          search(){
            this.$router.push("/search")
          }
    },
    mounted(){
        this.init();
        this.checkLogin();
        this.bus.$on("checkLogin",()=>{
            this.checkLogin();
        });
    }
  }

</script>


<style>
.nav-box {
  background: #242424;
  height: 50px;
  position: fixed;
  width: 100%;
  top: 0px;
  left: 0px;
  margin:0px;
  z-index: 10;
  min-width: 500px;
}
.nav-box .nav-title{
  width:200px;
  height:50px;
  color: #FFFFFF;
  font-family:STCAIYUN;
  font-size: 20px;
  font-weight: 600;
  display: inline-block;
  position: absolute;
  top: 0px;
  left: 0px;
  line-height: 50px;
  padding-left:70px;
  background:#191919;
}
.nav-box .nav-tool{
  margin-left:200px;
  height: 50px;
}
.nav-box .nav-nav{
  color: #fff;
  font-size: 1.2em;
  font-family:STKAITI;
  font-weight:600;
}
.nav-box .nav-nav ul{
  position: relative;
  top: 0px;
}
.nav-box .nav-nav ul li{
  float: left;
  height: 50px;
  font-size: 15px;
  line-height: 50px;
  padding: 0 10px;
  width: 20%;
  text-align: center;
  cursor: pointer;
  font-weight: 600;
  transition: all 1s ease 0s;
  overflow: hidden;
}
.nav-box .nav-nav ul li.active{
  background: #454545;
  position: relative;
}
.nav-box .nav-nav ul li.active::after{
  content: "";
  display: inline-block;
  position: absolute;
  width: 0px;
  height: 0px;
  border:transparent 9px solid;
  border-bottom-color: #C20C0B;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;
  margin:32px auto;
}
.nav-box .nav-nav ul li:hover{
  background: #454545;
}
#logo-radius{
  position: absolute;
  left:80px;
  width:50px;
  left:20px;
  background:#191919;
  z-index:3;
}
.logo{
  cursor: pointer;
}
.nav-search{
  padding:0 10px;
}
.nav-search #search{
  width:100%;
  padding-left:1.9em;
  border-radius: 10px;
  border:0px;
  float: left;
  margin-top:-17px;
}
#search:focus{
  outline: none;
}
.nav-search .glyphicon{
  float: left;
  margin-top:18px;
  color: gray;
  margin-left:0.2em;
}
.nav-login,.nav-box .nav-hidden-nav{
  color:#9D9D9D;
  font-family:STKAITI;
  height: 50px;
  line-height: 50px;
  font-size:1.2em;
  cursor: pointer;
  padding:0 10px;
  transition:color 1s ease 0s;
  position: relative;
  -ms-text-overflow: clip;
}
.nav-login:hover,.nav-box .nav-hidden-nav:hover{
  color: white;
}
.nav-login .login-down,.dropdown{
  position: absolute;
  color: white;
  list-style-type: none;
  right:0px;
  top:0px;
  width:100%;;
  overflow: hidden;
  padding-top:50px;
  height: 120px;
}
.dropdown{
  height: 225px;
}
.nav-login>.login-down>li,.dropdown li{
  margin-left:-40px;
  /*padding:10px 8px;*/
  background: #191919;
  text-align: center;
  font-family: STKAITI;
  font-size:0.9em;
  border-top:1px solid gray;
  height: 35px;;
  line-height: 35px;

}
.nav-login>.login-down>li:last-child,.dropdown li:last-child{
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-bottom: 1px solid gray;
}
.nav-login>.login-down>li:hover,.dropdown li:hover{
  background: #454545;
}
.nav-hidden-nav:hover .glyphicon-triangle-bottom{
  border:1px gray solid;
  padding:5px;
  border-radius: 5px;
}
.nav-hidden-nav .navlist-active{
  background: #454545;
  position: relative;
}
.nav-hidden-nav .navlist-active::before{
  content: '';
  display: inline-block;
  position: absolute;
  border:transparent 6px solid;
  border-left-color:white;
  left: 5px;
  top: 12px;
}
.nav-hidden-nav .navlist-active::after{
  content: '';
  display: inline-block;
  position: absolute;
  border:transparent 6px solid;
  border-right-color:white;
  right: 5px;
  top: 12px;
}
.list-caret::before{
            content:"";
            width:0px;
            height:0px;
            border:5px transparent solid;
            position: absolute;
            border-bottom-color:gray;
            top: 0px;
            left:0px;
            right: 0px;
            bottom: 0px;
            margin:40px auto;
}
.login-after{
            height: 260px !important;
}
.user-box{
            width: 30px;
            height: 30px;
            display: inline-block;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 100px;
            overflow: hidden;
            margin-top: 10px;
}
 .user{
            margin-top:-23px;
            width: 30px;
            outline: none;
 }
 .user:hover{
            border-color: #000;
 }
</style>
