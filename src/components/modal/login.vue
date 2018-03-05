<template>
  <transition name="" enter-active-class="animated zoomInDown" leave-active-class="animated zoomOutRight">
      <div class="mymodal" v-show="active">
          <div class="mymodal-header">
              <div class="mymodal-title">会员登陆 <span class="glyphicon glyphicon-remove " @click="close()"></span></div>
          </div>
          <div class="mymodal-body">
                  <div class="form-group mymodal-row">
                      <label class="text-right control-label col-xs-3" for="uname2">用户名:</label>
                      <div class="col-xs-5" :class="{'has-success':unameCheck,'has-error':!unameCheck}">
                        <input class="form-control" type="text" name="uname" id="uname2" placeholder="" value="" v-model="uname" />
                      </div>
                      <div class="col-xs-4">
                          <span class="label" :class="{'label-danger':!unameCheck,'label-success':unameCheck}">
                              <span class="glyphicon" :class="{'glyphicon-ok':unameCheck}">{{unameMsg}}</span>
                          </span>
                      </div>
                  </div>
                  <div class="form-group mymodal-row">
                       <label class="text-right control-label col-xs-3" for="upwd1">密码:</label>
                       <div class="col-xs-5"  :class="{'has-success':upwdCheck,'has-error':!upwdCheck}">
                          <input class="form-control" type="password" name="upwd" id="upwd1" placeholder="" value="" v-model="upwd"  />
                       </div>
                       <div class="col-xs-4">
                          <span class="label" :class="{'label-danger':!upwdCheck,'label-success':upwdCheck}">
                              <span  class="glyphicon" :class="{'glyphicon-ok':upwdCheck}">{{upwdMsg}}</span>
                          </span>
                       </div>
                  </div>
                  <div class="form-group mymodal-row ">
                       <label class="text-right control-label col-xs-3" for="yzm">验证码:</label>
                       <div class="col-xs-5"  :class="{'has-success':yzmCheck,'has-error':!yzmCheck}">
                          <input class="form-control " type="text" name="upwd" id="yzm" placeholder="" value="" v-model="yzm"  />
                       </div>
                       <div class="col-xs-4">
                            <canvas class="yzm" id="login_yzm" width="70" height="30" @click="getYZM()"></canvas>
                            <span class="label yammsg " :class="{'label-danger':!yzmCheck,'label-success':yzmCheck}"><span class="glyphicon" :class="{'glyphicon-ok':yzmCheck,'glyphicon-remove':!yzmCheck}"></span> </span>
                       </div>
                  </div>
                  <div class="text-center loginmsg">
                      <span class="label" v-show="loginActive!=null" :class="{'label-danger':!loginSuccess,'label-success':loginSuccess}">{{loginMsg}}</span>
                  </div>
                  <div class="form-group mymodal-row">
                       <div class="col-xs-6 text-right row-btn">
                          <button type="button" class="btn btn-warning" @click="reset()" >重置</button>
                       </div>
                       <div class="col-xs-6 row-btn">
                            <button type="button" class="btn btn-warning" @click="login()">登陆</button>
                       </div>
                  </div>
          </div>
      </div>
  </transition>
</template>
<script>
  export default {
    name:"modal",
    props:["bus"],
    data(){
        return {
            uname:"",
            upwd:"",
            yzm:"",
            unameMsg:"用户名不能为空",
            upwdMsg:"密码不能为空",
            yzmText:"dsw1",
            unameCheck:false,
            upwdCheck:false,
            yzmCheck:false,
            loginActive:null,
            active:false,
            loginSuccess:false,
            loginMsg:""
        }
    },
    watch:{
        uname(newval,oldval){
            this.unameMsg = newval.length==0?"用户名不能为空":(newval.length<3||newval.length>12?"用户名长度在3-12之间":"");
            this.unameCheck = newval.length<3||newval.length>12?false:true;
        },
         upwd(newval,oldval){
             this.upwdMsg = newval.length==0?"密码不能为空":(newval.length<6||newval.length>12?"密码长度在6-12之间":"");
             this.upwdCheck = newval.length<6||newval.length>12?false:true;
         },
         yzm(newval,oldval){
             this.yzmCheck = newval.toLowerCase()==this.yzmText.toLowerCase()?true:false;
         }
    },
    methods:{
        yzmInit(num){   //干扰元素数量
             var ctx = document.getElementById("login_yzm").getContext("2d");
             ctx.clearRect(0,0,70,35);
             ctx.beginPath();
             ctx.rect(0,0,70,30);
             ctx.fillStyle="rgba(25,20,20,0.5)";
             ctx.fill();
             ctx.closePath();
             ctx.textBaseline="top";
             ctx.font="20px SimHei";
             ctx.fillStyle = "white";
             ctx.fillText(this.yzmText,14,5.5);
             for(var i = 0; i<num;i++){
                 ctx.beginPath();
                 ctx.arc(Math.ceil(Math.random()*70),Math.round(Math.random()*30),1.1,0,360*Math.PI/180);
                 ctx.fillStyle="rgba("+(Math.ceil(Math.random()*100)+125)+","+(Math.ceil(Math.random()*100)+70)+","+(Math.ceil(Math.random()*150)+70)+",1)";
                 ctx.fill();
                 ctx.closePath();
             }
        },
        login(){
          if (!(this.unameCheck && this.upwdCheck && this.yzmCheck)) return false;
          this.$http.post("api/user/login",{uname:this.uname,upwd:this.upwd,yzm:this.yzm},{emulateJSON:true}).then(result => {
              if(result.body.code==1){
                  this.loginActive = true;
                  this.loginActive = true;
                  this.loginSuccess=true;
                  this.loginMsg = result.body.msg;
                  this.close();
                  setTimeout(()=>{
                      this.bus.$emit("checkLogin");
                  },1000);
              }else{
                  this.loginActive = false;
                  this.loginSuccess=false;
                  this.loginMsg = result.body.msg;
                  this.yzmCheck = false;
                  this.getYZM();
              }
          }, err => {
            throw err;
          });
        },
        getYZM(){
          this.$http.get("api/user/getyzm").then(result => {
            if(result.body.code==1){
                  this.yzmText = result.body.yzm;
                  this.yzmInit(100);
            }else{
                  console.log("获取验证码失败");
            }
          }, err => {
            throw err;
          });
        },
        close(){
            this.active = false;
            this.uname = "";
            this.upwd = "";
            this.yzm = "";
            this.loginActive=null;
        },
        reset(){
            this.uname="";
            this.upwd="";
            this.yzm="";
        }
    },
    mounted(){
        this.bus.$on("openLogin",()=>{
              this.getYZM();
              this.active = true;
        });
        this.bus.$on("openRegister",()=>{
          this.active = false;
        });
    }
}
</script>

<style>
  .mymodal{
      position: fixed;
      width: 450px;
      background: white;
      z-index: 11;
      top:0px;
      left:0px;
      bottom: 0px;
      right: 0px;
      margin:auto auto;
      background: url(../../assets/images/index/login.jpg) no-repeat;
      background-size: cover;
      border-radius:4px;
      height:270px;
      -webkit-box-shadow: 0px 0px 5px #444444;
      -moz-box-shadow: 0px 0px 5px #444444;
      box-shadow:-1px 1px 10px #444444;
  }
  .mymodal-header{
  	position: relative;
  	background:#2D2D2D;
  	border:1px solid #2D2D2D;
  	height:40px;
  	border-top-left-radius:4px;
  	border-top-right-radius:4px;
  	cursor: move;
  	z-index: 11;
  }
  .mymodal-header .glyphicon-remove{
  	float: right;
  	margin-right: -10px;
  	margin-top: 10px;
  	cursor: pointer;
  }
  .mymodal-title{
  		color:white;
  		line-height: 2.1em;
  		font-family: STKAITI;
  		padding: 0 20px;
  		font-size: 1.2em;
  		box-sizing:border-box;
  }
  .mymodal-body{
  	position: relative;
  	height: 230px;
  	background: rgba(255,255,255,0.4);
  	border-bottom-left-radius:4px;
  	border-bottom-right-radius:4px;
  	border:1px solid gray;
  	padding-top:20px;
  	z-index: 11;
  }
  .mymodal-row{
      width:100%;
      height:40px;
      margin-right:5px;
      margin-bottom:5px;
  }
  .mymodal-row .glyphicon{
      margin-left:0px;
  }
  .mymodal-row label,.mymodal-row span{
      line-height:35px;
  }
  .mymodal-row span{
      margin-left:10px;
  }
  .mymodal-row label{
      padding-right:5px;
  }
  .yzm{
      margin-left:10px;
      border-radius:5px;
      margin-top:3px;
  }
  .row-btn{
      padding:0 20px;
  }
  .mymodal-row .yammsg{
      display:block;
      height:25px;
      margin-top:5px;
      line-height:25px;
      float:right;
      margin-right:25px;
      width:25px;
  }
  .mymodal-row .yammsg .glyphicon{
      line-height:25px;
      margin-top:-6px;
      margin-left:0px;
  }
  .loginmsg{
      margin-top:-5px;
      margin-bottom:10px;
      height:20px;
  }
</style>
