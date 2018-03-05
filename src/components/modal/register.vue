<template>
  <transition name="" enter-active-class="animated zoomInDown" leave-active-class="animated zoomOutRight">
    <div class="mymodal register" v-show="active">
      <div class="mymodal-header">
        <div class="mymodal-title">成为会员 <span class="glyphicon glyphicon-remove " @click="close()"></span></div>
      </div>
      <div class="mymodal-body">
        <div class="form-group mymodal-row">
          <label class="text-right control-label col-xs-3" for="uname">用户名:</label>
          <div class="col-xs-5" :class="{'has-success':unameCheck,'has-error':!unameCheck}">
            <input class="form-control" type="text" name="uname" id="uname" placeholder="" value="" v-model="uname" />
          </div>
          <div class="col-xs-4">
                <span class="label" :class="{'label-danger':!unameCheck,'label-success':unameCheck}">
                    <span class="glyphicon" :class="{'glyphicon-ok':unameCheck}">{{unameMsg}}</span>
                </span>
          </div>
        </div>
        <div class="form-group mymodal-row">
          <label class="text-right control-label col-xs-3" for="upwd">密码:</label>
          <div class="col-xs-5"  :class="{'has-success':upwdCheck,'has-error':!upwdCheck}">
            <input class="form-control" type="password" name="upwd" id="upwd" placeholder="" value="" v-model="upwd"  />
          </div>
          <div class="col-xs-4">
                <span class="label" :class="{'label-danger':!upwdCheck,'label-success':upwdCheck}">
                    <span  class="glyphicon" :class="{'glyphicon-ok':upwdCheck}">{{upwdMsg}}</span>
                </span>
          </div>
        </div>
        <div class="form-group mymodal-row">
          <label class="text-right control-label col-xs-3" for="upwd2">确认密码:</label>
          <div class="col-xs-5"  :class="{'has-success':upwdCheck2,'has-error':!upwdCheck2}">
            <input class="form-control" type="password" name="upwd" id="upwd2" placeholder="" value="" v-model="upwd2"  />
          </div>
          <div class="col-xs-4">
                <span class="label" :class="{'label-danger':!upwdCheck2,'label-success':upwdCheck2}">
                    <span  class="glyphicon" :class="{'glyphicon-ok':upwdCheck2}">{{upwdMsg2}}</span>
                </span>
          </div>
        </div>

        <div class="form-group mymodal-row">
          <label class="text-right control-label col-xs-3" for="uemail">邮箱:</label>
          <div class="col-xs-5"  :class="{'has-success':emailCheck,'has-error':!emailCheck}">
            <input class="form-control" type="text" name="upwd" id="uemail" placeholder="" value="" v-model="email"  />
          </div>
          <div class="col-xs-4">
                <span class="label" :class="{'label-danger':!emailCheck,'label-success':emailCheck}">
                    <span  class="glyphicon" :class="{'glyphicon-ok':emailCheck}">{{emailMsg}}</span>
                </span>
          </div>
        </div>

        <div class="form-group mymodal-row">
          <label class="text-right control-label col-xs-3" for="phone">手机号:</label>
          <div class="col-xs-5"  :class="{'has-success':phoneCheck,'has-error':!phoneCheck}">
            <input class="form-control" type="text" name="upwd" id="phone" placeholder="" value="" v-model="phone"  />
          </div>
          <div class="col-xs-4">
                <span class="label" :class="{'label-danger':!phoneCheck,'label-success':phoneCheck}">
                    <span  class="glyphicon" :class="{'glyphicon-ok':phoneCheck}">{{phoneMsg}}</span>
                </span>
          </div>
        </div>

        <div class="form-group mymodal-row ">
          <label class="text-right control-label col-xs-3" for="yzm2">验证码:</label>
          <div class="col-xs-5"  :class="{'has-success':yzmCheck,'has-error':!yzmCheck}">
            <input class="form-control " type="text" name="upwd" id="yzm2" placeholder="" value="" v-model="yzm"  />
          </div>
          <div class="col-xs-4">
            <canvas class="yzm" id="register_yzm" width="70" height="30" @click="getYZM()"></canvas>
            <span class="label yammsg " :class="{'label-danger':!yzmCheck,'label-success':yzmCheck}"><span class="glyphicon" :class="{'glyphicon-ok':yzmCheck,'glyphicon-remove':!yzmCheck}"></span> </span>
          </div>
        </div>
        <div class="text-center loginmsg">
          <span class="label" v-show="registerActive==!null" :class="{'label-danger':registerActive==false,'label-success':registerActive==true}">{{registerMsg}}</span>
        </div>
        <div class="form-group mymodal-row">
          <div class="col-xs-6 text-right row-btn">
            <button type="button" class="btn btn-warning" @click="reset()" >重置</button>
          </div>
          <div class="col-xs-6 row-btn">
            <button type="button" class="btn btn-warning" @click="register()">注册</button>
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
        upwd2:"",
        email:"",
        phone:"",
        yzm:"",
        unameMsg:"用户名不能为空",
        upwdMsg:"密码不能为空",
        upwdMsg2:"请再次输入密码",
        emailMsg:"邮箱不能为空",
        phoneMsg:"手机号不能为空",
        yzmText:"Low2",
        unameCheck:false,
        upwdCheck:false,
        upwdCheck2:false,
        emailCheck:false,
        phoneCheck:false,
        yzmCheck:false,
        registerActive:null,
        active:false,
        timer:null,
        registerMsg:""
      }
    },
    watch:{
      uname(newval,oldval){
        clearTimeout(this.timer);
        this.timer = null;
        this.unameMsg = newval.length==0?"用户名不能为空":(newval.length<3||newval.length>12?"用户名长度在3-12之间":"");
        this.unameCheck = newval.length<3||newval.length>12?false:true;
        if(this.unameCheck){
            this.timer = setTimeout(()=>{
              this.checkUname();
            },500);
        }
      },
      upwd(newval,oldval){
        this.upwdMsg = newval.length==0?"密码不能为空":(newval.length<6||newval.length>12?"密码长度在6-12之间":"");
        this.upwdCheck = newval.length<6||newval.length>12?false:true;
      },
      upwd2(newval,oldval){
        this.upwdMsg2 = newval.length==0?"请再次输入密码":(newval==this.upwd?"":"两次输入密码不正确");
        this.upwdCheck2 = newval==this.upwd&&newval.length!=0?true:false;
      },
      email(newval,oldval){
        var parten = /^[a-zA-Z0-9]+\@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,6}$/;
        this.emailMsg = newval.length==0?"邮箱不能为空":(parten.test(newval)?"":"邮箱格式不正确");
        this.emailCheck = parten.test(newval)?true:false;
      },
      phone(newval,oldval){
        this.phoneMsg = newval.length==0?"手机号不能为空":(Number(newval)?(newval.length==11?"":"请输入11位的手机号"):"手机号只能为数字");
        this.phoneCheck = Number(newval)?(newval.length==11?true:false):false;
      },
      yzm(newval,oldval){
        this.yzmCheck = newval.toLowerCase()==this.yzmText.toLowerCase()?true:false;
      }
    },
    methods:{
      yzmInit(num){   //干扰元素数量
        var ctx = document.getElementById("register_yzm").getContext("2d");
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
      register(){
          this.$http.post("api/user/register",{uname:this.uname,upwd:this.upwd,email:this.email,phone:this.phone,yzm:this.yzm},{emulateJSON:true}).then(result=>{
              if(result.body.code==1){
                this.registerActive=true;
                this.registerMsg = result.body.msg;
                setTimeout(()=>{
                    this.registerActive=null;
                    this.close();
                    this.bus.$emit("openLogin");
                    this.registerMsg = "";
                  },500);
              }else{
                this.registerActive = false;
                this.registerSuccess=false;
                this.registerMsg = result.body.msg;
                this.getYZM();
              }
          },err=>{
              throw err;
          });
      },
      checkUname(){
        this.$http.post("api/user/checkUname",{uname:this.uname},{emulateJSON:true}).then(result=>{
              this.unameMsg = result.body.msg;
              this.unameCheck =result.body.code==1?true:false;
          },err=>{
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
        this.upwd2 = "";
        this.email = "";
        this.phone = "";
      },
      reset(){
          this.uname="";
          this.upwd="";
          this.upwd2="";
          this.email="";
          this.phone="";
          this.yzm="";
          this.getYZM();
      }
    },
    mounted(){
      this.bus.$on("openRegister",()=>{
        this.active = true;
        this.getYZM();
      });
      this.bus.$on("openLogin",()=>{
        this.active = false;
      });
    }
  }
</script>

<style>
  .register{
    height:410px;
  }
  .register .mymodal-body{
    height:370px;
  }
</style>
