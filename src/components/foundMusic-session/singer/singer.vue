<template>
      <div class="singer-modular">
            <div class="singer-modular-title">
              <div >入驻歌手
                <a href="#" @click="jump($event)">查看全部></a>
              </div>
            </div>
            <div class="singer-modular-contain" @click="onceSinger" v-for="item in list">
                <div class="singer-item" :data-singer="item.eid">
                    <img :src="item.pic" alt="">
                    <div class="inger-item-r">
                        <span class="singer-name">{{item.name}}</span><br>
                        <span class="singer-more">{{item.tips}}</span>
                    </div>
						    </div>
            </div>
			</div>
</template>

<script>
  import Vue from 'vue'
  export default {
      name:"singerlist",
      data(){
        return {list:[]};
      },
      methods:{
          getData(){
              $.ajax({
                  url:"/api/index/singer",
                  type:"GET",
                  dataType:"json"
              }).then(data=>{
                  this.list=data;
              },err=>{
                  console.log(err);
              });
          },
          jump(e){
            e.preventDefault();
            this.$router.push("singerlist");
            this.$parent.bus.$emit("jumpNav",3);
          },
          onceSinger(){
            this.$router.push("/detailedSinger");
          }
      },
      mounted(){
          this.getData();
      }
  }
</script>

<style>

.singer-modular{
    margin-top:20px;
}
.singer-modular-title{
		padding:0px 15px;
	}
	.singer-modular-title>div{
		font-size:1.1em;
		font-weight: 600;
		color:black;
		padding-bottom:5px;
		border-bottom:1px solid #CBCBCB;
	}
	.singer-modular-title a{
		color:gray;
		font-weight:100;
		font-size:0.8em;
		float: right;

	}
	.singer-modular-contain{
		padding: 0 5% ;
	}
	.singer-item{
		border:1px solid #E9E9E9;
		display:flex;
		margin-top:15px;
		flex-flow:row wrap;
		justify-content:space-between;
		align-items:flex-start;
		background: #FAFAFA;
		border-radius:5px;
		cursor: pointer;
	}
	.singer-item img{
		width:30%;
		box-sizing:border-box;
	}
	.inger-item-r{
		width:70%;
		box-sizing:border-box;
		padding:5% 10% 0;
	}
	.inger-item-r .singer-name{
		margin-top:20px;
		color:black;
		font-size:1.1em;
		font-family: STKAITI;
	}
	.inger-item-r .singer-more{
		color:gray;
		font-size:0.7em;
		display:block;
		width:100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow:ellipsis;
	}

</style>
