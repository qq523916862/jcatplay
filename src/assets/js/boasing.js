/**
 * Created by web-01 on 2018/1/9.
 */
  //logo璁捐

export default{
    logo:class{
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
    },
    navDown:class{
      constructor(){
        this.$dad = null;
        this.$downlist = null;
        this.timer = null;
      }
      init(dad,downlist){
        this.$dad=$(dad);
        this.$downlist = $(downlist);
      }
      hover(){
        var $dad = this.$dad,$downlist=this.$downlist;
        $dad.hover(function(){
          if($downlist.is(".hidden")){
            $downlist.removeClass("hidden").addClass("bounceInDown");
            setTimeout(function(){
              $downlist.removeClass("bounceInDown");
            },1000);
          }else{
            clearTimeout(this.timer);
            this.timer=null;
          }
        },function(){
          if(!$downlist.is(".hidden")){
            this.timer = setTimeout(function(){
              $downlist.addClass("bounceOutUp");
              setTimeout(function(){
                $downlist.removeClass("bounceOutUp").addClass("hidden");
                this.timer=null;
              },1000);
            },1000);
          }
        });
      }
    },
    banner:class{
    constructor(){
      this.data = [];
      this.$carouselBox = $(".carousel-box");
      this.$width = $(".carousel-box");
      this.$upback = $(".banner-upback div");
      this.$listbtn = $(".banner-list");
      this.arr = [];
      this.imgsize = 0;                  //鍥剧墖姣斾緥锛� height/width
      this.active = 0;
      this.imgActive = null;           //鍥剧墖鐘舵�佽褰�
      this.timer =null;                //杞挱瀹氭椂鍣�
      this.colorNum = [];              //棰滆壊鏁扮粍
      this.url = [];                    //鍦板潃鏁扮粍
    }

    //鍒濆鍖�
    init(data,color,url,size=336/730){
      this.data = data;
      this.colorNum = color;
      this.imgsize = size;
      this.url = url;
      $("body")[0].onresize=function(){
        this.$carouselBox.css("height",this.$width.innerWidth()*this.imgsize+"px");
      }.bind(this);
    }

    //鍚姩杞挱
    carousel(){
      this.imgActive = true;
      this.$upback.addClass("animated");
      this.$carouselBox.css("height",this.$width.innerWidth()*this.imgsize+"px");
      this.carouselHover();
      for(var i=0;i<50;i++){
        this.arr.push(i);
        var h = Math.floor(i/10);
        this.$upback.eq(i).css("background-image","url("+this.data[0]+")");
        this.$upback.eq(i).css("background-position",i*11-h*110+"% "+h*25+"%");
        this.$upback.eq(i).css("background-size", "1000%");
      }
      for(var i = 0;i<this.data.length;i++){
        this.$listbtn.append("<li></li>");
      };
      $(".bg-l,.bg-r").css("backgroundColor",this.colorNum[0]);
      this.$listbtn.find("li").eq(this.active).addClass("active");
      this.btnListSet();
      this.sortArr();
      this.carouselBtnSet();
      this.carouselRunning();
    }

    //Hover鍋滄杞挱
    carouselHover(){
      var dad = this;
      this.$carouselBox.mouseenter(function(){
        clearInterval(dad.timer);
        dad.timer = null;
      }).mouseleave(function(){
        dad.timer =  setInterval(function() {
          if(dad.imgActive){
            dad.active++;
            dad.imgActive = false;
            if(dad.active===dad.data.length){
              dad.active=0;
            }
            dad.bannerafter(dad.active,"right");
          }
        }, 7000);
      });
    }

    //杞挱宸﹀彸鎸夐挳
    carouselBtnSet(){
      var dad = this;
      function btn(e,zy){
        e.preventDefault();
        dad.sortArr();
        if(zy=="left"){
          dad.active = dad.active-1<0?dad.data.length-1:dad.active-1;
        }else if(zy=="right"){
          dad.active = dad.active+1==dad.data.length?0:dad.active+1;
        }
        dad.bannerafter(dad.active,zy);
      }
      $(".carousel-btn.right").click(function(e){
        btn(e,"right");
      });
      $(".carousel-btn.left").click(function(e){
        btn(e,"left");
      });
    }

    //鎺掑垪鏁扮粍
    sortArr(){
      this.arr.sort(function(){
        return Math.random()>0.5;
      }).reverse().sort(function(){
        return Math.random()>0.5;
      });
    }


    //杞挱鎸夐挳鍒楄〃
    btnListSet(){
      var dad = this;
      this.$listbtn.click(function(e){
        dad.$tar = $(e.target);
        dad.sortArr();
        if(dad.$tar.is("li")){
          dad.bannerafter(dad.$tar.index(),"right");
          dad.$listbtn.find("li").eq(dad.$tar.index()).addClass("active").siblings("li").removeClass("active");
        }
      });
    }

    //杞挱瑙﹀彂鍚�
    bannerafter(i,lr){
      var dad =this;
      var a = 0;
      this.sortArr();
      this.$listbtn.find("li").eq(this.active).addClass("active").siblings("li").removeClass("active");
      var timer1 =  setInterval(function () {
        var b = dad.arr[a];
        if(lr=="right"){
          dad.$upback.eq(b).addClass("zoomOutLeft");
        }else{
          dad.$upback.eq(b).addClass("zoomOutRight");
        }
        a++;
        if(a==50){clearInterval(timer1)}
        setTimeout(function () {
          var h = Math.floor(b / 10);
          dad.$upback.eq(b).css("background-image", "url(" + dad.data[i] + ")");
          dad.$upback.eq(b).data("address",dad.url[i]);
          if(lr=="right"){
            dad.$upback.eq(b).removeClass("zoomOutLeft");
            dad.$upback.eq(b).addClass("zoomInRight");
          }else{
            dad.$upback.eq(b).removeClass("zoomOutRight");
            dad.$upback.eq(b).addClass("zoomInLeft");
          }
          setTimeout(function(){
            $(".bg-l,.bg-r").css("backgroundColor",dad.colorNum[i]);
            dad.$upback.eq(b).removeClass("zoomInRight zoomInLeft");
            dad.imgActive = true;
          },1000);
        }, 1000);
      }, 13);
    }

    //鍚姩杞挱
    carouselRunning(){
      var dad = this;
      this.timer =  setInterval(function() {
        if(dad.imgActive){
          dad.active++;
          dad.imgActive = false;
          if(dad.active===dad.data.length){
            dad.active=0;
          }
          dad.bannerafter(dad.active,"right");
        }
      }, 7000);
    }
  },
    playerAside:class{
      constructor(id,width,height){
        this.el = document.getElementById(id);
        this.el.width = width;
        this.el.height = height;
        this.ctx = this.el.getContext("2d");
        this.backg = new Image();
        this.arm = new Image();
        this.disk = new Image();
        this.logo = new Image();
        this.backg.src = "static/images/index/diskbg.png";
        this.disk.src = "static/images/index/cddisk.png";
        this.arm.src = "static/images/index/controllerArm.png";
        this.logo.src = "static/images/index/logo.gif";
        this.xuanzhuan = 0;
        this.reg = 0;
        this.startLeft = [];
        this.startTop = [];
        this.startSpeed = [];
        this.startR = [];
        this.startLife = [];
        this.restartLeft = 0;
        this.lrStartLeft = [];
      }

      drawbg(){
        this.ctx.clearRect(0,0,973.33332,1344);
        this.ctx.drawImage(this.backg,0,0,973.33332,1344);
        this.redrawStart();
        this.ctx.save();
        this.ctx.translate(486.6666,480);
        this.ctx.rotate(this.reg*Math.PI/180);
        this.ctx.drawImage(this.disk,-400,-400,800,800);
        this.ctx.drawImage(this.logo,-140,-132,280,280);
        this.reg+=1.1;
        this.ctx.restore();

        this.ctx.save();
        this.ctx.rotate(-40*Math.PI/180);
        this.ctx.drawImage(this.arm,-180,110,291.996,432);
        this.ctx.restore();




      }

      setStart(){
        for(var i = 0 ; i < 10 ; i++){
          this.startLeft[i] = Math.ceil(Math.random()*938);
          this.startTop[i] = Math.ceil(Math.random()*1344);
          this.startR[i] = Math.ceil(5+Math.random()*10);
          this.startSpeed[i] = Math.ceil(Math.random()*2);
          this.startLife[i] = true;
          this.lrStartLeft[i] = Math.random()>0.5?true:false;
        }
      }

      resetStart(i){
        this.startLeft[i] = Math.ceil(Math.random()*938);
        this.startTop[i] = 1344;
        this.startR[i] = Math.ceil(Math.random()*15);
        this.startSpeed[i] = Math.ceil(Math.random()*2);
        this.startLife[i] = true;
        this.lrStartLeft[i] = Math.random()>0.5?true:false;
      }

      drawStart(){
        this.ctx.beginPath();
        this.ctx.fillStyle = "#FFFAFB";
        this.ctx.strokeStyle = "#5899FE";
        for( var i = 0 ; i < this.startLeft.length ; i++){
          this.ctx.arc(this.startLeft[i],this.startTop[i],this.startR[i],0,2*Math.PI);
        }
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
      }

      redrawStart(){
        for( var i = 0 ; i < this.startLeft.length ; i++){
          if(this.restartLeft%20==0){
            this.lrStartLeft[i] = Math.random()>0.5?true:false;
          }
          this.restartLeft++;
          this.startLeft[i] = this.startLeft[i]+(Math.random()*0.8*(this.lrStartLeft[i]?1:-1));
          this.startTop[i] -= this.startSpeed[i];
          this.ctx.beginPath();
          this.ctx.lineWidth = 3;
          this.ctx.fillStyle = "#FFFAFB";
          this.ctx.strokeStyle = "#5899FE";
          this.ctx.arc(this.startLeft[i],this.startTop[i],this.startR[i],0,2*Math.PI);
          this.ctx.fill();
          this.ctx.stroke();
          this.ctx.closePath();
          this.startLife[i]= this.startLeft[i]>-this.startR[i]?(this.startLeft[i]<973.33332+this.startR[i]?(this.startTop[i]<-this.startR[i]?false:true):false):false;
          if(!this.startLife[i]){
            this.resetStart(i);
            this.startLife[i]==true;
          }
        }
      }

      draw(){
        this.setStart();
        setInterval(()=>{
          this.drawbg();
        },20);
        this.drawStart();
      }
    }
  }


//涓嬫媺鍒楄〃


//杞挱






