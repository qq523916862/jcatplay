<template>
     <div class="car-aside col-sm-3 hidden-xs">
          <canvas id="playerAside">

          </canvas>
     </div>
</template>

<script>

    class playerAside{
      constructor(id,width,height){
        this.el = document.getElementById(id);
        this.el.width = width;
        this.el.height = height;
        this.w = width;
        this.h = height;
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
        this.timer = null;
      }

      drawbg(){
        this.ctx.clearRect(0,0,this.w,this.h);
        this.ctx.drawImage(this.backg,0,0,this.w,this.h);
        this.redrawStart();
        this.ctx.save();
        this.ctx.translate(243.3333,240);
        this.ctx.rotate(this.reg*Math.PI/180);
        this.ctx.drawImage(this.disk,-200,-200,400,400);
        this.ctx.drawImage(this.logo,-70,-66,140,140);
        this.reg+=1.1;
        this.ctx.restore();
        this.ctx.save();
        this.ctx.rotate(-40*Math.PI/180);
        this.ctx.drawImage(this.arm,-90,55,145.998,216);
        this.ctx.restore();
      }

      setStart(){
          for(var i = 0 ; i < 10 ; i++){
            this.startLeft[i] = Math.ceil(Math.random()*this.w);
            this.startTop[i] = Math.ceil(Math.random()*this.h);
            this.startR[i] = Math.ceil(2+Math.random()*5);
            this.startSpeed[i] = Math.ceil(Math.random()*1);
            this.startLife[i] = true;
            this.lrStartLeft[i] = Math.random()>0.5?true:false;
          }
      }

      resetStart(i){
        this.startLeft[i] = Math.ceil(Math.random()*this.w);
        this.startTop[i] = this.h;
        this.startR[i] =  Math.ceil(2+Math.random()*5);
        this.startSpeed[i] = Math.ceil(Math.random()*1);
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
          if(this.restartLeft%40==0){
            this.lrStartLeft[i] = Math.random()>0.5?true:false;
          }
          this.restartLeft++;
          this.startLeft[i] = this.startLeft[i]+(Math.random()*0.8*(this.lrStartLeft[i]?1:-1));
          this.startTop[i] -= this.startSpeed[i];
          this.ctx.beginPath();
          this.ctx.save();
          this.ctx.globalAlpha = 0.8;
          this.ctx.lineWidth = 3;
          this.ctx.fillStyle = "#FFFAFB";
          this.ctx.strokeStyle = "#5899FE";
          this.ctx.arc(this.startLeft[i],this.startTop[i],this.startR[i],0,2*Math.PI);
          this.ctx.fill();
          this.ctx.stroke();
          this.ctx.closePath();
          this.ctx.restore();
          this.startLife[i]= this.startLeft[i]>-this.startR[i]?(this.startLeft[i]<973.33332+this.startR[i]?(this.startTop[i]<-this.startR[i]?false:true):false):false;
          if(!this.startLife[i]){
            this.resetStart(i);
            this.startLife[i]==true;
          }
        }
      }

      draw(){
        this.setStart();
        this.timer = setInterval(()=>{
            this.drawbg();
        },20);
        this.drawStart();
      }

      destory(){
        this.ctx.clearRect(0,0,this.w,this.h);
        clearInterval(this.timer);
        this.timer = null;
      }
    }

   export default {
        name:"playerback",
        data(){
          return {player:null};
        },
        mounted:function(){
            this.player = new playerAside("playerAside",486.66666,672);
            this.player.draw();
        },
        beforeDestroy(){
            this.player.destory();
            this.player = null;
        }
   }
</script>

<style>



.car-aside{
		position: absolute;
		top:0px;
		right:0px;
		height:100%;
		transition:background-color 0.5s ease 0s;
		text-align: center;
	}
	#playerAside{
	    width:100%;
	    height:100%;
	    zoom:0.5;
	}

</style>
