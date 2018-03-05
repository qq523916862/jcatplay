<template>
                            <div class="car-box col-sm-9 col-xs-12">
                                <div class="carousel-box">
                                    <ul class="banner-list">
                                    </ul>
                                    <div class="banner-upback ">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                    <a href="#" class="carousel-btn right">
                                        <svg width="30" height="30">
                                            <g stroke="#fff" stroke-width="7" stroke-linecap="square" stroke-opacity=".5" fill="transparent">
                                                <polyline points="7,0 22,15 7,30"></polyline>
                                            </g>
                                        </svg>
                                    </a>
                                    <a href="#" class="carousel-btn left">
                                        <svg width="30" height="30">
                                            <g stroke="#fff" stroke-width="7" stroke-linecap="square" stroke-opacity=".5" fill="transparent">
                                                <polyline points="22,0 7,15 22,30"></polyline>
                                            </g>
                                        </svg>
                                    </a>
                                </div>
                            </div>
</template>

<script>

   class banner{
     constructor(){
       this.data = [];
       this.$carouselBox = $(".carousel-box");
       this.$width = $(".carousel-box");
       this.$upback = $(".banner-upback div");
       this.$listbtn = $(".banner-list");
       this.arr = [];
       this.imgsize = 0;                  //图片比例， height/width
       this.active = 0;
       this.imgActive = null;           //图片状态记录
       this.timer =null;                //轮播定时器
       this.timer1 =null;
       this.colorNum = [];              //颜色数组
       this.url = [];                    //地址数组
       this.isDistroy = false;
     }

     //初始化
     init(data,color,url,size=336/730){
       this.data = data;
       this.colorNum = color;
       this.imgsize = size;
       this.url = url;
     }

     //启动轮播
     carousel(){
       this.imgActive = true;
       this.$upback.addClass("animated");
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

     //Hover停止轮播
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

     //轮播左右按钮
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

     //排列数组
     sortArr(){
       this.arr.sort(function(){
         return Math.random()>0.5;
       }).reverse().sort(function(){
         return Math.random()>0.5;
       });
     }


     //轮播按钮列表
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

     //轮播触发后
     bannerafter(i,lr){
         var dad =this;
         var a = 0;
         this.sortArr();
         this.$listbtn.find("li").eq(this.active).addClass("active").siblings("li").removeClass("active");
         this.timer1 =  setInterval(function () {
           if(dad.isDistroy) return false;
           var b = dad.arr[a];
           if(lr=="right"){
             dad.$upback.eq(b).addClass("zoomOutLeft");
           }else{
             dad.$upback.eq(b).addClass("zoomOutRight");
           }
           a++;
           if(a==50){clearInterval(this.timer1)}
           setTimeout(function () {
             if(dad.isDistroy) return false;
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
                   if(dad.isDistroy) return false;
                   dad.$upback.eq(b).removeClass("zoomInRight zoomInLeft");
                   dad.imgActive = true;
                 },1000);
           }, 1000);
         }, 13);
          setTimeout(()=>{
            if(dad.isDistroy) return false;
            $(".bg-l,.bg-r").css("backgroundColor",dad.colorNum[i]);
          },1800);
     }
     //启动轮播
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

     destroy(){
       $("body")[0].onresize=null;
       clearInterval(this.timer);
       clearInterval(this.timer1)
       this.data = null;
       this.$carouselBox = null;
       this.$width = null;
       this.$upback = null;
       this.$listbtn = null;
       this.arr = null;
       this.imgsize =null;
       this.active = null;
       this.imgActive = null;
       this.colorNum = null;
       this.url = [];
       this.isDistroy = true;
     }
   }



  export default {
      name:"carousel",
      data(){
        return { ban:null };
      },
      methods:{
          startCarousel(){
              this.ban = new banner();
              $.ajax({
                  url:"api/index/banner",
                  type:"GET",
                  dataType:"json",
              }).then(data=>{
                    var img = [];
                    var color = [];
                    var url = [];
                    for(var item of data){
                        img.push(item.img);
                        color.push(item.bgcolor);
                        url.push(item.href);
                    }
                    this.ban.init(img,color,url);
                    this.ban.carousel();
              },err=>{
                  console.log(err);
              });
          }
      },
      mounted:function(){
          this.startCarousel();
      },
      beforeDestroy(){
          this.ban.destroy();
          this.ban = null;
      }
  }
</script>

<style>
.car-box{
		transition:background-color 0.5s ease 0s;
		background: rgba(0,0,0,.3);
	}

.carousel-box{
    position: relative;
    /*height:0;*/
    padding-bottom:46.027397%;
}
/*.carousel-box:before{*/
    /*content: " ";*/
    /*display: table;*/
/*}*/
/*.carousel-box:after{*/
    /*content: " ";*/
    /*display: table;*/
/*}*/
.banner-list{
    list-style-type: none;
    padding: 0px;
    position: absolute;
    left:0px;
    bottom:20px;
    right:0px;
    margin:auto auto;
    text-align: center;
    z-index: 10;
}
.banner-list li:first-child{
    margin-left:0px;
}
.banner-list li{
    cursor: pointer;
    width:0.5em;
    height:0.5em;
    border:1px white solid;
    border-radius: 50%;
    display: inline-block;
    margin-left:3px;
    margin-right:3px;
}
.banner-list li.active{
    background: white;
}
.banner-list{
    width:100%;
}
.banner-item{
    width:100%;
    height:100%;
}

#banner-img{
    width:100%;
    transform-style: preserve-3d;
    transition:all 1s linear 0s;
}

.banner-upback{
    display: flex;
    flex-flow:row wrap;
    justify-content: flex-start;
    align-items: flex-start;
    width:100%;
    height:100%;
    position:absolute;
    top:0px;
}
.banner-upback div{
    height:20%;
    width:10%;
    box-sizing: border-box;
}


.carousel-btn{
    position: absolute;
    text-decoration: none;
    vertical-align: middle;
    width:13%;
    text-align: center;
    height: 100%;
}
.carousel-btn svg{
    position: absolute;
    left:0px;
    right:0px;
    top:0px;
    bottom:0px;
    margin:auto;
}
.carousel-btn.left{
    left:0px;
    background-image: linear-gradient(to right,rgba(0,0,0,.5) 0,rgba(0,0,0,.0001) 100%);
}
.carousel-btn.right{
    right:0px;
    background-image: linear-gradient(to right,rgba(0,0,0,.0001) 0,rgba(0,0,0,.5) 100%);
}


</style>
