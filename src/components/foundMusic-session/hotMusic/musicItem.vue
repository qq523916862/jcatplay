<template>
  <div class="music-lister row">
            <div class="music-list-item col-xs-4 col-md-3" :class="{'hidden-sm':index>=6,'hidden-xs':index>=6}" v-for="(item,index) in list">
                <div class="music-list-item-body">
                    <img class="music-pic" :src="item.pic_src" alt="" :data-target="item.singColNum" />
                    <div class="music-pic-box"></div>
                </div>
                <div class="footer">
                    <span class="foot-left glyphicon glyphicon-headphones"></span>
                    <span>{{item.foot_listen}}万</span>
                    <span class="foot-right glyphicon glyphicon-play-circle" :data-target="item.href"></span>
                </div>
                <figure  @cilck="onceSongSheel"  >{{item.item_title}}</figure>
            </div>
  </div>
</template>

<script>
  export default {
      name:"musicItem",
      data:function(){
          return {list:{}}
      },
      methods:{
        onceSongSheel(){
          this.$router.push("/detailedSongSheel");
        }
      },
      mounted(){
          $.ajax({
              url:"/api/index/hotmusic",
              async:true,
              type:"GET",
              dataType:"json"
          }).then(data=>{
              this.list = data;
          },err=>{
              console.log(err);
          });
      }
  }

</script>

<style>
.music-lister{
		display:flex;
		flex-flow:row wrap;
		justify-content:space-between;
		align-items:flex-start;
	}
.music-list-item{
		padding:10px;
		position: relative;
		color:#CACACA;
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
  .music-list-item-body{
    position: relative;
  }
  .music-pic-box{
      background:url(../../../assets/images/disk/coverall.png);
      -webkit-background-size: 100%;
      opacity: 0.8;
      background-size: 274%;
      position: absolute;
      z-index:5;
      width:100%;
      height:100%;
      top:0px;
  }
</style>
