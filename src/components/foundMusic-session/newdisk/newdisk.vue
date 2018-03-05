<template>
   <div class="disk-lister">
      <span class="disk-lister-left glyphicon glyphicon-chevron-left" @click="turnlist('left')"></span>
    	<span class="disk-lister-right glyphicon glyphicon-chevron-right" @click="turnlist('right')"></span>
      <div class="disk-horsizon" :style="{'margin-left':nowPosition+'%'}">
          <div class="disk-item" v-for="item in list">
              <div class="disk-box" @click="onceDisk">
                  <img :src="item.pic_src" alt="" :data-target="item.href" :data-diskNum = "item.singColNum">
              </div>
              <div class="disk-title text-center">{{item.disk_title}}</div>
              <div class="disk-singer text-center">{{item.disk_singer}}</div>
          </div>
      </div>
   </div>
</template>

<script>
 export default {
      name:"newdiskitem",
      data(){
          return {list:[],nowPosition:0};
      },
      methods:{
           getData(){
               $.ajax({
                    url:"/api/index/newdisk",
                    type:"GET",
                    dataType:"json"
               }).then(data=>{
                    this.list = data;
               },err=>{
                    console.log(err);
               });
          },
          turnlist(btn){
              if(btn=="left"){
               console.log(111)
                 if(this.nowPosition!=0){
                    this.nowPosition+=50;
                  }
              }else if(btn=="right"){
                 if(this.nowPosition!=-100){
                    this.nowPosition-=50;
                 }
              }
          },
          onceDisk(){
             this.$router.push("/detailedDisk");
          }
      },
      mounted(){
            this.getData();
      }
  }


</script>

<style>
	.disk-lister{
		margin:30px 0px;
		position: relative;
		overflow:hidden;
		border:1px #D4D4D4 solid;

	}
	.disk-horsizon{
	  position:relative;
		display:flex;
		flex-flow:row wrap;
		justify-content:space-between;
		align-items:flex-start;
		width:200%;
		background: #F5F5F5;
		transition:all .4s  0s;
	}
.disk-item{
		position: relative;
		width:12.5%;
		padding:20px;
	}
.disk-item img{
    width: 100%;
		position: relative;
		z-index:5;
		cursor: pointer;
    left:0px;
    top:0px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    border:1px solid #BEBEBE;
    border-right-width: 0px;
	}
 .disk-box{
		position: relative;
		text-align:right;
    padding-right:18%;
		top:0px;
		left:0px;
		bottom:0px;
		right:0px;
    background:url(../../../assets/images/disk/coverall.png) 0% 74.8%;
    -webkit-background-size: 100%;
    background-size: 177%;
	}
.disk-item .disker{
		z-index:3;
	}
.disk-item .disk-title,.disk-horsizon .disk-item .disk-singer{
		width:100%;
		overflow: hidden;
		text-overflow:ellipsis;
		font-size:0.8em;
	}
.disk-item .disk-title{
		color:black;
    font-weight: 600;
    font-size:13px;
    font-family: "Microsoft YaHei";
	}
.disk-item .disk-singer{
		color:gray;
	}
	.disk-lister .disk-lister-left,.disk-lister .disk-lister-right{
		font-size:1.5em;
		position: absolute;
		top:40%;
		z-index:9;
		cursor: pointer;
		color:gray;
	}
	.disk-lister .disk-lister-left{
		left:0px;
	}
	.disk-lister .disk-lister-right{
		right:0px;
	}

</style>
