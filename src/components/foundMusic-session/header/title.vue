<template>
  <div class="modular-title">
            <div class="modular-text">
              <span class="glyphicon glyphicon-certificate"></span>{{title}}
            </div>
            <ul class="modular-nav">
              <li v-for="item in list" class="modular-nav-item">
                <a href="">{{item}}</a>
              </li>
            </ul>
            <a v-if="list.length!=0" href="" @click="jumpTo($event)" class="modular-more">更多<span class="glyphicon glyphicon-arrow-right"></span></a>
          </div>
  </template>
<script>
  export default {
      name:"musictitle",
      props:["title","list","jump"],
      methods:{
        jumpTo(e){
            e.preventDefault();
            this.$router.push("/"+this.jump);
            switch(this.jump){
              case 'rankinglist':{
                this.$parent.bus.$emit("jumpNav",1);
                break;
              }
              case 'songsheel':{
                this.$parent.bus.$emit("jumpNav",2);
                break;
              }
              case 'diskshelves':{
                this.$parent.bus.$emit("jumpNav",4);
                break;
              }
            }
        }
      }
  }
</script>

<style>
.modular-title{
		margin:0 auto;
		border-bottom:3px solid #C40C0A;
	}
.modular-title .modular-text{
		text-indent: 5px;
		color:#343434;
		font-weight:600;
		display:inline-block;
		font-size:1.1em;
	}
.modular-title .modular-text .glyphicon{
		color:#C20C0B;
		padding-right:10px;
	}
.modular-title .modular-nav,.footer-nav{
		list-style-type:none;
		display:inline-block;
		vertical-align: bottom;
	}
.modular-title a,.footer-nav a{
		color:#5D5D5D;
		position:relative;
	}
.modular-title .modular-nav .modular-nav-item,.footer-nav .footer-nav-item{
		float:left;
		padding:0 10px;
		border-left:1px solid #5D5D5D;
		line-height:0.9em;
		font-size:0.8em;
		position:relative;
		top:5px;
	}
.modular-title .modular-nav .modular-nav-item:first-child,.footer-nav .footer-nav-item:first-child{
		border-left-color:transparent;
	}
.modular-title .modular-more{
		float: right;
		margin-right:15px;
		font-size:0.8em;
	}
.modular-title .modular-more .glyphicon{
		color:#C20C0B;
		padding-left:5px;
	}
</style>
