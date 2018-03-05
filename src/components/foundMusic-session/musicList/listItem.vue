<template>

      <div class="ranking-item">
      						<div class="lister-title">
      							<div class="lister-title-left">
      								<img :src="'static/images/index/ranking'+img+'.jpg'" alt=""></div>
      							<div class="lister-title-right">
      								<div class="lister-title-right-title">{{title}}</div>
      										<span class="glyphicon glyphicon-heart"></span><span class="glyphicon glyphicon-play-circle"></span>
      							</div>
      						</div>
      						<table></table>
      						<ul class="ranking-lister">
                        <li v-for="(item,index) in list"><a href="" @click="onceMusic($event)" :data-msrc="item.src" :data-sid="item.sid"><span class="ranking-lister-num">{{index+1}}</span>{{item.s_title}}</a></li>
      						</ul>
      </div>

</template>

<script>

export default {
      name:"songitem",
      props:["title","search","img"],
      data(){
          return {list:[]}
      },
      methods:{
         setData(){
            $.ajax({
                         url:this.search,
                         dataType:"json",
                         type:"GET"
                     }).then(data=>{
                         this.list = data;
                     },err=>{
                         console.log(err);
                     });
           },
        onceMusic(e){
           e.preventDefault();
           this.$router.push("/detailedMusic")
        }
      },
      mounted(){
          this.setData();
      }
  }

</script>

<style>

.ranking-item{
	border-right:1px #D3D3D3 solid;
	width:33.3333%;
}
.ranking-item .lister-title{
		padding-left:20px;
		padding-top:20px;
		vertical-align: top;
	}
	.lister-title-right{
		width:60%;
		display:table-cell;
		position: relative;
	}
	.lister-title-left{
		width:40%;
		display:table-cell;
		vertical-align: top;
		position: relative;
	}
	.lister-title-left>div{
		position: absolute;
		width:100%;
		height:100%;
		background: linear-gradient(135deg,rgba(255,255,255,.001) 0%,rgba(255,255,255,.1) 50%,rgba(0,0,0,.1) 60%,rgba(10,10,10,.2));
		cursor: pointer;
	}
	.ranking-item .lister-title img{
		width:100%;
		border:1px #8C878B solid;
	}
	.lister-title-right-title{
		font-size: 1.2em;
		font-family: STKAITI;
		font-weight:600;
		color:black;
		padding:5px 10px;
		width:100%;
		position: absolute;
		overflow:hidden;
		white-space: nowrap;
		text-overflow:ellipsis;
		top:10%;
	}
	.lister-title-right .glyphicon{
		margin-left:10px;
		font-size: 1.3em;
		position: relative;
		margin-top:38%;
		cursor: pointer;
		color:gray;
	}
	.lister-title-right .glyphicon-heart{
		color:red;
	}
	.ranking-lister{
  		list-style-type: none;
  		margin-top:20px;
  	}
  	.ranking-lister li{
  		margin-left:-40px;
  		background:#F4F4F4;
  		padding-left:20px;
  		padding-right:20px;
  	}
  	.ranking-lister li:nth-child(2n){
  		background:#E8E8E8;
  	}
  	.ranking-lister .ranking-lister-num{
  		padding-right: 10px;
  		text-align: right;
  		width:2em;
  		display: inline-block;
  	}
  	.ranking-lister li a{
  		padding: 0 3px;
  		width:100%;
  		color:black;
  		display:inline-block;
  		overflow:hidden;
  		white-space: nowrap;
  		text-overflow:ellipsis;
  	}
  	.ranking-lister li a:after{
  		content:"";
  		display:table;
  		margin-top:-4px;
  	}
  	.ranking-lister li:nth-child(1) .ranking-lister-num,.ranking-lister li:nth-child(2) .ranking-lister-num,.ranking-lister li:nth-child(3) .ranking-lister-num{
  		color:red;
  	}

</style>
