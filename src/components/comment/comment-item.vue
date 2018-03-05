<template>
  <div class="row comment-item">
    <div class="col-xs-1 user-img">
      <img :src="data.pic" alt="">
    </div>
    <div class="col-xs-11 comment-content">
      <span class="user-name">{{data.anthor}}:</span>
      <span class="user-content">
            {{data.content}}
      </span>
      <div class="user-reglied" v-if="data.reply.anthor">
          <span class="user-name">{{data.reply.anthor}}:</span>
          <span class="user-content">
              {{data.reply.content}}
          </span>
      </div>
      <div class="row comment-footer">
        <div class="col-xs-4 createTime">2014年8月14日</div>
        <div class="comment-tool col-xs-8 text-right">
          <span class="text-info">赞({{data.zan}})</span>
          <span>回复</span>
          <div class="weel"></div>
        </div>
      </div>
      <regly :name="'leungboasing'" v-show="false"></regly>
    </div>
  </div>
</template>

<script>
  import regly from './regly'
  export default {
        name: "comment-item",
        components:{
          regly
        },
        props:["data"]
    }
</script>

<style scoped>
  .row {
    margin:0px;
  }
  .comment-item{
    border-top: 1px solid #D3D3D3;
    padding:5px;
  }
  .comment-content{
    padding-left:10px;
  }
  .user-name{
    color: #0C73C2;
  }
  .user-name:hover{
    text-decoration: underline;
    cursor: pointer;
  }
  .user-content{
    font-size: 13px;
    min-height: 100%;
  }
  .comment-footer{
    margin-top:3px;
    font-size:13px;
  }
  .comment-tool span{
    padding:0 15px;
  }
  .comment-tool span:hover{
    color: #0C73C2;
    text-decoration: underline;
    cursor: pointer;
  }
  .comment-tool span:first-child{
    border-right:1px #c6c6c6 solid;
  }
  .user-img img{
    width:100%;
    border:1px solid #f5f5f5;
  }
  .user-img{
    margin-top:2px;
  }
  .createTime{
    color: gray;
  }
  .user-reglied{
    border:1px #c6c6c6 solid;
    padding:10px;
    margin-top:15px;
    position: relative;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    background: #f1effe;
  }
  .user-reglied::before{
    content: '';
    height:0px;
    width:0px;
    display: inline-block;
    border:7px solid transparent;
    border-bottom-color: #c6c6c6;
    position: absolute;
    left:20px;
    top:-15px;
  }
</style>
